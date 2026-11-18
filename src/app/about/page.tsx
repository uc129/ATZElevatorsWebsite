import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { LiftJourney } from "@/components/sections/lift-journey";
import { PageHeader } from "@/components/sections/page-header";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { quality, story, values } from "@/content/about";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "About ATZ",
  description: `${company.legalName}: lift makers and engineers from Patna since ${company.founded}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Since ${company.founded}`}
        title="About ATZ"
        lead={`${company.tagline} A Patna company that builds, installs and cares for lifts across the east.`}
      />

      {/* Our story: the skyline photo, then the heading, then the text in two columns. */}
      <Section aria-labelledby="story-title">
        <Container className="flex flex-col gap-8">
          <Photo
            id="patnaSkyline"
            eager
            zoom={2}
            sizes="200vw"
            className="aspect-4/3 w-full rounded-lg shadow-diffuse md:aspect-2/1 lg:aspect-5/2"
          />
          <div className="flex flex-col gap-4">
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-title" className="text-h2 font-bold">
              Rooted in Patna, rising with the city.
            </h2>
          </div>
          <div className="gap-12 md:columns-2">
            {story.map((p) => (
              <p key={p.slice(0, 24)} className="mb-4 break-inside-avoid text-lg text-muted">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-box">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="What we stand for"
            title="Teamwork, integrity, dedication, innovation."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title}>
                <Card tone="white" className="flex h-full flex-col gap-2 p-6">
                  <h3 className="text-h4 font-bold">{v.title}</h3>
                  <p className="text-muted">{v.text}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <LiftJourney />

      <Section id="quality" className="border-t border-line">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Quality and safety"
            title="Every lift, checked before it carries anyone."
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {quality.map((q) => (
              <li key={q.title}>
                <Card className="flex h-full flex-col gap-2 p-6">
                  <h3 className="text-h4 font-bold">{q.title}</h3>
                  <p className="text-muted">{q.text}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
