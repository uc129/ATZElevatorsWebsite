/**
 * Contact options: sales, 24x7 service and WhatsApp, as three cards.
 * Used on contact, support, careers and "coming soon" pages.
 */
import { MessageCircle, Phone, PhoneCall } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { company, telHref, whatsappHref } from "@/content/company";

export function ContactOptions() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      <li>
        <Card className="flex h-full flex-col gap-3 p-6">
          <Phone aria-hidden="true" className="size-6 text-brand" />
          <h3 className="text-h4 font-bold">Sales and new lifts</h3>
          <p className="text-muted">Quotes, site surveys and modernisation.</p>
          <ButtonLink
            href={telHref(company.phones.marketing)}
            variant="outline"
            className="mt-auto"
          >
            Call {company.phones.marketing.display}
          </ButtonLink>
        </Card>
      </li>
      <li>
        <Card className="flex h-full flex-col gap-3 p-6">
          <PhoneCall aria-hidden="true" className="size-6 text-success" />
          <h3 className="text-h4 font-bold">Service and breakdowns, 24×7</h3>
          <p className="text-muted">Lift stuck, faults, AMC visits and repairs.</p>
          <ButtonLink href={telHref(company.phones.service)} className="mt-auto">
            Call {company.phones.service.display}
          </ButtonLink>
        </Card>
      </li>
      <li>
        <Card className="flex h-full flex-col gap-3 p-6">
          <MessageCircle aria-hidden="true" className="size-6 text-whatsapp-ink" />
          <h3 className="text-h4 font-bold">WhatsApp</h3>
          <p className="text-muted">Send photos, documents or a quick question.</p>
          <ButtonLink
            href={whatsappHref(company.phones.marketing)}
            variant="whatsapp"
            className="mt-auto"
            target="_blank"
            rel="noopener"
          >
            Chat on WhatsApp
          </ButtonLink>
        </Card>
      </li>
    </ul>
  );
}
