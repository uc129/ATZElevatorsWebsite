/**
 * Page width container and section spacing. No cuicui source; ATZ layout tokens
 * (1240px content width, 16px/32px gutters, 104px section padding on desktop).
 */
import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-content px-4 md:px-8", className)} {...props} />;
}

export function Section({
  as: Tag = "section",
  className,
  ...props
}: { as?: ElementType } & HTMLAttributes<HTMLElement>) {
  return <Tag className={cn("py-16 lg:py-26", className)} {...props} />;
}
