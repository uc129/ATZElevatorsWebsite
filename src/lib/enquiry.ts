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
import { quoteHref } from "@/content/navigation";

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

/**
 * Fields a link may pre-fill, e.g. from the Find your lift guide or a lift
 * page. The visitor's name and mobile number never travel in a URL.
 */
export const prefillFields = ["need", "liftType", "floors", "city", "message"] as const;
export type EnquiryDefaults = Partial<Record<(typeof prefillFields)[number], string>>;

const prefillSchemas = {
  need: z.enum(values(needOptions)),
  liftType: z.enum(values(liftTypeOptions)),
  floors: z.coerce
    .number()
    .int()
    .min(2)
    .max(60)
    .transform((n) => String(n)),
  city: z.string().trim().min(1).max(60),
  message: z.string().trim().min(1).max(1000),
};

/** Read pre-fill values from a query string, keeping the valid ones only. */
export function parseEnquiryDefaults(
  params: Record<string, string | string[] | undefined>,
): EnquiryDefaults {
  const defaults: EnquiryDefaults = {};
  for (const field of prefillFields) {
    const raw = params[field];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value === undefined) continue;
    const parsed = prefillSchemas[field].safeParse(value);
    if (parsed.success) defaults[field] = parsed.data;
  }
  return defaults;
}

/** The /quote link for a set of defaults; plain /quote when there are none. */
export function quoteHrefWith(defaults?: EnquiryDefaults) {
  const entries = prefillFields.flatMap((field) => {
    const value = defaults?.[field];
    return value ? [[field, value] as [string, string]] : [];
  });
  return entries.length ? `${quoteHref}?${new URLSearchParams(entries)}` : quoteHref;
}

const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

/** A typical building, so the floors field is never empty; the visitor can change it. */
export const defaultFloors = "6";

type Need = (typeof needOptions)[number]["value"];
type LiftType = (typeof liftTypeOptions)[number]["value"];

/** Each lift type as it reads in a sentence, with its article. */
const liftPhrases: Record<LiftType, string> = {
  unsure: "a lift",
  passenger: "a passenger lift",
  home: "a home lift",
  mrl: "a machine-room-less lift",
  panoramic: "a panoramic glass lift",
  hospital: "a hospital lift",
  freight: "a goods lift",
  dumbwaiter: "a dumbwaiter",
};

/**
 * A ready-to-send message in the visitor's own voice (never ATZ's selling
 * phrases, such as "free site survey"), from what the page knows.
 * `place` is the building as it reads after "our", e.g. "hospital"; it
 * comes from the Find your lift guide. It never guesses a number of lifts.
 */
export function enquiryMessage({
  need,
  liftType,
  place = "building",
}: {
  need?: string;
  liftType?: string;
  place?: string;
}) {
  const lift = liftPhrases[liftType as LiftType] ?? liftPhrases.unsure;
  const theLift = lift.replace(/^an? /, "the ");
  switch (need as Need | undefined) {
    case "new":
      return `Hi, I'd like to talk about installing ${lift} at our ${place}. I would be grateful if you could contact me to arrange a site visit.`;
    case "modernise":
      return `Hi, I'd like to talk about upgrading ${theLift} at our ${place}. I would be grateful if you could contact me at your earliest convenience.`;
    case "amc":
      return `Hi, I'd like to talk about an AMC for ${theLift} at our ${place}. I would be grateful if you could contact me at your earliest convenience.`;
    case "repair":
      return `Hi, ${theLift} at our ${place} needs a repair. I would be grateful if someone from your team could get in touch as soon as possible.`;
    default:
      return `Hi, I'd like to talk about ${lift} for our ${place}. I would be grateful if you could contact me at your earliest convenience.`;
  }
}

/**
 * What a fresh form starts with: the standard floors, a message written
 * from the need and lift type, the visitor's city when known, then whatever
 * the page or link knows on top (a link's own message wins).
 */
export function startingValues(defaults: EnquiryDefaults = {}, visitorCity?: string) {
  const known = Object.fromEntries(
    Object.entries(defaults).filter(([, value]) => Boolean(value)),
  ) as EnquiryDefaults;
  return {
    floors: defaultFloors,
    message: enquiryMessage({ need: known.need, liftType: known.liftType }),
    ...(visitorCity ? { city: visitorCity } : {}),
    ...known,
  } satisfies EnquiryDefaults;
}

/** A WhatsApp message to the sales number from pre-filled values, before any name. */
export function defaultsWhatsappUrl(defaults: EnquiryDefaults) {
  const lines = [
    "Hello ATZ, I would like a quote.",
    defaults.need ? `Need: ${labelOf(needOptions, defaults.need)}` : null,
    defaults.liftType && defaults.liftType !== "unsure"
      ? `Lift type: ${labelOf(liftTypeOptions, defaults.liftType)}`
      : null,
    defaults.floors ? `Floors: ${defaults.floors}` : null,
    defaults.city ? `City: ${defaults.city}` : null,
    defaults.message ?? null,
  ].filter(Boolean);
  return whatsappHref(company.phones.marketing, lines.join("\n"));
}

/**
 * The visitor's approximate city, from the header Vercel adds to each
 * request (worked out from the internet address; no location prompt, not
 * stored). Absent locally and off Vercel.
 */
export function visitorCityFrom(headers: Headers): string | undefined {
  const raw = headers.get("x-vercel-ip-city");
  if (!raw) return undefined;
  try {
    const city = decodeURIComponent(raw).trim();
    return /^[\p{L} .'-]{2,60}$/u.test(city) ? city : undefined;
  } catch {
    return undefined;
  }
}

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
