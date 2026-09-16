"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("en-US");
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M18.3 5.71 12 12.01 5.7 5.7 4.29 7.11 10.59 13.4 4.29 19.7 5.7 21.11 12 14.82 18.29 21.11 19.7 19.7 13.41 13.4 19.71 7.11z" />
    </svg>
  );
}

export default function WishesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    fetch("/api/guestbook")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load wishes");
        }
        return response.json() as Promise<{ wishes?: Wish[] }>;
      })
      .then((data) => {
        if (!cancelled) {
          setWishes(data.wishes ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load wishes.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close wishes"
        className="absolute inset-0 bg-navy/55"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(80dvh,36rem)] w-full max-w-[24rem] flex-col rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(7,24,47,0.28)] sm:p-6"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-navy/15 text-navy/60 touch-manipulation"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2 id={titleId} className="pr-8 font-serif text-lg font-semibold tracking-[0.12em] text-navy">
          WISHES
        </h2>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
          {loading ? (
            <p className="py-8 text-center font-serif text-sm text-navy/60">Loading wishes…</p>
          ) : error ? (
            <p className="py-8 text-center font-serif text-sm text-navy/70">{error}</p>
          ) : wishes.length === 0 ? (
            <p className="py-8 text-center font-serif text-sm text-navy/60">No wishes yet.</p>
          ) : (
            <ul className="space-y-3">
              {wishes.map((wish) => (
                <li key={wish.id} className="rounded-xl bg-[#f3f6fb] px-4 py-3 text-left text-navy">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-serif text-sm font-semibold sm:text-base">{wish.name}</p>
                    <p className="shrink-0 font-sans text-[0.65rem] text-navy/55 sm:text-xs">
                      {formatTime(wish.createdAt)}
                    </p>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap font-serif text-sm leading-relaxed text-navy/80">
                    {wish.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
