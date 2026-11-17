/**
 * Card: soft grey container, and FramedCard.
 * Source: cuicui "Cards" (hover-effect-card, modern-inner-shadow),
 * https://cuicui.day/common-ui/cards, and the framed panels on the cuicui
 * website. MIT, see THIRD_PARTY_NOTICES.md.
 * Adapted: ATZ surfaces and radii. `interactive` adds the brand-tinted lift and
 * a slight rise on hover and a press on click (motion-safe only, no bounce).
 * Use `as="article"` or `"li"` for semantics. For the pointer light, wrap the
 * content in <Spotlight>.
 */
import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  as?: ElementType;
  tone?: "box" | "white";
  interactive?: boolean;
} & HTMLAttributes<HTMLElement>;

export const interactiveCard =
  "transition duration-250 ease-default hover:shadow-lift motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-99";

/** Card classes, for elements that cannot be a Card (e.g. a Spotlight). */
export function cardStyles({
  tone = "box",
  interactive,
  className,
}: { tone?: "box" | "white"; interactive?: boolean; className?: string } = {}) {
  return cn(
    "rounded-lg border",
    tone === "box" ? "border-box-line bg-box" : "border-line bg-white",
    interactive && interactiveCard,
    className,
  );
}

export function Card({ as: Tag = "div", tone, interactive, className, ...props }: CardProps) {
  return <Tag className={cardStyles({ tone, interactive, className })} {...props} />;
}

/**
 * Two layers: a soft grey frame with an inner white panel, lit by a diffused
 * shadow. For feature cards and media; the inner panel takes `innerClassName`.
 */
export function FramedCard({
  as: Tag = "div",
  interactive,
  className,
  innerClassName,
  children,
  ...props
}: {
  as?: ElementType;
  interactive?: boolean;
  innerClassName?: string;
} & HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-box-line bg-box p-1.5 shadow-diffuse",
        interactive && interactiveCard,
        className,
      )}
      {...props}
    >
      <div className={cn("h-full rounded-md border border-line bg-white", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
