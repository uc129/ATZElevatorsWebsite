import { ArrowRight, Building, CalendarCheck, Phone, RefreshCw, Wrench } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { cardStyles } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Spotlight } from "@/components/ui/spotlight";
import { company, telHref } from "@/content/company";
import { serviceHref, services } from "@/content/services";

export const serviceIcons = {
  building: Building,
  calendar: CalendarCheck,
  refresh: RefreshCw,
  wrench: Wrench,
};

/** "Lift stuck?" banner with the 24x7 service number. Used on home, services and support. */
export function BreakdownBand() {
  return (
    <div
      id="breakdown"
      className="flex flex-wrap items-center justify-between gap-6 rounded-lg border-2 border-tint-line bg-white px-6 py-7 md:px-8"
    >
      <div className="flex items-center gap-4.5">
        <span className="inline-flex size-13 shrink-0 items-center justify-center rounded-full border border-success-line bg-success-light text-success">
          <Phone aria-hidden="true" className="size-6" />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="font-heading text-h4 font-bold text-navy">Lift stuck or not working?</p>
          <p className="text-muted">
            Call the 24×7 breakdown line. An engineer from your nearest team will be on the way.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={telHref(company.phones.service)}>
          Call {company.phones.service.display}
        </ButtonLink>
        <ButtonLink href="/support" variant="outline">
          Customer support
        </ButtonLink>
      </div>
    </div>
  );
}

/** Four service cards with a pointer-light effect. */
export function ServiceCards() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => {
        const Icon = serviceIcons[s.icon];
        return (
          <Spotlight
            as="li"
            key={s.slug}
            className={cardStyles({
              interactive: true,
              className: "flex flex-col overflow-hidden",
            })}
          >
            <Photo
              id={s.photo}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
              className="aspect-video"
            />
            <div className="flex flex-1 flex-col gap-3.5 p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-control bg-tint text-brand">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="text-h4 font-bold">{s.title}</h3>
              <p className="text-muted">{s.text}</p>
              <Link
                href={serviceHref(s.slug)}
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold no-underline after:absolute after:inset-0"
              >
                {s.cta} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </Spotlight>
        );
      })}
    </ul>
  );
}

export function Services() {
  return (
    <Section id="services" aria-labelledby="services-title">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="One team for the whole life of your lift, whoever made it."
        />
        <ServiceCards />
        <BreakdownBand />
      </Container>
    </Section>
  );
}
