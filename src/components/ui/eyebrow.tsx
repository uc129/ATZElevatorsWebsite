/**
 * Eyebrow label above section headings. No cuicui source; ATZ typography token.
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-caption font-semibold tracking-wide text-brand-ink uppercase",
        className,
      )}
      {...props}
    />
  );
}
