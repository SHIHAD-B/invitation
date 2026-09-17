"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { createPortal } from "react-dom";

const AUDIO_SRC = "/audio/IMG_9316.mp3";
const VOLUME = 0.2;

export type MusicHandle = {
  startFromBeginning: () => void;
};

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

function getAudioContextClass(): typeof AudioContext | null {
  if (typeof globalThis === "undefined") {
    return null;
  }
  const globalWindow = globalThis as typeof globalThis & {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  return globalWindow.AudioContext ?? globalWindow.webkitAudioContext ?? null;
}

export default function MusicButton({
  visible,
  ref,
}: {
  visible: boolean;
  ref?: Ref<MusicHandle>;
}) {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const offsetRef = useRef(0);
  const startedAtRef = useRef(0);
  const stoppingRef = useRef(false);
  const pendingStartRef = useRef(false);

  function ensureGraph() {
    const Context = getAudioContextClass();
    if (!Context) {
      return null;
    }
    if (!contextRef.current) {
      const context = new Context();
      const gain = context.createGain();
      gain.gain.value = VOLUME;
      gain.connect(context.destination);
      contextRef.current = context;
      gainRef.current = gain;
    }
    const context = contextRef.current;
    const gain = gainRef.current;
    if (context && gain) {
      gain.gain.setValueAtTime(VOLUME, context.currentTime);
    }
    return context;
  }

  function stopSource() {
    stoppingRef.current = true;
    const source = sourceRef.current;
    if (source) {
      source.onended = null;
      try {
        source.stop();
      } catch {
        // Already stopped.
      }
      source.disconnect();
      sourceRef.current = null;
    }
    stoppingRef.current = false;
  }

  function startSource(offset: number) {
    const context = contextRef.current;
    const gain = gainRef.current;
    const buffer = bufferRef.current;
    if (!context || !gain || !buffer) {
      return;
    }
    stopSource();
    gain.gain.setValueAtTime(VOLUME, context.currentTime);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(gain);
    source.onended = () => {
      if (stoppingRef.current) {
        return;
      }
      offsetRef.current = 0;
      sourceRef.current = null;
      setPlaying(false);
    };
    const startOffset = Math.max(0, Math.min(offset, Math.max(buffer.duration - 0.05, 0)));
    source.start(0, startOffset);
    sourceRef.current = source;
    startedAtRef.current = context.currentTime - startOffset;
    offsetRef.current = startOffset;
    setPlaying(true);
  }

  function startFromBeginning() {
    const context = ensureGraph();
    if (!context) {
      return;
    }
    void context.resume();
    offsetRef.current = 0;
    if (bufferRef.current) {
      startSource(0);
      return;
    }
    pendingStartRef.current = true;
  }

  function toggle() {
    const context = ensureGraph();
    if (!context || !bufferRef.current) {
      return;
    }
    void context.resume();
    if (playing && sourceRef.current) {
      offsetRef.current = Math.max(0, context.currentTime - startedAtRef.current);
      stopSource();
      setPlaying(false);
      return;
    }
    startSource(offsetRef.current);
  }

  useImperativeHandle(ref, () => ({ startFromBeginning }));

  useEffect(() => {
    setMounted(true);
    const context = ensureGraph();
    if (!context) {
      return;
    }

    let cancelled = false;
    void fetch(AUDIO_SRC)
      .then((response) => response.arrayBuffer())
      .then((data) => context.decodeAudioData(data.slice(0)))
      .then((buffer) => {
        if (cancelled) {
          return;
        }
        bufferRef.current = buffer;
        if (pendingStartRef.current) {
          pendingStartRef.current = false;
          startSource(0);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      stopSource();
      void contextRef.current?.close();
      contextRef.current = null;
      gainRef.current = null;
      bufferRef.current = null;
    };
  }, []);

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
