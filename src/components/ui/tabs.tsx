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
 * filling under the active tab. The timing and pause rules are shared with
 * other rotating blocks: see `auto-rotate.tsx`.
 */
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RotationProgress, RotationToggle, useAutoRotate } from "./auto-rotate";

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
  const vertical = orientation === "vertical";
  const { rootRef, rootProps, cycling, running, userPaused, togglePause, stop } =
    useAutoRotate(autoAdvance);

  function select(id: string) {
    setActive(id);
    stop();
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
              <RotationProgress key={item.id} running={running} onDone={advance} speed="tab" />
            ) : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      ref={rootRef}
      {...(autoAdvance ? rootProps : {})}
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
            <RotationToggle
              paused={userPaused}
              onToggle={togglePause}
              what="the list"
              className="self-start"
            />
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
