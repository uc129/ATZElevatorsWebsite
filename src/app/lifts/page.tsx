import type { Metadata } from "next";
import { EnquiryButton } from "@/components/layout/enquiry";
import { CtaBand } from "@/components/sections/cta-band";
import { LiftCards } from "@/components/sections/lift-cards";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { finderHref } from "@/content/navigation";

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
        lead="Seven families of lifts, from compact home lifts to stretcher lifts for hospitals. Not sure which one fits? Answer a few quick questions, or book a free site survey."
        actions={
          <>
            <ButtonLink href={finderHref} size="lg">
              Find your lift
            </ButtonLink>
            <EnquiryButton variant="outline" size="lg">
              Book a free site survey
            </EnquiryButton>
          </>
        }
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
