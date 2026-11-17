import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { company, telHref } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How ATZ Elevators uses the details you share through this website.",
};

/** Plain-language draft. To be reviewed by ATZ before launch. */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead="How we use the details you share with us through this website."
      />
      <Section>
        <Container className="flex max-w-3xl flex-col gap-6 text-lg text-muted">
          <Badge tone="warning" className="self-start">
            Draft, to be reviewed before launch
          </Badge>
          <h2 className="text-h3 font-bold">What we collect</h2>
          <p>
            When you send an enquiry, we ask for your name, mobile number, city and details about
            your building and the lift you need. We collect nothing else about you through the form.
          </p>
          <h2 className="text-h3 font-bold">How we use it</h2>
          <p>
            We use these details only to reply to your enquiry: to call you back, book a site survey
            and send a quotation. We do not sell or share them for marketing.
          </p>
          <h2 className="text-h3 font-bold">WhatsApp</h2>
          <p>
            If you choose to send your enquiry on WhatsApp, the message is sent from your own
            account to ours and is covered by WhatsApp&apos;s own privacy terms.
          </p>
          <h2 className="text-h3 font-bold">Questions</h2>
          <p>
            To ask what we hold about you, or to have it deleted, call us on{" "}
            <a href={telHref(company.phones.marketing)} className="font-semibold">
              {company.phones.marketing.display}
            </a>
            . {company.legalName}, {company.headOffice.lines.join(", ")}.
          </p>
        </Container>
      </Section>
    </>
  );
}
