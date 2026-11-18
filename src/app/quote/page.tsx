import type { Metadata } from "next";
import { EnquiryForm } from "@/components/layout/enquiry-form";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { headers } from "next/headers";
import { parseEnquiryDefaults, visitorCityFrom } from "@/lib/enquiry";

export const metadata: Metadata = {
  title: "Get a free quote",
  description:
    "Tell us about your building and an ATZ engineer will call you back to book a free site survey.",
  // Pre-filled variants live on query strings; index the plain page.
  alternates: { canonical: "/quote" },
};

/**
 * The page waits for the query string so a pre-filled form (from the Find
 * your lift guide or a lift page) is in the first HTML, without JavaScript.
 * Streaming it behind Suspense would need JavaScript to swap the fallback.
 */
export const instant = false;

/** The quote form as a page: the fallback for the enquiry drawer. */
export default async function QuotePage({ searchParams }: PageProps<"/quote">) {
  const defaults = parseEnquiryDefaults(await searchParams);
  const visitorCity = visitorCityFrom(await headers());
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
          <EnquiryForm defaults={defaults} visitorCity={visitorCity} />
        </div>
      </Container>
    </Section>
  );
}
