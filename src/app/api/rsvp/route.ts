import { fieldErrorsFromZod, rsvpSchema, type RsvpRecord } from "@/lib/rsvp";
import { getDb } from "@/lib/mongodb";
import { getRsvps } from "@/lib/rsvp-data";

export async function GET() {
  try {
    const rsvps = await getRsvps();
    return Response.json({ rsvps });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Could not load RSVPs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form.", fields: fieldErrorsFromZod(parsed.error) },
      { status: 400 },
    );
  }

  const rsvp: RsvpRecord = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    attending: parsed.data.attending,
    guestCount: parsed.data.attending ? parsed.data.guestCount : undefined,
    message: parsed.data.message,
    createdAt: new Date().toISOString(),
  };

  try {
    const db = await getDb();
    await db.collection("rsvps").insertOne(rsvp);
    return Response.json({ rsvp }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Could not save RSVP." }, { status: 500 });
  }
}
