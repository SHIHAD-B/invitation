import { getDb } from "@/lib/mongodb";
import type { RsvpRecord } from "@/lib/rsvp";

export async function getRsvps(): Promise<RsvpRecord[]> {
  const db = await getDb();
  return db
    .collection<RsvpRecord>("rsvps")
    .find(
      {},
      {
        projection: {
          _id: 0,
          id: 1,
          name: 1,
          attending: 1,
          guestCount: 1,
          message: 1,
          createdAt: 1,
        },
      },
    )
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();
}
