"use client";

/**
 * Spotlight: a faint light that follows the pointer inside a card.
 * Source: the cuicui website's card hover light (https://cuicui.day) and
 * cuicui "Hover effect card" (https://cuicui.day/common-ui/cards). MIT, see
 * THIRD_PARTY_NOTICES.md.
 * Adapted: ice-cyan instead of a rainbow gradient, CSS-only light (the
 * `spotlight` utility in tokens.css); this component only feeds the pointer
 * position. Touch and keyboard users get the light centred on focus.
 */
import type { HTMLAttributes, PointerEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * `as` is an element name only: a client component cannot receive a server
 * component as a prop. For card looks, pass `className={cardStyles(...)}`.
 */
type SpotlightProps = {
  as?: "div" | "li" | "article" | "section";
} & HTMLAttributes<HTMLElement>;

export function Spotlight({ as: Tag = "div", className, onPointerMove, ...props }: SpotlightProps) {
  function handleMove(event: PointerEvent<HTMLElement>) {
    onPointerMove?.(event);
    if (event.pointerType === "touch") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return <Tag className={cn("spotlight", className)} onPointerMove={handleMove} {...props} />;
}
