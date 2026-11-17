/**
 * A planned page that is not built yet: page header, an honest "coming soon"
 * panel and the ways to reach ATZ today. Used for ERP-backed tools (complaints,
 * tracking, AMC renewal) and careers.
 */
import type { ReactNode } from "react";
import { ComingSoon } from "./coming-soon";
import { ContactOptions } from "./contact-options";
import { PageHeader, type Crumb } from "./page-header";
import { Container, Section } from "@/components/ui/container";

export function PlaceholderPage({
  eyebrow,
  title,
  lead,
  trail,
  soonTitle,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  trail?: Crumb[];
  soonTitle: string;
  /** What will be here, and what to do meanwhile */
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} trail={trail} />
      <Section>
        <Container className="flex flex-col gap-10">
          <ComingSoon title={soonTitle}>{children}</ComingSoon>
          <ContactOptions />
        </Container>
      </Section>
    </>
  );
}
