"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import WishesModal from "@/components/WishesModal";

const EMOJIS = ["✨", "💐", "🤍", "💍", "🕊️"] as const;

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-navy" aria-hidden>
      <path d="M7.5 2.5 9 7l4.5 1.5L9 10 7.5 14.5 6 10 1.5 8.5 6 7 7.5 2.5Zm10 4L19 9.5l3.5 1.2-3.5 1.3-1.5 3.5-1.2-3.5-3.5-1.3 3.5-1.2 1.2-3.5Zm-6.2 6.3 1.2 3.4 3.3 1.1-3.3 1.2-1.2 3.3-1.1-3.3-3.4-1.2 3.4-1.1 1.1-3.4Z" />
    </svg>
  );
}

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    const nextMessage = message.trim();
    if (!nextName || !nextMessage || sending) {
      return;
    }

    setSending(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nextName, message: nextMessage }),
      });
      if (!response.ok) {
        throw new Error("Could not send wishes");
      }
      setName("");
      setMessage("");
      setShowEmojis(false);
      setSent(true);
    } catch {
      setError("Could not send wishes. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="paper-bg relative overflow-x-clip px-4 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pt-8">
      <div className="relative mx-auto w-full max-w-[21.5rem] sm:max-w-xl md:max-w-2xl">
        <article className="relative z-10 rounded-2xl bg-white px-5 pb-6 pt-8 shadow-[0_18px_40px_rgba(11,39,72,0.12)] sm:px-8 sm:pb-8 sm:pt-10">
          <h2 className="text-center font-serif text-2xl font-semibold tracking-[0.18em] text-navy sm:text-3xl sm:tracking-[0.2em]">
            GUESTBOOK
          </h2>

          <form className="mt-7 space-y-4 sm:mt-8" onSubmit={onSubmit}>
            <label className="block">
              <span className="sr-only">Your name</span>
              <input
                required
                name="guest-name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name*"
                maxLength={80}
                className="w-full rounded-xl border-[1.5px] border-navy bg-white px-4 py-3 font-serif text-sm text-navy placeholder:text-navy/35 outline-none focus:ring-2 focus:ring-navy/15"
              />
            </label>
            <label className="block">
              <span className="sr-only">Your wishes</span>
              <textarea
                required
                name="guest-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your wishes for the couple"
                maxLength={600}
                rows={4}
                className="w-full resize-none rounded-xl border-[1.5px] border-navy bg-white px-4 py-3 font-serif text-sm leading-relaxed text-navy placeholder:text-navy/35 outline-none focus:ring-2 focus:ring-navy/15"
              />
            </label>

            <div className="relative flex items-center gap-3">
              {showEmojis ? (
                <div className="absolute bottom-[calc(100%+0.5rem)] left-0 z-20 flex gap-1 rounded-full bg-white px-2 py-1 shadow-[0_8px_20px_rgba(11,39,72,0.12)]">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="grid size-8 place-items-center rounded-full text-base touch-manipulation"
                      onClick={() => setMessage((current) => `${current}${emoji}`)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                aria-label="Add a blessing emoji"
                onClick={() => setShowEmojis((open) => !open)}
                className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#eef1f6] touch-manipulation"
              >
                <SparkleIcon />
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-navy px-5 font-sans text-[0.72rem] font-medium tracking-[0.2em] text-cream disabled:opacity-70 touch-manipulation sm:text-xs"
              >
                {sending ? "SENDING..." : "SEND WISHES"}
              </button>
            </div>
            {error ? <p className="text-center font-serif text-xs text-navy/70">{error}</p> : null}
            {sent ? (
              <p className="text-center font-serif text-xs text-navy/70">Thank you for your wishes.</p>
            ) : null}
          </form>

          <button
            type="button"
            onClick={() => setShowWishes(true)}
            className="mt-5 w-full text-center font-serif text-sm text-navy underline decoration-navy/40 underline-offset-4 touch-manipulation sm:mt-6"
          >
            Show wishes
          </button>
        </article>

        <div className="flower-bob pointer-events-none absolute -bottom-2 -left-10 z-20 w-[58%] max-w-[10.5rem] sm:-bottom-4 sm:-left-14 sm:max-w-[16rem]">
          <Image
            src="/images/flower-bl.png"
            alt=""
            width={1122}
            height={1402}
            className="h-auto w-full select-none"
          />
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[21.5rem] sm:mt-12 sm:max-w-xl md:max-w-2xl">
        <p className="px-2 text-center font-serif text-[0.82rem] italic leading-relaxed text-navy sm:px-6 sm:text-base">
          A wedding is not just a celebration of two hearts, but of everyone who has
          been part of our journey. Your presence would mean more to us than any gift
          — it would make our joy complete.
        </p>
      </div>

      <div className="mx-auto mt-10 flex flex-col items-center pb-2 sm:mt-12">
        <svg
          viewBox="0 0 72 12"
          className="h-3 w-[4.5rem] text-gold sm:h-3.5 sm:w-20"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6h22M46 6h22"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M36 1.5 38.2 5.4 42.5 6 38.2 6.6 36 10.5 33.8 6.6 29.5 6 33.8 5.4Z"
            fill="currentColor"
          />
        </svg>
        <a
          href="https://tadwin-website.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm text-navy/55 touch-manipulation hover:text-navy"
        >
          <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Tadwin solutions
        </a>
      </div>
      <WishesModal open={showWishes} onClose={() => setShowWishes(false)} />
    </section>
  );
}
