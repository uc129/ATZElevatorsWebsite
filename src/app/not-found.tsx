import type { Metadata } from "next";
import { ContactOptions } from "@/components/sections/contact-options";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-4">
          <Eyebrow>Wrong floor</Eyebrow>
          <h1 className="text-h1 font-bold">This page is not on our list.</h1>
          <p className="text-lg text-muted">
            The link may be old or mistyped. Head back to the homepage, or reach us directly.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Go to the homepage</ButtonLink>
            <ButtonLink href="/lifts" variant="outline">
              See all lifts
            </ButtonLink>
          </div>
        </div>
        <ContactOptions />
      </Container>
    </Section>
  );
}
