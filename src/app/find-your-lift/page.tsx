import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { LiftFinderForm } from "@/components/sections/lift-finder/lift-finder-form";
import { finderHref } from "@/content/navigation";
import { LiftRecommendation } from "@/components/sections/lift-finder/lift-recommendation";
import { Container, Section } from "@/components/ui/container";
import { finderPage } from "@/content/lift-finder";
import {
  missingAnswers,
  parseAnswers,
  recommendLift,
  wasSubmitted,
  type FinderAnswers,
} from "@/lib/lift-finder";

export const metadata: Metadata = {
  title: "Find your lift",
  description:
    "Answer a few quick questions about your building and ATZ Elevators will suggest the lift that fits, with the reasons.",
  // Results live on query strings; search engines should index the guide itself.
  alternates: { canonical: finderHref },
};

type SearchParams = PageProps<"/find-your-lift">["searchParams"];

/**
 * The page waits for the query string instead of streaming the answers in
 * behind Suspense: the fallback swap needs JavaScript, and the guide must
 * work without it (a no-JS visitor would only ever see the empty form).
 * instant = false lets this route block (Next 16, route segment config).
 */
export const instant = false;

/** A complete set of answers shows the result; `edit=1` reopens the form. */
async function FinderBody({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const answers = parseAnswers(params);
  const editing = params.edit === "1";
  const rec = editing ? null : recommendLift(answers);

  if (rec) return <LiftRecommendation answers={answers as FinderAnswers} rec={rec} />;

  const floorsInput = typeof params.floors === "string" ? params.floors : undefined;
  return (
    <LiftFinderForm
      answers={answers}
      floorsInput={floorsInput}
      missing={wasSubmitted(params) && !editing ? missingAnswers(answers) : []}
    />
  );
}

export default function FindYourLiftPage({ searchParams }: PageProps<"/find-your-lift">) {
  return (
    <>
      <PageHeader
        eyebrow={finderPage.eyebrow}
        title={finderPage.title}
        lead={finderPage.lead}
        trail={[{ label: "Lifts", href: "/lifts" }]}
      />
      <Section>
        <Container>
          <FinderBody searchParams={searchParams} />
        </Container>
      </Section>
    </>
  );
}
