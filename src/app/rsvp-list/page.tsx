import type { Metadata } from "next";
import { getRsvps } from "@/lib/rsvp-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RSVP list · Shuhaib & Afreena",
};

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("en-US");
}

export default async function RsvpListPage() {
  let rsvps;
  try {
    rsvps = await getRsvps();
  } catch {
    return (
      <main className="min-h-dvh bg-cream px-4 py-10 text-navy">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-2xl font-semibold">RSVP list</h1>
          <p className="mt-4 font-sans text-sm text-navy/70">Could not load RSVPs.</p>
        </div>
      </main>
    );
  }

  const attending = rsvps.filter((item) => item.attending);
  const declining = rsvps.filter((item) => !item.attending);
  const guestTotal = attending.reduce((sum, item) => sum + (item.guestCount ?? 1), 0);

  return (
    <main className="min-h-dvh bg-cream px-4 py-8 text-navy sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-2xl font-semibold tracking-[0.06em] sm:text-3xl">
          RSVP list
        </h1>
        <p className="mt-2 font-sans text-sm text-navy/65">
          {rsvps.length} replies · {attending.length} attending · {guestTotal} guests ·{" "}
          {declining.length} not attending
        </p>

        {rsvps.length === 0 ? (
          <p className="mt-8 font-serif text-sm text-navy/70">No RSVPs yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-[0_12px_32px_rgba(11,39,72,0.1)]">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead className="bg-navy text-cream">
                <tr>
                  <th className="px-4 py-3 font-sans font-medium">Name</th>
                  <th className="px-4 py-3 font-sans font-medium">Attendance</th>
                  <th className="px-4 py-3 font-sans font-medium">Guests</th>
                  <th className="px-4 py-3 font-sans font-medium">Message</th>
                  <th className="px-4 py-3 font-sans font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="border-t border-navy/10 align-top">
                    <td className="px-4 py-3 font-serif font-medium">{rsvp.name}</td>
                    <td className="px-4 py-3">
                      {rsvp.attending ? (
                        <span className="text-emerald-700">Attending</span>
                      ) : (
                        <span className="text-red-600">Not attending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{rsvp.attending ? (rsvp.guestCount ?? 1) : "—"}</td>
                    <td className="max-w-xs px-4 py-3 whitespace-pre-wrap text-navy/75">
                      {rsvp.message || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-navy/60">
                      {formatTime(rsvp.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
