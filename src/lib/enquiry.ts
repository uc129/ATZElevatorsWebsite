/**
 * Enquiry form: options, validation and the single delivery seam.
 *
 * No database (ADR 0003). Until the ERP endpoint is provided, submitEnquiry()
 * does not store or send anything; the success screen hands the visitor a
 * pre-filled WhatsApp message so the enquiry still reaches the sales team.
 * Connecting the ERP is a change to submitEnquiry() only.
 */
import { z } from "zod";
import { company, whatsappHref } from "@/content/company";

export const needOptions = [
  { value: "new", label: "New lift installation" },
  { value: "amc", label: "AMC and maintenance" },
  { value: "modernise", label: "Modernisation" },
  { value: "repair", label: "Repair or breakdown" },
] as const;

export const liftTypeOptions = [
  { value: "unsure", label: "Not sure yet" },
  { value: "passenger", label: "Passenger lift" },
  { value: "home", label: "Home lift" },
  { value: "mrl", label: "MRL or gearless" },
  { value: "panoramic", label: "Panoramic lift" },
  { value: "hospital", label: "Hospital or stretcher lift" },
  { value: "freight", label: "Freight lift" },
  { value: "dumbwaiter", label: "Dumbwaiter" },
] as const;

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

/** Indian mobile: 10 digits starting 6 to 9, optional +91, 91 or 0 prefix and spaces or dashes. */
const mobile = z
  .string()
  .trim()
  .transform((s) => s.replace(/[\s-]/g, ""))
  .refine((s) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(s), {
    message: "Enter a 10-digit mobile number, like 98765 43210.",
  })
  .transform((s) => s.slice(-10));

export const enquirySchema = z.object({
  need: z.enum(values(needOptions), { message: "Choose what you need." }),
  liftType: z.enum(values(liftTypeOptions)).default("unsure"),
  floors: z
    .union([z.literal(""), z.coerce.number().int().min(2).max(60)], {
      message: "Enter a number of floors from 2 to 60.",
    })
    .optional(),
  city: z.string().trim().max(60).optional(),
  name: z.string().trim().min(2, "Enter your name.").max(80),
  phone: mobile,
  message: z.string().trim().max(1000, "Keep the message under 1,000 characters.").optional(),
});

export type Enquiry = z.output<typeof enquirySchema>;
export type EnquiryField = keyof z.input<typeof enquirySchema>;

export type EnquiryState =
  | { status: "idle" }
  | {
      status: "invalid";
      /** New per failed attempt: the form remounts so selects keep their values. */
      attempt: string;
      errors: Partial<Record<EnquiryField, string>>;
      values: Partial<Record<EnquiryField, string>>;
    }
  | { status: "sent"; delivered: boolean; name: string; whatsappUrl: string };

export const fieldNames: EnquiryField[] = [
  "need",
  "liftType",
  "floors",
  "city",
  "name",
  "phone",
  "message",
];

const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

/** The enquiry as a WhatsApp message to the sales number. */
export function enquiryWhatsappUrl(e: Enquiry) {
  const lines = [
    `Hello ATZ, I would like a quote.`,
    `Need: ${labelOf(needOptions, e.need)}`,
    `Lift type: ${labelOf(liftTypeOptions, e.liftType)}`,
    e.floors ? `Floors: ${e.floors}` : null,
    e.city ? `City: ${e.city}` : null,
    `Name: ${e.name}`,
    `Mobile: ${e.phone}`,
    e.message ? `Note: ${e.message}` : null,
  ].filter(Boolean);
  return whatsappHref(company.phones.marketing, lines.join("\n"));
}

/**
 * Delivery seam. Replace the body with the ERP call when the endpoint is
 * provided. Never log the visitor's personal details.
 */
export async function submitEnquiry(enquiry: Enquiry): Promise<{ delivered: boolean }> {
  void enquiry;
  return { delivered: false };
}
