/**
 * Honest placeholder for a feature that is planned but not built yet (for
 * example online complaints, which need the ERP). Says what is coming and
 * how to get help today.
 */
import { Construction } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { FramedCard } from "@/components/ui/card";

export function ComingSoon({
  title,
  children,
}: {
  title: string;
  /** What will be here, and what to do meanwhile */
  children: ReactNode;
}) {
  return (
    <FramedCard innerClassName="flex flex-col items-start gap-4 p-6 md:p-8">
      <Badge tone="info">
        <Construction aria-hidden="true" /> Coming soon
      </Badge>
      <h2 className="text-h3 font-bold">{title}</h2>
      <div className="flex max-w-2xl flex-col gap-3 text-muted">{children}</div>
    </FramedCard>
  );
}
