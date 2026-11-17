import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { LiftJourney } from "@/components/sections/lift-journey";
import { PageHeader } from "@/components/sections/page-header";
import { VideoLoop } from "@/components/sections/video-loop";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { quality, story, values } from "@/content/about";
import { company } from "@/content/company";
import { patnaRising } from "@/content/home";

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
        aside={
          <Photo
            id="patnaSkyline"
            eager
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-4/3 rounded-lg shadow-diffuse"
          />
        }
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-h2 font-bold">Rooted in Patna, rising with the city.</h2>
            {story.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mx-auto w-full max-w-xs lg:col-span-4 lg:col-start-9">
            <div className="rounded-lg border border-box-line bg-box p-1.5 shadow-diffuse">
              <VideoLoop
                sources={[{ src: patnaRising.video }]}
                poster={patnaRising.poster}
                label="Slow drone view over tall buildings under construction beside the Ganga in Patna"
                className="aspect-9/16 rounded-md"
              />
            </div>
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
