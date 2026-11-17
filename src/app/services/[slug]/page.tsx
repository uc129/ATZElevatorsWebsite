import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryButton } from "@/components/layout/enquiry";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader, PageHeaderSkeleton } from "@/components/sections/page-header";
import { BreakdownBand, serviceIcons } from "@/components/sections/services";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { company, telHref } from "@/content/company";
import { services } from "@/content/services";

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  return service ? { title: service.title, description: service.lead } : {};
}

async function ServiceContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const service = findService((await params).slug);
  if (!service) notFound();
  const Icon = serviceIcons[service.icon];
  const isRepair = service.slug === "repairs";

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={service.title}
        lead={service.lead}
        trail={[{ label: "Services", href: "/services" }]}
        actions={
          isRepair ? (
            <ButtonLink href={telHref(company.phones.service)} size="lg">
              Call {company.phones.service.display}
            </ButtonLink>
          ) : (
            <EnquiryButton size="lg">{service.cta}</EnquiryButton>
          )
        }
        aside={
          <Photo
            id={service.photo}
            eager
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-4/3 rounded-lg shadow-diffuse"
          />
        }
      />

      {service.sections.map((section, i) => (
        <Section key={section.title} className={i % 2 ? "border-y border-line bg-box" : undefined}>
          <Container className="flex flex-col gap-8">
            <h2 className="inline-flex items-center gap-3 text-h2 font-bold">
              {i === 0 ? <Icon aria-hidden="true" className="size-8 text-brand" /> : null}
              {section.title}
            </h2>
            <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, n) => (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-lg border border-box-line bg-white p-6"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border-2 border-line-strong font-heading font-extrabold text-brand">
                    {n + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-h4 font-bold">{item.title}</h3>
                    <p className="text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      ))}

      <Section className="pt-0 lg:pt-0">
        <Container>
          <BreakdownBand />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

/** Params are read inside Suspense (Cache Components); known pages are still prerendered. */
export default function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<PageHeaderSkeleton />}>
      <ServiceContent params={props.params} />
    </Suspense>
  );
}
