/**
 * Section heading: eyebrow, h2 and optional lead text and actions. Keeps
 * every homepage and inner-page section consistent.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  actions,
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  /** id for the h2, for aria-labelledby on the section */
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="flex max-w-3xl flex-col gap-3.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="text-h2 font-bold">
          {title}
        </h2>
        {lead ? <p className="text-lg text-muted">{lead}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
