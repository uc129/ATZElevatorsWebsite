import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryButton, PageEnquiryDefaults } from "@/components/layout/enquiry";
import { CtaBand } from "@/components/sections/cta-band";
import { LiftCards } from "@/components/sections/lift-cards";
import { IconPanel } from "@/components/sections/lift-showcase";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { findLift, liftCategories } from "@/content/lifts";

export function generateStaticParams() {
  return liftCategories.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lifts/[slug]">): Promise<Metadata> {
  const lift = findLift((await params).slug);
  return lift ? { title: lift.name, description: lift.blurb } : {};
}

/**
 * Every valid page is prerendered from generateStaticParams. The page may
 * block on params (instant = false) so an unknown slug returns a real 404
 * status; streaming it inside Suspense would send 200 first.
 */
export const instant = false;

export default async function LiftPage({ params }: PageProps<"/lifts/[slug]">) {
  const lift = findLift((await params).slug);
  if (!lift) notFound();
  const others = liftCategories.filter((l) => l.slug !== lift.slug).slice(0, 3);
  const enquiryDefaults = { need: "new", liftType: lift.slug } as const;

  return (
    <>
      <PageEnquiryDefaults defaults={enquiryDefaults} />
      <PageHeader
        eyebrow={lift.short}
        title={lift.name}
        lead={lift.blurb}
        trail={[{ label: "Lifts", href: "/lifts" }]}
        actions={
          <>
            <EnquiryButton size="lg" defaults={enquiryDefaults}>
              Get a quote for this lift
            </EnquiryButton>
            <ButtonLink href="/lifts" variant="outline" size="lg">
              All lifts
            </ButtonLink>
          </>
        }
        aside={
          <div className="aspect-4/3 overflow-hidden rounded-lg shadow-diffuse">
            {lift.photo ? (
              <Photo
                id={lift.photo}
                eager
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="size-full"
              />
            ) : (
              <IconPanel lift={lift} compact />
            )}
          </div>
        }
      />

      <Section>
        <Container className="flex flex-col gap-10">
          <Card className="flex flex-col gap-4 p-6 md:p-8">
            <h2 className="text-h3 font-bold">Available as</h2>
            <ul className="flex flex-wrap gap-2">
              {lift.variants.map((v) => (
                <li key={v}>
                  <Badge tone="brand" className="min-h-8 px-3 text-sm font-medium">
                    {v}
                  </Badge>
                </li>
              ))}
            </ul>
            <p className="text-muted">
              Capacity, speed, doors and cabin finish are chosen for your building after the site
              survey, and written into an itemised quotation.
            </p>
          </Card>
          <div className="flex max-w-3xl flex-col gap-4 md:px-8">
            <h2 className="text-h3 font-bold">Then and now</h2>
            <p className="text-lg text-muted">{lift.history}</p>
            <p className="text-lg text-muted">{lift.atz}</p>
          </div>
          <Card className="flex flex-col gap-4 p-6 md:p-8">
            <h2 className="text-h3 font-bold">Ideal for</h2>
            <ul className="flex flex-col gap-2.5">
              {lift.idealFor.map((use) => (
                <li key={use} className="flex items-center gap-2.5 text-ink">
                  <Check aria-hidden="true" className="size-5 shrink-0 text-brand" />
                  {use}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      <Section className="border-t border-line bg-box">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Compare" title="Other lifts" />
          <LiftCards lifts={others} />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
