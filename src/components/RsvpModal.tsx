"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { fieldErrorsFromZod, rsvpSchema } from "@/lib/rsvp";

type Attendance = boolean | null;

function CheckIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M9.55 17.6 4.9 12.95l1.4-1.4 3.25 3.25 7.15-7.15 1.4 1.4z"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M18.3 5.71 12 12.01 5.7 5.7 4.29 7.11 10.59 13.4 4.29 19.7 5.7 21.11 12 14.82 18.29 21.11 19.7 19.7 13.41 13.4 19.71 7.11z"
      />
    </svg>
  );
}

export default function RsvpModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attendance>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  function reset() {
    setName("");
    setAttending(null);
    setGuestCount(1);
    setMessage("");
    setErrors({});
    setSubmitted(false);
    setSending(false);
    setDone(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function validate(next = { name, attending, guestCount, message }) {
    const parsed = rsvpSchema.safeParse({
      name: next.name,
      attending: next.attending,
      guestCount: next.attending ? next.guestCount : undefined,
      message: next.message,
    });

    if (parsed.success) {
      setErrors({});
      return parsed.data;
    }

    setErrors(fieldErrorsFromZod(parsed.error));
    return null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const data = validate();
    if (!data || sending) {
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { fields?: Record<string, string>; error?: string }
          | null;
        setErrors(payload?.fields ?? { form: payload?.error ?? "Could not send RSVP." });
        return;
      }
      setDone(true);
    } catch {
      setErrors({ form: "Could not send RSVP. Please try again." });
    } finally {
      setSending(false);
    }
  }

  if (!mounted || !open) {
    return null;
  }

  const confirmReady = attending !== null && !sending;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close attendance form"
        className="absolute inset-0 bg-navy/55"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[24rem] rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(7,24,47,0.28)] sm:p-6"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-navy/15 text-navy/60 touch-manipulation"
          aria-label="Close"
        >
          <CloseIcon className="size-4" />
        </button>

        {done ? (
          <div className="py-6 text-center">
            <p id={titleId} className="font-sans text-lg font-semibold text-navy">
              Thank you
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-navy/65">
              {attending
                ? "We have received your RSVP and look forward to celebrating with you."
                : "We have received your note. You will be missed, and we appreciate you letting us know."}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-navy font-sans text-sm text-cream touch-manipulation"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2 id={titleId} className="pr-8 font-sans text-lg font-semibold text-navy">
              Confirm your attendance
            </h2>
            <p className="mt-1 font-sans text-sm leading-relaxed text-navy/55">
              Your presence would be an honor. Please RSVP so we can prepare the warmest
              welcome for you.
            </p>

            <label className="mt-5 block">
              <span className="font-sans text-sm font-medium text-navy">Your name</span>
              <input
                autoFocus
                name="rsvp-name"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  const value = event.target.value;
                  setName(value);
                  if (submitted) {
                    validate({ name: value, attending, guestCount, message });
                  }
                }}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-xl border border-navy/15 px-3.5 py-2.5 font-sans text-sm text-navy outline-none placeholder:text-navy/35 focus:border-navy/40 focus:ring-2 focus:ring-navy/10"
              />
              {errors.name ? (
                <span className="mt-1 block font-sans text-xs text-red-500">{errors.name}</span>
              ) : null}
            </label>

            <fieldset className="mt-4">
              <legend className="font-sans text-sm font-medium text-navy">Will you attend?</legend>
              <div className="mt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setAttending(true);
                    if (submitted) {
                      validate({ name, attending: true, guestCount, message });
                    }
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left font-sans text-sm touch-manipulation ${
                    attending === true
                      ? "border-emerald-400 bg-emerald-50 text-navy"
                      : "border-transparent bg-[#f4f6fa] text-navy"
                  }`}
                >
                  <span
                    className={`grid size-7 place-items-center rounded-full ${
                      attending === true ? "bg-emerald-500 text-white" : "bg-white text-navy/35"
                    }`}
                  >
                    <CheckIcon className="size-4" />
                  </span>
                  I will attend
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAttending(false);
                    if (submitted) {
                      validate({ name, attending: false, guestCount, message });
                    }
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left font-sans text-sm touch-manipulation ${
                    attending === false
                      ? "border-red-400 bg-red-50 text-navy"
                      : "border-transparent bg-[#f4f6fa] text-navy"
                  }`}
                >
                  <span
                    className={`grid size-7 place-items-center rounded-full ${
                      attending === false ? "bg-red-500 text-white" : "bg-white text-navy/35"
                    }`}
                  >
                    <CloseIcon className="size-3.5" />
                  </span>
                  Sorry, I can&apos;t make it
                </button>
              </div>
              {errors.attending ? (
                <span className="mt-1 block font-sans text-xs text-red-500">
                  {errors.attending}
                </span>
              ) : null}
            </fieldset>

            {attending === true ? (
              <div className="mt-4">
                <p className="font-sans text-sm font-medium text-navy">
                  Number of guests (including you)
                </p>
                <div className="mt-2 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                    className="grid size-8 place-items-center rounded-full border border-navy/20 text-lg leading-none text-navy touch-manipulation"
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center font-sans text-base text-navy">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    aria-label="More guests"
                    onClick={() => setGuestCount((count) => Math.min(20, count + 1))}
                    className="grid size-8 place-items-center rounded-full border border-navy/20 text-lg leading-none text-navy touch-manipulation"
                  >
                    +
                  </button>
                </div>
                {errors.guestCount ? (
                  <span className="mt-1 block text-center font-sans text-xs text-red-500">
                    {errors.guestCount}
                  </span>
                ) : null}
              </div>
            ) : null}

            {attending !== null ? (
              <label className="mt-4 block">
                <span className="font-sans text-sm font-medium text-navy">
                  Message to the couple
                </span>
                <textarea
                  name="rsvp-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Leave a note (optional)"
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-navy/15 px-3.5 py-2.5 font-sans text-sm text-navy outline-none placeholder:text-navy/35 focus:border-navy/40 focus:ring-2 focus:ring-navy/10"
                />
                {errors.message ? (
                  <span className="mt-1 block font-sans text-xs text-red-500">
                    {errors.message}
                  </span>
                ) : null}
              </label>
            ) : null}

            {errors.form ? (
              <p className="mt-3 font-sans text-xs text-red-500">{errors.form}</p>
            ) : null}

            <button
              type="submit"
              disabled={!confirmReady}
              className={`mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg font-sans text-sm touch-manipulation ${
                confirmReady
                  ? "bg-navy text-cream"
                  : "bg-[#c5cad3] text-white"
              }`}
            >
              {sending ? "Sending..." : "Confirm"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
