/**
 * Fixed bottom bar on phones and tablets: call sales, WhatsApp, get a quote.
 * A spacer after the footer keeps it from covering the last content.
 */
import { MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { company, telHref, whatsappHref } from "@/content/company";
import { EnquiryButton } from "./enquiry";

export function MobileActionBar() {
  return (
    <>
      <div aria-hidden="true" className="h-20 lg:hidden" />
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-2 border-t border-line bg-white/95 p-2 shadow-bar backdrop-blur-md lg:hidden"
      >
        <ButtonLink href={telHref(company.phones.marketing)} variant="outline" className="px-2">
          <Phone aria-hidden="true" /> Call
        </ButtonLink>
        <ButtonLink
          href={whatsappHref(company.phones.marketing)}
          variant="whatsapp"
          className="px-2"
          target="_blank"
          rel="noopener"
        >
          <MessageCircle aria-hidden="true" /> WhatsApp
        </ButtonLink>
        <EnquiryButton className="px-2">Get a quote</EnquiryButton>
      </nav>
    </>
  );
}
