"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import RsvpModal from "@/components/RsvpModal";

const RECEPTION_AT = new Date("2027-01-03T11:30:00+04:00");

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const JANUARY_2027_START_OFFSET = 4;
const JANUARY_DAYS = 31;

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(now: Date): Remaining {
  const diff = Math.max(0, RECEPTION_AT.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

function HeartMark() {
  return (
    <span className="inline-flex size-6 items-center justify-center rounded-full bg-navy text-cream sm:size-7">
      <svg viewBox="0 0 24 24" className="size-3 fill-current sm:size-3.5" aria-hidden>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </span>
  );
}

function JanuaryCalendar() {
  const cells = [
    ...Array.from({ length: JANUARY_2027_START_OFFSET }, () => null),
    ...Array.from({ length: JANUARY_DAYS }, (_, index) => index + 1),
  ];

  return (
    <div className="mx-auto w-full max-w-[17.5rem] rounded-md bg-[#f3eee4] px-3 py-3 text-ink sm:max-w-[19rem] sm:px-4 sm:py-4">
      <p className="mb-3 text-center font-serif text-sm italic sm:text-base">January 2027</p>
      <div className="grid grid-cols-7 gap-y-1.5 text-center text-[0.65rem] sm:text-xs">
        {WEEKDAYS.map((day) => (
          <span key={day} className="font-medium text-ink/55">
            {day}
          </span>
        ))}
        {cells.map((day, index) => (
          <span key={`${day ?? "empty"}-${index}`} className="flex h-6 items-center justify-center sm:h-7">
            {day === 3 ? <HeartMark /> : day}
          </span>
        ))}
      </div>
    </div>
  );
}

function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Shuhaib Babu & Afreena K.S Reception",
    dates: "20270103T073000Z/20270103T123000Z",
    details: "The reception will take place on Sunday, 3 January 2027 at 11:30 AM.",
    location: "Aiswarya Auditorium, Thottupalam, Kinassery(po), Palakkad",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function isAppleCalendar() {
  const ua = navigator.userAgent;
  const appleMobile = /iPhone|iPad|iPod/i.test(ua);
  const macSafari = /Macintosh/i.test(ua) && /Safari/i.test(ua) && !/Chrome|CriOS|Android/i.test(ua);
  return appleMobile || macSafari;
}

function addToCalendar(event: MouseEvent<HTMLAnchorElement>) {
  if (isAppleCalendar()) {
    event.preventDefault();
    window.location.href = "/shuhaib-afreena-reception.ics";
  }
}

export default function ReceptionInfo() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  useEffect(() => {
    function tick() {
      setRemaining(getRemaining(new Date()));
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="paper-bg relative overflow-x-clip pb-12 pt-4 sm:pt-6">
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-8 md:max-w-4xl">
      <div className="relative mx-auto w-full max-w-[21.5rem] sm:max-w-xl md:max-w-2xl">
        <div className="flower-bob pointer-events-none absolute -top-8 -left-8 z-20 w-[46%] max-w-[8.5rem] sm:-top-10 sm:-left-14 sm:max-w-[13rem]">
          <Image
            src="/images/flower-left.webp"
            alt=""
            width={720}
            height={900}
            className="h-auto w-full select-none"
          />
        </div>
        <div className="flower-bob-alt pointer-events-none absolute top-[28%] -left-10 z-20 w-[42%] max-w-[7.75rem] sm:-left-16 sm:max-w-[12.5rem]">
          <Image
            src="/images/flower-bl.webp"
            alt=""
            width={1122}
            height={1402}
            className="h-auto w-full select-none"
          />
        </div>
        <div className="flower-bob pointer-events-none absolute -bottom-6 -right-8 z-20 w-[48%] max-w-[9rem] sm:-bottom-8 sm:-right-14 sm:max-w-[14rem]">
          <Image
            src="/images/flower-br.webp"
            alt=""
            width={1122}
            height={1402}
            className="h-auto w-full select-none"
          />
        </div>

        <article className="relative z-10 rounded-2xl bg-navy px-5 pb-12 pt-10 text-center text-cream shadow-[0_18px_40px_rgba(11,39,72,0.28)] sm:px-10 sm:pb-14 sm:pt-12">
          <p className="font-serif text-[0.72rem] font-medium tracking-[0.28em] sm:text-sm">
            RECEPTION INFO
          </p>
          <p className="mt-4 font-serif text-[0.95rem] tracking-[0.04em] sm:text-lg">
            THE RECEPTION WILL TAKE PLACE AT:
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 font-serif text-[0.7rem] tracking-[0.16em] text-cream/80 sm:text-xs">
            <span>SUNDAY</span>
            <span>11:30 AM</span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <p className="font-serif text-5xl leading-none sm:text-6xl">03</p>
            <span className="h-10 w-px bg-cream/35 sm:h-12" />
            <p className="text-left font-serif text-xs leading-tight tracking-[0.18em] sm:text-sm">
              JANUARY
              <br />
              2027
            </p>
          </div>

          <p className="mt-6 font-serif text-[0.7rem] italic text-cream/75 sm:text-sm">Countdown</p>
          <p className="mt-1 min-h-5 font-serif text-[0.8rem] tracking-[0.02em] text-cream sm:text-base">
            {remaining
              ? `${remaining.days} days ${remaining.hours} hours ${remaining.minutes} min ${remaining.seconds} sec`
              : "—"}
          </p>

          <div className="mt-5 sm:mt-6">
            <JanuaryCalendar />
          </div>

          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            onClick={addToCalendar}
            className="mt-5 inline-block font-serif text-sm underline decoration-cream/50 underline-offset-4 touch-manipulation sm:text-base"
          >
            Add to Calendar
          </a>

          <div className="absolute left-1/2 bottom-0 z-30 -translate-x-1/2 translate-y-1/2">
            <button
              type="button"
              onClick={() => setRsvpOpen(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-6 py-2.5 font-sans text-[0.7rem] font-medium tracking-[0.16em] text-cream ring-1 ring-cream/80 touch-manipulation sm:text-xs"
            >
              CONFIRM ATTENDANCE
            </button>
          </div>
        </article>
      </div>
      </div>
      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </section>
  );
}
