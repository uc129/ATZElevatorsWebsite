/**
 * Badge (status and labels).
 * Source: cuicui "Advanced badges" and "Modern simple badges" (tinted fill,
 * soft same-hue border, deep text, optional icon), and the dashed outline of
 * cuicui "Clerk badge" for pending; https://cuicui.day/common-ui/badges.
 * MIT, see THIRD_PARTY_NOTICES.md.
 * Adapted: ATZ status tokens with AA text, pill shape, text always shown
 * (colour is never the only signal). "pending" is the greyed, dashed
 * "Verification pending" badge; "onPhoto" is frosted for use over images.
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone =
  "brand" | "neutral" | "success" | "warning" | "danger" | "info" | "pending" | "onPhoto";

const tones: Record<BadgeTone, string> = {
  brand: "border-tint-line bg-tint text-brand-ink",
  neutral: "border-neutral-line bg-neutral-light text-neutral-text",
  success: "border-success-line bg-success-light text-success-text",
  warning: "border-warning-line bg-warning-light text-warning-text",
  danger: "border-danger-line bg-danger-light text-danger-text",
  info: "border-info-line bg-info-light text-info-text",
  pending: "border-dashed border-neutral bg-neutral-light text-neutral-text",
  onPhoto: "border-white/60 bg-white/90 text-muted shadow-xs backdrop-blur-sm",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: { tone?: BadgeTone } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold [&_svg]:size-3.5 [&_svg]:shrink-0",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
