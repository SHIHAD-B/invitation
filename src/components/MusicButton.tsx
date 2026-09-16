"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-cream sm:size-6" aria-hidden>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

export default function MusicButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <button
      type="button"
      aria-label="Play music"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid size-12 place-items-center rounded-full bg-navy shadow-[0_8px_18px_rgba(11,39,72,0.28)] touch-manipulation sm:right-6 sm:bottom-6 sm:size-14"
    >
      <MusicIcon />
    </button>,
    document.body,
  );
}
