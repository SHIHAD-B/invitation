"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FallingFlowers from "@/components/FallingFlowers";
import InvitationInner from "@/components/InvitationInner";
import MusicButton from "@/components/MusicButton";

type Phase = "idle" | "opening" | "opened";

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.05rem] fill-cream sm:size-5"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3 fill-ink/40 sm:size-3.5"
      aria-hidden
    >
      <path d="M8 1.2c2.8 1.8 4.8 4.4 4.8 7.2 0 2.2-1.4 3.6-3.2 3.6-.6 0-1.1-.2-1.6-.5.4 1.6.4 2.8.2 4.1H7.8c-.2-1.3-.2-2.5.2-4.1-.5.3-1 .5-1.6.5-1.8 0-3.2-1.4-3.2-3.6C3.2 5.6 5.2 3 8 1.2Z" />
    </svg>
  );
}

function BloomBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div className="bloom-glow absolute left-1/2 top-1/2 size-[130%] rounded-full bg-[#8aa4c8]/35 blur-3xl" />
      <Image
        src="/images/flower-left.png"
        alt=""
        width={720}
        height={900}
        className="bloom-left absolute -left-[38%] -top-[18%] h-auto w-[92%] max-w-none"
      />
      <Image
        src="/images/flower-right.png"
        alt=""
        width={720}
        height={900}
        className="bloom-right absolute -right-[38%] -top-[18%] h-auto w-[92%] max-w-none"
      />
      <Image
        src="/images/flower-left.png"
        alt=""
        width={720}
        height={900}
        className="bloom-left absolute -left-[22%] top-[8%] h-auto w-[70%] max-w-none opacity-80"
      />
      <Image
        src="/images/flower-right.png"
        alt=""
        width={720}
        height={900}
        className="bloom-right absolute -right-[22%] top-[8%] h-auto w-[70%] max-w-none opacity-80"
      />
    </div>
  );
}

export default function InvitationCover() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (phase !== "opening") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(
      () => setPhase("opened"),
      reduceMotion ? 0 : 2350,
    );

    return () => window.clearTimeout(timeout);
  }, [phase]);

  function handleOpen() {
    if (phase !== "idle") {
      return;
    }
    setPhase("opening");
  }

  const opening = phase === "opening";

  return (
    <section
      className={`relative isolate min-h-dvh flex-1 ${
        phase === "opened"
          ? "overflow-x-clip overflow-y-auto bg-[#f3eee4]"
          : "flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#163a66_0%,_#0a2344_52%,_#07182f_100%)] px-4 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6"
      }`}
    >
      {phase === "opened" ? null : <FallingFlowers />}

      {phase === "opened" ? (
        <>
          <InvitationInner />
          <MusicButton />
        </>
      ) : (
        <div className="relative z-10 w-full max-w-[23.5rem] sm:max-w-xl md:max-w-[46rem] lg:max-w-[52rem]">
          {opening ? <BloomBurst /> : null}

          <article
            className={`relative z-10 rounded-[1.5rem] bg-cream px-5 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:px-10 sm:py-10 md:px-16 md:py-12 ${opening ? "card-open" : ""}`}
          >
            <Image
              src="/images/flower-left.png"
              alt=""
              width={720}
              height={900}
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 768px) 42vw, 260px"
              className="pointer-events-none absolute -left-1 top-3 z-[1] h-auto w-[42%] max-w-[10.5rem] select-none sm:-left-2 sm:top-4 sm:max-w-[13.5rem] md:-left-3 md:top-5 md:w-[36%] md:max-w-[16.5rem]"
            />
            <Image
              src="/images/flower-right.png"
              alt=""
              width={720}
              height={900}
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 768px) 42vw, 260px"
              className="pointer-events-none absolute -right-1 top-3 z-[1] h-auto w-[42%] max-w-[10.5rem] select-none sm:-right-2 sm:top-4 sm:max-w-[13.5rem] md:-right-3 md:top-5 md:w-[36%] md:max-w-[16.5rem]"
            />

            <div className="relative z-10 flex flex-col items-center px-8 sm:px-16 md:px-20">
              <div className={`relative mb-5 sm:mb-6 md:mb-7 ${opening ? "heart-exit" : ""}`}>
                <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b86b4]/35 blur-xl sm:size-20" />
                <div className="relative flex size-12 items-center justify-center rounded-full bg-navy shadow-[0_8px_20px_rgba(11,39,72,0.22)] sm:size-14">
                  <HeartIcon />
                </div>
              </div>

              <h1 className="font-serif text-[1.7rem] font-normal leading-[1.15] tracking-[-0.01em] text-ink sm:text-[2.15rem] md:text-[2.45rem]">
                <span className="block">Shuhaib Babu</span>
                <span className="my-1 block font-serif text-[1.05rem] font-normal text-ink sm:my-1.5 sm:text-xl">
                  &amp;
                </span>
                <span className="block">Afreena K.S</span>
              </h1>

              <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6">
                <span className="h-px w-10 bg-ink/25 sm:w-14" />
                <LeafMark />
                <span className="h-px w-10 bg-ink/25 sm:w-14" />
              </div>

              <p className="mt-4 font-serif text-[0.95rem] tracking-[0.03em] text-ink/70 sm:mt-5 sm:text-base">
                January 3, 2027
              </p>
              <p className="mt-3 font-serif text-sm tracking-[0.02em] text-ink/60 sm:mt-4 sm:text-[0.95rem]">
                Cordially Invites
              </p>

              <button
                type="button"
                onClick={handleOpen}
                disabled={opening}
                aria-busy={opening}
                className="open-flash relative mt-7 inline-flex min-h-11 min-w-[6.5rem] items-center justify-center overflow-hidden rounded-full bg-navy px-8 py-2.5 font-sans text-sm font-medium tracking-wide text-cream touch-manipulation disabled:cursor-wait sm:mt-8"
              >
                <span className="shine pointer-events-none absolute inset-0 overflow-hidden rounded-full" />
                <span className="relative z-10">Open</span>
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
