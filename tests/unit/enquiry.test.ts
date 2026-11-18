import { describe, expect, it } from "vitest";
import { sendEnquiry } from "@/app/actions/enquiry";
import {
  enquirySchema,
  enquiryWhatsappUrl,
  parseEnquiryDefaults,
  quoteHrefWith,
} from "@/lib/enquiry";

const valid = {
  need: "new",
  liftType: "passenger",
  floors: "5",
  city: "Patna",
  name: "Test Visitor",
  phone: "98765 43210",
  message: "",
};

function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [k, v] of Object.entries(values)) data.set(k, v);
  return data;
}

describe("enquirySchema", () => {
  it.each(["9876543210", "98765 43210", "+91 98765 43210", "09876543210", "98765-43210"])(
    "accepts the mobile number %s and keeps the last 10 digits",
    (phone) => {
      const result = enquirySchema.safeParse({ ...valid, phone });
      expect(result.success && result.data.phone).toBe("9876543210");
    },
  );

  it.each(["12345", "5876543210", "98765432101", "abcdefghij"])("rejects %s", (phone) => {
    expect(enquirySchema.safeParse({ ...valid, phone }).success).toBe(false);
  });

  it("allows floors to be left empty but not out of range", () => {
    expect(enquirySchema.safeParse({ ...valid, floors: "" }).success).toBe(true);
    expect(enquirySchema.safeParse({ ...valid, floors: "1" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, floors: "61" }).success).toBe(false);
  });
});

describe("enquiryWhatsappUrl", () => {
  it("writes the enquiry to the sales number", () => {
    const parsed = enquirySchema.parse(valid);
    const url = new URL(enquiryWhatsappUrl(parsed));
    expect(url.origin + url.pathname).toBe("https://wa.me/917257001413");
    const text = url.searchParams.get("text") ?? "";
    expect(text).toContain("Need: New lift installation");
    expect(text).toContain("Floors: 5");
    expect(text).toContain("Mobile: 9876543210");
    expect(text).not.toContain("Note:");
  });
});

describe("sendEnquiry", () => {
  it("returns field errors and the typed values when invalid", async () => {
    const state = await sendEnquiry({ status: "idle" }, form({ ...valid, need: "", phone: "1" }));
    expect(state.status).toBe("invalid");
    if (state.status !== "invalid") return;
    expect(Object.keys(state.errors).sort()).toEqual(["need", "phone"]);
    expect(state.values.name).toBe("Test Visitor");
    expect(state.attempt).toBeTruthy();
  });

  it("is not delivered yet and offers WhatsApp instead", async () => {
    const state = await sendEnquiry({ status: "idle" }, form(valid));
    expect(state).toMatchObject({ status: "sent", delivered: false, name: "Test" });
  });

  it("ignores bots that fill the hidden field", async () => {
    const state = await sendEnquiry({ status: "idle" }, form({ ...valid, company: "Spam Ltd" }));
    expect(state.status).toBe("idle");
  });
});

describe("pre-filled enquiries", () => {
  it("keeps only valid pre-fill values, and never name or mobile", () => {
    expect(
      parseEnquiryDefaults({
        need: "modernise",
        liftType: "rocket",
        floors: ["8", "9"],
        city: "  Ranchi ",
        message: "",
        name: "Someone",
        phone: "9876543210",
      }),
    ).toEqual({ need: "modernise", floors: "8", city: "Ranchi" });
    expect(parseEnquiryDefaults({ floors: "1" })).toEqual({});
  });

  it("builds the /quote link from defaults, skipping empty ones", () => {
    expect(quoteHrefWith()).toBe("/quote");
    expect(quoteHrefWith({ need: "new", city: "" })).toBe("/quote?need=new");
    const href = quoteHrefWith({ liftType: "home", message: "Line one\nLine two" });
    expect(
      parseEnquiryDefaults(Object.fromEntries(new URL(href, "http://x").searchParams)),
    ).toEqual({ liftType: "home", message: "Line one\nLine two" });
  });
});
