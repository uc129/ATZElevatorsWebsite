"use client";

/**
 * Shared timing for content that moves on by itself (the homepage lift tabs,
 * the testimonial sets). One place for the rules, so every rotating block
 * behaves the same (WCAG 2.2.2, Pause, Stop, Hide):
 * - it pauses on hover, while keyboard focus is inside and while off screen;
 * - the visitor can Pause and Play it;
 * - it stops for good once the visitor picks an item;
 * - it never runs for visitors who prefer reduced motion;
 * - focus never moves on its own.
 *
 * The timer is the progress bar itself: when its fill animation ends, the
 * caller moves on. Pausing the bar's animation pauses the timer, so the two
 * can't drift. Intervals are tokens (`--animate-tab-progress`,
 * `--animate-set-progress`).
 */
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { cn } from "@/lib/cn";

export function useAutoRotate(enabled: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [chosen, setChosen] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [enabled]);

  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [enabled]);

  const cycling = enabled && motionOk && !chosen;
  const running = cycling && !userPaused && !hovered && !focusInside && onScreen;

  return {
    rootRef,
    /** Rotating at all (it may still be paused). */
    cycling,
    /** Moving right now. */
    running,
    userPaused,
    togglePause: () => setUserPaused((paused) => !paused),
    /** The visitor picked an item: stop for good. */
    stop: () => setChosen(true),
    /** Spread on the block's root element. */
    rootProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      // Focus on the content pauses; focus on the Pause/Play button does not,
      // or Play could never resume.
      onFocus: (event: FocusEvent<HTMLElement>) =>
        setFocusInside(!(event.target as HTMLElement).closest("[data-autoplay-toggle]")),
      onBlur: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
      },
    },
  };
}

const speeds = {
  /** Lift tabs: short labels, 6 s. */
  tab: "animate-tab-progress",
  /** Testimonial sets: three quotes to read, 10 s. */
  set: "animate-set-progress",
} as const;

/**
 * The bar that fills along the bottom of the current item. Give it a `key`
 * of the current item so it restarts on every change. Its parent needs
 * `relative overflow-hidden`.
 */
export function RotationProgress({
  running,
  onDone,
  speed,
}: {
  running: boolean;
  onDone: () => void;
  speed: keyof typeof speeds;
}) {
  return (
    <span
      aria-hidden="true"
      onAnimationEnd={onDone}
      className={cn(
        "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand",
        speeds[speed],
        !running && "animation-paused",
      )}
    />
  );
}

/** Pause / Play for a rotating block. `what` names it, e.g. "the list". */
export function RotationToggle({
  paused,
  onToggle,
  what,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  what: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-autoplay-toggle
      onClick={onToggle}
      aria-label={paused ? `Play: move through ${what} automatically` : `Pause ${what}`}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-control px-4 text-sm font-semibold text-muted transition-colors hover:bg-box hover:text-brand-ink",
        className,
      )}
    >
      {paused ? (
        <Play aria-hidden="true" className="size-4" />
      ) : (
        <Pause aria-hidden="true" className="size-4" />
      )}
      {paused ? "Play" : "Pause"}
    </button>
  );
}
