/**
 * The Find your lift result: the suggested lift and why, the visitor's
 * answers, the next step and the nearest team. Server rendered from the
 * URL, so it works without JavaScript and can be shared.
 */
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { EnquiryButton, PageEnquiryDefaults } from "@/components/layout/enquiry";
import { ButtonLink } from "@/components/ui/button";
import { Card, FramedCard } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { company, telHref } from "@/content/company";
import { finderPage, maintainResult } from "@/content/lift-finder";
import { findLift, liftHref } from "@/content/lifts";
import { officeHref } from "@/content/offices";
import { serviceHref, services } from "@/content/services";
import {
  answerList,
  answersToQuery,
  enquiryDefaultsFromAnswers,
  type FinderAnswers,
  type Recommendation,
} from "@/lib/lift-finder";
import { defaultsWhatsappUrl } from "@/lib/enquiry";
import { LiftCards } from "../lift-cards";
import { IconPanel } from "../lift-showcase";
import { finderPath } from "./lift-finder-form";

const textLink = "inline-flex min-h-11 items-center gap-1.5 font-semibold";

function Reasons({ reasons }: { reasons: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-h4 font-bold">{finderPage.reasonsTitle}</h3>
      <ul className="flex flex-col gap-2.5">
        {reasons.map((reason) => (
          <li key={reason} className="flex gap-3 text-muted">
            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-ink" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Actions({ answers }: { answers: FinderAnswers }) {
  const defaults = enquiryDefaultsFromAnswers(answers) ?? {};
  return (
    <div className="flex flex-wrap gap-3">
      {/* Opens the drawer pre-filled; without JavaScript, /quote pre-filled. */}
      <EnquiryButton size="lg" defaults={defaults}>
        {finderPage.quote}
      </EnquiryButton>
      <ButtonLink
        href={defaultsWhatsappUrl(defaults)}
        variant="whatsapp"
        size="lg"
        target="_blank"
        rel="noopener"
      >
        <MessageCircle aria-hidden="true" /> {finderPage.whatsapp}
      </ButtonLink>
    </div>
  );
}

function AnswersPanel({ answers }: { answers: FinderAnswers }) {
  const query = answersToQuery(answers);
  return (
    <Card className="flex flex-col gap-4 p-6">
      <h3 className="text-h4 font-bold">{finderPage.answersTitle}</h3>
      <dl className="flex flex-col gap-3">
        {answerList(answers).map((a) => (
          <div key={a.key} className="flex flex-col">
            <dt className="text-sm text-subtle">{a.label}</dt>
            <dd className="font-medium text-ink">{a.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-x-6">
        <Link href={`${finderPath}?${query}&edit=1`} className={textLink}>
          {finderPage.changeAnswers}
        </Link>
        <Link href={finderPath} className={textLink}>
          {finderPage.startAgain}
        </Link>
      </div>
    </Card>
  );
}

function NextSteps({ rec }: { rec: Recommendation }) {
  const service = services.find((s) => s.slug === rec.service);
  return (
    <Card className="flex flex-col gap-5 p-6">
      {service ? (
        <div className="flex flex-col gap-1">
          <h3 className="text-h4 font-bold">{finderPage.nextTitle}</h3>
          <Link href={serviceHref(service.slug)} className={textLink}>
            {service.title} <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      ) : null}
      <div className="flex flex-col gap-1">
        <h3 className="text-h4 font-bold">{finderPage.officeTitle}</h3>
        {rec.office ? (
          <Link href={officeHref(rec.office.slug)} className={textLink}>
            ATZ in {rec.office.city} <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        ) : (
          <p className="text-muted">{finderPage.otherCity}</p>
        )}
        <a href={telHref(company.phones.marketing)} className={textLink}>
          <Phone aria-hidden="true" className="size-4" /> Call {company.phones.marketing.display}
        </a>
      </div>
    </Card>
  );
}

export function LiftRecommendation({
  answers,
  rec,
}: {
  answers: FinderAnswers;
  rec: Recommendation;
}) {
  const lift = rec.kind === "lift" ? findLift(rec.primary) : undefined;
  const alternatives =
    rec.kind === "lift" ? rec.alternatives.flatMap((slug) => findLift(slug) ?? []) : [];

  return (
    <div className="flex flex-col gap-16">
      <PageEnquiryDefaults defaults={enquiryDefaultsFromAnswers(answers) ?? {}} />
      <div className="grid gap-8 lg:grid-cols-12">
        <FramedCard as="article" className="lg:col-span-8" innerClassName="overflow-hidden">
          {lift ? (
            <div className="aspect-video overflow-hidden">
              {lift.photo ? (
                <Photo
                  id={lift.photo}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="size-full"
                />
              ) : (
                <IconPanel lift={lift} compact />
              )}
            </div>
          ) : null}
          <div className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex flex-col gap-3">
              <Eyebrow>{finderPage.resultEyebrow}</Eyebrow>
              <h2 className="text-h2 font-bold">{lift ? lift.name : maintainResult.title}</h2>
              <p className="text-lg text-muted">{lift ? lift.blurb : maintainResult.lead}</p>
              {lift ? (
                <Link href={liftHref(lift.slug)} className={textLink}>
                  More about this lift
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              ) : null}
            </div>
            <Reasons reasons={rec.reasons} />
            <p className="rounded-control bg-box px-4 py-3 text-muted">{finderPage.disclaimer}</p>
            <Actions answers={answers} />
          </div>
        </FramedCard>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <AnswersPanel answers={answers} />
          <NextSteps rec={rec} />
        </div>
      </div>

      {alternatives.length > 0 ? (
        <section aria-labelledby="finder-alternatives" className="flex flex-col gap-6">
          <h2 id="finder-alternatives" className="text-h3 font-bold">
            {finderPage.alternativesTitle}
          </h2>
          <LiftCards lifts={alternatives} />
        </section>
      ) : null}
    </div>
  );
}
