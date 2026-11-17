"use server";

import {
  enquirySchema,
  enquiryWhatsappUrl,
  fieldNames,
  submitEnquiry,
  type EnquiryField,
  type EnquiryState,
} from "@/lib/enquiry";

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "idle" };
  }

  const raw = Object.fromEntries(
    fieldNames.map((name) => [name, String(formData.get(name) ?? "")]),
  ) as Record<EnquiryField, string>;

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<EnquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as EnquiryField;
      errors[field] ??= issue.message;
    }
    return { status: "invalid", attempt: crypto.randomUUID(), errors, values: raw };
  }

  const { delivered } = await submitEnquiry(parsed.data);
  return {
    status: "sent",
    delivered,
    name: parsed.data.name.split(" ")[0] ?? parsed.data.name,
    whatsappUrl: enquiryWhatsappUrl(parsed.data),
  };
}
