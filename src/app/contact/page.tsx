import type { Metadata } from "next";
import { EnquiryForm } from "@/components/layout/enquiry-form";
import { ContactOptions } from "@/components/sections/contact-options";
import { Offices } from "@/components/sections/offices";
import { PageHeader } from "@/components/sections/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp or write to ATZ Elevators. Head office in Patna, with teams in Ranchi, Kolkata, Bhubaneswar and Guwahati.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to ATZ"
        lead="Call sales for a new lift, the 24×7 service line for breakdowns, or send us a message."
      />
      <Section className="pb-0 lg:pb-0">
        <Container>
          <ContactOptions />
        </Container>
      </Section>
      <Offices />
      <Section className="border-t border-line bg-box">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Write to us"
              title="Send an enquiry"
              lead="Tell us about your building and an engineer will call you back."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <EnquiryForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
