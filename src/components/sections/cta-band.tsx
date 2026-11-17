import { MessageCircle } from "lucide-react";
import { EnquiryButton } from "@/components/layout/enquiry";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { company, whatsappHref } from "@/content/company";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="pb-16 lg:pb-26">
      <Container>
        <div className="relative grid items-center gap-8 overflow-hidden rounded-lg border border-tint-line bg-tint glow-diffuse p-8 md:p-14 lg:grid-cols-2">
          <span
            aria-hidden="true"
            className="absolute -top-16 -right-16 size-72 rounded-full border-2 border-tint-line"
          />
          <div className="relative flex flex-col gap-3.5">
            <h2 id="cta-title" className="text-h2 font-bold">
              Planning a lift for your building?
            </h2>
            <p className="text-lg text-muted">
              Tell us a little about the building. An engineer from Patna or your nearest team will
              call to book a free site survey.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3 lg:justify-end">
            <EnquiryButton size="lg">Request a quote</EnquiryButton>
            <ButtonLink
              href={whatsappHref(company.phones.marketing)}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener"
            >
              <MessageCircle aria-hidden="true" /> Chat on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
