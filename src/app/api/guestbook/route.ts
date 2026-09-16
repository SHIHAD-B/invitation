import { getDb, mongoFailReason } from "@/lib/mongodb";

export type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection<Wish>("wishes")
      .find({}, { projection: { _id: 0, id: 1, name: 1, message: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    return Response.json({ wishes: docs });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Could not load wishes.", reason: mongoFailReason(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";

  if (!name || !message) {
    return Response.json({ error: "Name and message are required." }, { status: 400 });
  }
  if (name.length > 80 || message.length > 600) {
    return Response.json({ error: "Wish is too long." }, { status: 400 });
  }

  const wish: Wish = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const db = await getDb();
    await db.collection("wishes").insertOne(wish);
    return Response.json({ wish }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Could not save wish.", reason: mongoFailReason(error) },
      { status: 500 },
    );
  }
}
