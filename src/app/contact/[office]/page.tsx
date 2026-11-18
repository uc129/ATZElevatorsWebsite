import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactOptions } from "@/components/sections/contact-options";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { company } from "@/content/company";
import { findOffice, officeList } from "@/content/offices";

export function generateStaticParams() {
  return officeList.map((o) => ({ office: o.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/contact/[office]">): Promise<Metadata> {
  const office = findOffice((await params).office);
  return office
    ? {
        title: `Lifts in ${office.city}`,
        description: `${company.brand} in ${office.city}, ${office.state}: new lifts, AMC, modernisation and 24x7 breakdown service.`,
      }
    : {};
}

/**
 * Every valid page is prerendered from generateStaticParams. The page may
 * block on params (instant = false) so an unknown slug returns a real 404
 * status; streaming it inside Suspense would send 200 first.
 */
export const instant = false;

export default async function OfficePage({ params }: PageProps<"/contact/[office]">) {
  const office = findOffice((await params).office);
  if (!office) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${office.kind} · ${office.state}`}
        title={`ATZ in ${office.city}`}
        lead={`New lifts, maintenance, modernisation and 24×7 breakdown service in ${office.city} and around.`}
        trail={[{ label: "Contact", href: "/contact" }]}
      />
      <Section>
        <Container className="flex flex-col gap-10">
          <Card className="flex flex-col gap-3 p-6 md:p-8">
            <h2 className="text-h3 font-bold">{office.kind}</h2>
            {office.address ? (
              <>
                <address className="text-lg text-muted not-italic">
                  {office.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                {office.mapsUrl ? (
                  <a
                    href={office.mapsUrl}
                    rel="noopener"
                    className="inline-flex min-h-11 items-center gap-2 font-semibold"
                  >
                    <MapPin aria-hidden="true" className="size-4" /> Directions
                  </a>
                ) : null}
              </>
            ) : (
              <p className="text-lg text-muted">
                Our {office.city} team works across {office.state}. The office address and local
                numbers will be listed here soon; meanwhile the numbers below reach us any time.
              </p>
            )}
          </Card>
          <ContactOptions />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
