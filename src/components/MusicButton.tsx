"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const AUDIO_SRC = "/audio/IMG_9316.mp3";
const VOLUME = 0.6;

function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-cream sm:size-6" aria-hidden>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

function EqualizerIcon() {
  return (
    <span className="eq-bars text-cream" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default function MusicButton({
  visible,
  shouldPlay,
}: {
  visible: boolean;
  shouldPlay: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";
    audio.loop = false;
    audio.volume = VOLUME;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (!shouldPlay) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }
    audio.volume = VOLUME;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Open is a user gesture; retry once if the element was still loading.
      const retry = () => {
        audio.currentTime = 0;
        void audio.play().catch(() => {});
      };
      audio.addEventListener("canplay", retry, { once: true });
    });
  }, [shouldPlay]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      audio.volume = VOLUME;
      if (audio.ended || audio.currentTime >= audio.duration - 0.05) {
        audio.currentTime = 0;
      }
      void audio.play();
    } else {
      audio.pause();
    }
  }

  if (!mounted || !visible) {
    return null;
  }

  return createPortal(
    <button
      type="button"
      data-music-toggle
      aria-label={playing ? "Pause music" : "Play music"}
      onClick={toggle}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid size-12 place-items-center rounded-full bg-navy shadow-[0_8px_18px_rgba(11,39,72,0.28)] touch-manipulation sm:right-6 sm:bottom-6 sm:size-14"
    >
      {playing ? <EqualizerIcon /> : <MusicNoteIcon />}
    </button>,
    document.body,
  );
}
