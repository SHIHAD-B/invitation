"use client";

import { useLayoutEffect, type RefObject } from "react";

const START_MS = 800;
const IDLE_MS = 5000;
const PX_PER_SEC = 56;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

function isMusicToggle(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-music-toggle]"));
}

export function useIdleAutoScroll(
  enabled: boolean,
  scrollerRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const scroller = scrollerRef.current;
    if (!(scroller instanceof HTMLDivElement)) {
      return;
    }

    let paused = true;
    let touching = false;
    let idleTimer = 0;
    let frame = 0;
    let last = performance.now();

    function arm(delay: number) {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (touching || isTypingTarget(document.activeElement)) {
          arm(IDLE_MS);
          return;
        }
        paused = false;
        last = performance.now();
      }, delay);
    }

    function pauseFromUser(event: Event) {
      if (isMusicToggle(event.target)) {
        return;
      }
      paused = true;
      if (event.type === "touchstart") {
        touching = true;
        window.clearTimeout(idleTimer);
        return;
      }
      if (event.type === "touchend" || event.type === "touchcancel") {
        touching = false;
        arm(IDLE_MS);
        return;
      }
      if (touching) {
        window.clearTimeout(idleTimer);
        return;
      }
      arm(IDLE_MS);
    }

    function onFocusIn(event: FocusEvent) {
      if (!isTypingTarget(event.target)) {
        return;
      }
      paused = true;
      window.clearTimeout(idleTimer);
    }

    function onFocusOut(event: FocusEvent) {
      if (isTypingTarget(event.target)) {
        arm(IDLE_MS);
      }
    }

    function tick(now: number) {
      const delta = Math.min(50, now - last);
      last = now;
      const node = scrollerRef.current;
      if (!paused && node) {
        const max = node.scrollHeight - node.clientHeight;
        if (max > 4) {
          node.scrollTop = Math.min(max, node.scrollTop + (PX_PER_SEC * delta) / 1000);
        }
      }
      frame = window.requestAnimationFrame(tick);
    }

    const passive = { passive: true } as const;
    scroller.addEventListener("wheel", pauseFromUser, passive);
    scroller.addEventListener("touchstart", pauseFromUser, passive);
    scroller.addEventListener("touchmove", pauseFromUser, passive);
    scroller.addEventListener("touchend", pauseFromUser, passive);
    scroller.addEventListener("touchcancel", pauseFromUser, passive);
    scroller.addEventListener("pointerdown", pauseFromUser, passive);
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("focusout", onFocusOut);

    arm(START_MS);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(idleTimer);
      window.cancelAnimationFrame(frame);
      scroller.removeEventListener("wheel", pauseFromUser);
      scroller.removeEventListener("touchstart", pauseFromUser);
      scroller.removeEventListener("touchmove", pauseFromUser);
      scroller.removeEventListener("touchend", pauseFromUser);
      scroller.removeEventListener("touchcancel", pauseFromUser);
      scroller.removeEventListener("pointerdown", pauseFromUser);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("focusout", onFocusOut);
    };
  }, [enabled, scrollerRef]);
}
