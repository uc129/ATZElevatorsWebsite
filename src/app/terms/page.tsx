import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the ATZ Elevators website.",
};

/** Plain-language draft. To be reviewed by ATZ before launch. */
export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of use" lead="The terms for using this website." />
      <Section>
        <Container className="flex max-w-3xl flex-col gap-6 text-lg text-muted">
          <Badge tone="warning" className="self-start">
            Draft, to be reviewed before launch
          </Badge>
          <p>
            This website is run by {company.legalName} (GSTIN {company.gstin}, CIN {company.cin}).
            It describes our lifts and services for information only. Prices, specifications and
            timelines are confirmed only in a written quotation.
          </p>
          <p>
            Photographs and film by other creators are used under their licences and listed on our{" "}
            <Link href="/credits">credits page</Link>. Please do not reuse them from this site.
          </p>
          <p>
            The ATZ name and logo belong to {company.legalName}. Client names and logos belong to
            their owners and are shown to describe our work.
          </p>
        </Container>
      </Section>
    </>
  );
}
