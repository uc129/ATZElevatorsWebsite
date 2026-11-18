"use client";

/**
 * Tabs (WAI-ARIA tabs pattern, automatic activation).
 * No cuicui source: cuicui has no tabs component (ADR 0002 allows building on
 * the same tokens). Styling follows the product tabs on the prototype.
 * Keyboard: arrows move and select (Up/Down when vertical, Left/Right when
 * horizontal), Home/End jump to the ends. Inactive panels stay in the DOM
 * (hidden) so their content is still indexable.
 *
 * `autoAdvance` (opt-in) moves to the next tab on a timer, shown as a bar
 * filling under the active tab (`--animate-tab-progress` sets the interval;
 * the bar's animation end is the timer, so pausing one pauses the other).
 * WCAG 2.2.2: it pauses on hover, on focus inside and while off screen, has a
 * Pause/Play button, stops for good once the visitor picks a tab, and never
 * runs for visitors who prefer reduced motion. Focus never moves on its own.
 */
import { Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: ReactNode; content: ReactNode };

function targetIndex(key: string, index: number, last: number, vertical: boolean) {
  const next = vertical ? "ArrowDown" : "ArrowRight";
  const prev = vertical ? "ArrowUp" : "ArrowLeft";
  if (key === next) return index === last ? 0 : index + 1;
  if (key === prev) return index === 0 ? last : index - 1;
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}

/** Whether auto-advance may run: off for reduced motion, and while off screen. */
function useAutoAdvanceAllowed(enabled: boolean, rootRef: React.RefObject<HTMLElement | null>) {
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
  }, [enabled, rootRef]);

  return { motionOk, onScreen };
}

export function Tabs({
  items,
  label,
  orientation = "horizontal",
  defaultId,
  className,
  listClassName,
  autoAdvance = false,
}: {
  items: TabItem[];
  /** Accessible name for the tab list. */
  label: string;
  orientation?: "horizontal" | "vertical";
  defaultId?: string;
  className?: string;
  listClassName?: string;
  /** Move to the next tab on a timer until the visitor picks one. */
  autoAdvance?: boolean;
}) {
  const base = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const vertical = orientation === "vertical";

  // Auto-advance state: stopped for good once the visitor chooses a tab.
  const [chosen, setChosen] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const { motionOk, onScreen } = useAutoAdvanceAllowed(autoAdvance, rootRef);
  const cycling = autoAdvance && motionOk && !chosen;
  const running = cycling && !userPaused && !hovered && !focusInside && onScreen;

  function select(id: string) {
    setActive(id);
    setChosen(true);
  }

  function advance() {
    const index = items.findIndex((item) => item.id === active);
    const next = items[(index + 1) % items.length];
    if (next) setActive(next.id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const target = targetIndex(event.key, index, items.length - 1, vertical);
    const item = target === null ? undefined : items[target];
    if (target === null || !item) return;
    event.preventDefault();
    select(item.id);
    tabRefs.current[target]?.focus();
  }

  const tablist = (
    <div
      role="tablist"
      aria-label={label}
      aria-orientation={orientation}
      className={cn(
        vertical ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5",
        !autoAdvance && listClassName,
      )}
    >
      {items.map((item, index) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`${base}-panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => select(item.id)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={cn(
              "relative flex min-h-12 items-center justify-between gap-3 overflow-hidden rounded-control border-2 px-4 py-3 text-left text-base whitespace-nowrap transition-colors duration-150",
              selected
                ? "border-brand bg-white font-semibold text-brand-ink"
                : "border-transparent font-medium text-muted hover:bg-box hover:text-brand-ink",
            )}
          >
            {item.label}
            {selected && cycling ? (
              // The timer: when this bar finishes filling, the next tab is selected.
              <span
                key={item.id}
                aria-hidden="true"
                onAnimationEnd={advance}
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 origin-left animate-tab-progress bg-brand",
                  !running && "animation-paused",
                )}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Focus on the tabs or a panel pauses; focus on the Pause/Play button does not,
      // or Play could never resume.
      onFocus={(event) =>
        setFocusInside(!(event.target as HTMLElement).closest("[data-autoplay-toggle]"))
      }
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
      }}
      className={cn(
        vertical ? "flex flex-col gap-8 lg:flex-row lg:items-start" : "flex flex-col gap-6",
        className,
      )}
    >
      {autoAdvance ? (
        // Same wrapper whether or not it is cycling, so choosing a tab never shifts the layout.
        <div className={cn("flex flex-col gap-2", listClassName)}>
          {tablist}
          {cycling ? (
            <button
              type="button"
              data-autoplay-toggle
              onClick={() => setUserPaused((paused) => !paused)}
              aria-label={
                userPaused ? "Play: move through the list automatically" : "Pause the list"
              }
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-control px-4 text-sm font-semibold text-muted transition-colors hover:bg-box hover:text-brand-ink"
            >
              {userPaused ? (
                <Play aria-hidden="true" className="size-4" />
              ) : (
                <Pause aria-hidden="true" className="size-4" />
              )}
              {userPaused ? "Play" : "Pause"}
            </button>
          ) : null}
        </div>
      ) : (
        tablist
      )}
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${base}-panel-${item.id}`}
          aria-labelledby={`${base}-tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className={cn("min-w-0 flex-1", autoAdvance && "motion-safe:animate-fade-in")}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
