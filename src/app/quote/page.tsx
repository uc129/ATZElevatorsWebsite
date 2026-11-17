import type { Metadata } from "next";
import { EnquiryForm } from "@/components/layout/enquiry-form";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Get a free quote",
  description:
    "Tell us about your building and an ATZ engineer will call you back to book a free site survey.",
};

/** The quote form as a page: the fallback for the enquiry drawer. */
export default function QuotePage() {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Eyebrow>Free site survey</Eyebrow>
          <h1 className="text-h1 font-bold">Get a free quote</h1>
          <p className="text-lg text-muted">
            Tell us about your building. An ATZ engineer will call you back to book a site survey,
            then recommend a lift that fits your shaft, load and power supply.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryForm />
        </div>
      </Container>
    </Section>
  );
}
