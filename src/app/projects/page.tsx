import type { Metadata } from "next";
import { Clients } from "@/components/sections/clients";
import { ComingSoon } from "@/components/sections/coming-soon";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Testimonials } from "@/components/sections/testimonials";
import { Container, Section } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Lifts by ATZ in hospitals, government buildings, schools, hotels and homes across Bihar and the east.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Where our lifts run"
        lead="Hospitals, government buildings, schools, hotels and homes across Bihar and the east."
      />
      <Section className="pb-0 lg:pb-0">
        <Container>
          <ComingSoon title="Project stories">
            <p>
              Detailed project pages, with photos, lift specifications and the scope of work, are
              being prepared with our clients. Until then, here are some of the organisations that
              rely on ATZ.
            </p>
          </ComingSoon>
        </Container>
      </Section>
      <Clients />
      <Testimonials />
      <CtaBand />
    </>
  );
}
