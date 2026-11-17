"use client";

/**
 * Tabs (WAI-ARIA tabs pattern, automatic activation).
 * No cuicui source: cuicui has no tabs component (ADR 0002 allows building on
 * the same tokens). Styling follows the product tabs on the prototype.
 * Keyboard: arrows move and select (Up/Down when vertical, Left/Right when
 * horizontal), Home/End jump to the ends. Inactive panels stay in the DOM
 * (hidden) so their content is still indexable.
 */
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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

export function Tabs({
  items,
  label,
  orientation = "horizontal",
  defaultId,
  className,
  listClassName,
}: {
  items: TabItem[];
  /** Accessible name for the tab list. */
  label: string;
  orientation?: "horizontal" | "vertical";
  defaultId?: string;
  className?: string;
  listClassName?: string;
}) {
  const base = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const vertical = orientation === "vertical";

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const target = targetIndex(event.key, index, items.length - 1, vertical);
    const item = target === null ? undefined : items[target];
    if (target === null || !item) return;
    event.preventDefault();
    setActive(item.id);
    tabRefs.current[target]?.focus();
  }

  return (
    <div
      className={cn(
        vertical ? "flex flex-col gap-8 lg:flex-row lg:items-start" : "flex flex-col gap-6",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        className={cn(vertical ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5", listClassName)}
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
              onClick={() => setActive(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 rounded-control border-2 px-4 py-3 text-left text-base whitespace-nowrap transition-colors duration-150",
                selected
                  ? "border-brand bg-white font-semibold text-brand-ink"
                  : "border-transparent font-medium text-muted hover:bg-box hover:text-brand-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${base}-panel-${item.id}`}
          aria-labelledby={`${base}-tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className="min-w-0 flex-1"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
