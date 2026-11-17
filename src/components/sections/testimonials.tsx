import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { testimonials } from "@/content/home";

/** Sample quotes, labelled as such until real, verified ones arrive. */
export function Testimonials() {
  return (
    <Section aria-labelledby="testimonials-title" className="border-y border-line bg-box">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="testimonials-title"
          eyebrow="In their words"
          title="What clients in Patna and Bihar say"
          actions={
            <p className="max-w-sm text-sm text-subtle">
              Sample quotes for layout. They will be replaced with real client testimonials,
              published with permission once each one is verified.
            </p>
          }
        />
        <ul className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.quote}>
              <Card as="figure" tone="white" className="m-0 flex h-full flex-col gap-5 p-7">
                <div className="flex items-center justify-between gap-3">
                  <Quote aria-hidden="true" className="size-8 text-brand-ice" />
                  <VerifiedBadge />
                </div>
                <blockquote className="text-lg text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-auto flex flex-col border-t border-line pt-4">
                  <span className="font-semibold text-ink">{t.role}</span>
                  <span className="text-sm text-subtle">{t.place}</span>
                </figcaption>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
