/**
 * Skeleton loading placeholder.
 * Source: cuicui "Classic pulse" skeleton, https://cuicui.day/common-ui/skeletons.
 * MIT, see THIRD_PARTY_NOTICES.md.
 * Adapted: ATZ line colour; pulses only when motion is allowed; hidden from
 * assistive tech (announce loading with text elsewhere).
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-md bg-line motion-safe:animate-pulse", className)}
      {...props}
    />
  );
}
