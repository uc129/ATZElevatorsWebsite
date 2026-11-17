import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { BreakdownBand, ServiceCards } from "@/components/sections/services";
import { Container, Section } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "New lift installation, annual maintenance contracts, modernisation and 24x7 repairs for every make of lift.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="One team for the whole life of your lift"
        lead="We install new lifts, maintain them on schedule, modernise older ones and repair any make, with engineers based near you."
      />
      <Section>
        <Container className="flex flex-col gap-12">
          <ServiceCards />
          <BreakdownBand />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
