import { ArrowRight, CalendarClock, ClipboardList, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactOptions } from "@/components/sections/contact-options";
import { PageHeader } from "@/components/sections/page-header";
import { BreakdownBand } from "@/components/sections/services";
import { Card, cardStyles } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { company, telHref } from "@/content/company";

export const metadata: Metadata = {
  title: "Customer support",
  description:
    "24x7 lift breakdown line, what to do if you are stuck in a lift, complaints and AMC support from ATZ Elevators.",
};

const stuckTips = [
  {
    title: "Stay calm",
    text: "A stopped lift is not falling. The car is held by its brakes and safety gear.",
  },
  {
    title: "Press the alarm",
    text: "Use the alarm or intercom button on the panel to alert the building.",
  },
  {
    title: "Call for help",
    text: `Call the building guard, or our 24×7 line on ${company.phones.service.display}.`,
  },
  {
    title: "Do not force the doors",
    text: "Wait for a trained rescuer. Never try to climb out of the car.",
  },
];

const tools = [
  {
    href: "/support/complaint",
    title: "Log a complaint",
    text: "Report a fault or a problem with a visit.",
    icon: ClipboardList,
  },
  {
    href: "/support/track",
    title: "Track a complaint",
    text: "Check the status of a complaint you logged.",
    icon: Search,
  },
  {
    href: "/support/amc",
    title: "AMC renewal",
    text: "See your next visit and renew your contract.",
    icon: CalendarClock,
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customer support"
        title="Help for your lift, day and night"
        lead="For lifts installed or maintained by ATZ, and for any make in a breakdown."
      />
      <Section>
        <Container className="flex flex-col gap-12">
          <BreakdownBand />

          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="Safety" title="Stuck in a lift?" />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stuckTips.map((tip, i) => (
                <li key={tip.title}>
                  <Card className="flex h-full flex-col gap-2 p-6">
                    <span className="font-heading text-h3 font-extrabold text-brand">{i + 1}</span>
                    <h3 className="text-h4 font-bold">{tip.title}</h3>
                    <p className="text-muted">{tip.text}</p>
                  </Card>
                </li>
              ))}
            </ol>
            <p className="text-muted">
              Building managers: our engineers can train your staff in safe rescue.{" "}
              <a href={telHref(company.phones.service)} className="font-semibold">
                Ask the service desk
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="For customers" title="Complaints and AMC" />
            <ul className="grid gap-4 md:grid-cols-3">
              {tools.map((t) => (
                <li
                  key={t.href}
                  className={cardStyles({
                    interactive: true,
                    className: "relative flex flex-col gap-2 p-6",
                  })}
                >
                  <t.icon aria-hidden="true" className="size-6 text-brand" />
                  <h3 className="text-h4 font-bold">{t.title}</h3>
                  <p className="text-muted">{t.text}</p>
                  <Link
                    href={t.href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold no-underline after:absolute after:inset-0"
                  >
                    {t.title} <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ContactOptions />
        </Container>
      </Section>
    </>
  );
}
