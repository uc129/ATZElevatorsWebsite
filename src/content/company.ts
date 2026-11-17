/**
 * Company facts. Source: ERP migration V120__CompanyBrandingAndLetterhead.sql
 * and the user (phone roles, 18-Nov-2026).
 */

export type Phone = {
  /** As printed: "72570 01413" */
  display: string;
  /** E.164 for tel: and wa.me links */
  e164: string;
};

export const company = {
  brand: "ATZ Elevators",
  legalName: "Amba Tirupati Zetetic Engineering Pvt Ltd",
  tagline: "Keeping the world in motion.",
  /** Incorporation year (CIN). Confirmed by the user, 18-Nov-2026; older material saying 1998 is not used. */
  founded: 2002,
  gstin: "10AAECA7035L1ZX",
  cin: "U00514BR2002PTC009801",
  phones: {
    /** Sales, enquiries and WhatsApp */
    marketing: { display: "72570 01413", e164: "+917257001413" },
    /** Service, AMC and 24x7 breakdowns */
    service: { display: "93341 19103", e164: "+919334119103" },
  } satisfies Record<string, Phone>,
  /** Public email: to be provided by the user. Not shown until set. */
  email: null as string | null,
  headOffice: {
    label: "Head and registered office",
    lines: [
      "401, Pawan Pradeep Apartment, Khetan Gali",
      "West Boring Canal Road, Patna 800001, Bihar",
    ],
    mapsUrl: "https://maps.google.com/?q=West+Boring+Canal+Road+Patna+800001",
  },
  regions: ["Patna", "Ranchi", "Jamshedpur", "Bhubaneswar", "Guwahati"],
  /** Fixed rather than computed: Cache Components forbids reading the clock here. */
  copyrightYear: 2026,
} as const;

export function telHref(phone: Phone) {
  return `tel:${phone.e164}`;
}

export function whatsappHref(phone: Phone, text?: string) {
  const base = `https://wa.me/${phone.e164.replace("+", "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
