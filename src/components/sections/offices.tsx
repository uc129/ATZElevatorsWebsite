import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { company, telHref } from "@/content/company";
import { offices } from "@/content/home";
import { officeHref, officeList } from "@/content/offices";

/** Offices from the ERP: full address for Patna, branches by city. */
export function Offices() {
  return (
    <Section id="offices" aria-labelledby="offices-title">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="offices-title"
          eyebrow="Offices"
          title="Headquartered in Patna, with engineers across the east."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {offices.photos.map((id) => (
            <Photo
              key={id}
              id={id}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-video rounded-lg"
            />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="flex flex-col gap-3 p-6 lg:col-span-5">
            <Eyebrow>{company.headOffice.label}</Eyebrow>
            <h3 className="text-h3 font-bold">Patna</h3>
            <address className="text-muted not-italic">
              {company.headOffice.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <span className="text-subtle">Sales </span>
                <a href={telHref(company.phones.marketing)} className="font-semibold">
                  {company.phones.marketing.display}
                </a>
              </li>
              <li>
                <span className="text-subtle">Service, 24×7 </span>
                <a href={telHref(company.phones.service)} className="font-semibold">
                  {company.phones.service.display}
                </a>
              </li>
            </ul>
            <a
              href={company.headOffice.mapsUrl}
              rel="noopener"
              className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold"
            >
              <MapPin aria-hidden="true" className="size-4" /> Directions
            </a>
          </Card>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {officeList
              .filter((o) => o.kind === "Branch")
              .map((b) => (
                <li key={b.slug}>
                  <Card interactive className="relative flex h-full flex-col gap-2 p-6">
                    <Eyebrow className="text-subtle">Branch</Eyebrow>
                    <h3 className="text-h4 font-bold">{b.city}</h3>
                    <p className="text-sm text-muted">{b.state}</p>
                    <Link
                      href={officeHref(b.slug)}
                      className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold no-underline after:absolute after:inset-0"
                    >
                      ATZ in {b.city} <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </Card>
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
