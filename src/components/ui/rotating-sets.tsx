"use client";

/**
 * RotatingSets: shows one set of items at a time (e.g. three testimonials)
 * and moves to the next set on a timer, with numbered buttons to pick a set
 * and Pause/Play. Timing and pause rules are shared with the lift tabs (see
 * `auto-rotate.tsx`). Every set stays in the page (hidden when not shown),
 * so all of them are indexable; without JavaScript the first set shows.
 */
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RotationProgress, RotationToggle, useAutoRotate } from "./auto-rotate";

export function RotatingSets({
  sets,
  label,
  className,
}: {
  /** Each set's content, already laid out (e.g. a grid of three cards). */
  sets: ReactNode[];
  /** What the sets are, for screen readers, e.g. "Testimonials". */
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const { rootRef, rootProps, cycling, running, userPaused, togglePause, stop } = useAutoRotate(
    sets.length > 1,
  );
  const count = sets.length;

  return (
    <div ref={rootRef} {...rootProps} className={cn("flex flex-col gap-6", className)}>
      {sets.map((set, index) => (
        <div
          key={index}
          role="group"
          aria-label={`${label}, set ${index + 1} of ${count}`}
          hidden={index !== active}
          className="motion-safe:animate-fade-in"
        >
          {set}
        </div>
      ))}
      {count > 1 ? (
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label={`Choose a set of ${label.toLowerCase()}`}
            className="flex gap-2"
          >
            {sets.map((_, index) => {
              const selected = index === active;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show set ${index + 1} of ${count}`}
                  aria-pressed={selected}
                  onClick={() => {
                    setActive(index);
                    stop();
                  }}
                  className={cn(
                    "relative inline-flex size-11 items-center justify-center overflow-hidden rounded-control border-2 text-sm font-semibold transition-colors duration-150",
                    selected
                      ? "border-brand bg-white text-brand-ink"
                      : "border-line-strong bg-white text-muted hover:border-subtle hover:text-brand-ink",
                  )}
                >
                  {index + 1}
                  {selected && cycling ? (
                    <RotationProgress
                      key={index}
                      running={running}
                      onDone={() => setActive((index + 1) % count)}
                      speed="set"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          {cycling ? (
            <RotationToggle paused={userPaused} onToggle={togglePause} what={label.toLowerCase()} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
