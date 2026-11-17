import type { Metadata } from "next";
import { EnquiryButton } from "@/components/layout/enquiry";
import { CtaBand } from "@/components/sections/cta-band";
import { LiftCards } from "@/components/sections/lift-cards";
import { PageHeader } from "@/components/sections/page-header";
import { Container, Section } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Lifts",
  description:
    "Passenger, home, machine-room-less, panoramic, hospital and freight lifts, and dumbwaiters, built and installed by ATZ.",
};

export default function LiftsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lifts"
        title="A lift for every building"
        lead="Seven families of lifts, from compact home lifts to stretcher lifts for hospitals. Not sure which one fits? A free site survey will tell you."
        actions={<EnquiryButton size="lg">Book a free site survey</EnquiryButton>}
      />
      <Section>
        <Container>
          <LiftCards />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
