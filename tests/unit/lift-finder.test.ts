import { describe, expect, it } from "vitest";
import {
  buildingOptions,
  carryOptions,
  finderPage,
  finderQuestions,
  finderReasons,
  maintainResult,
  roofOptions,
  stageOptions,
} from "@/content/lift-finder";
import { liftCategories } from "@/content/lifts";
import { enquirySchema, liftTypeOptions } from "@/lib/enquiry";
import {
  answersToQuery,
  enquiryDefaultsFromAnswers,
  finderThresholds,
  isComplete,
  parseAnswers,
  questionsFor,
  recommendLift,
  type FinderAnswers,
} from "@/lib/lift-finder";

const base: FinderAnswers = {
  building: "apartment",
  stage: "new",
  carry: "people",
  floors: 4,
  roof: "yes",
  city: "patna",
};

const pick = (changes: Partial<FinderAnswers>) => {
  const rec = recommendLift({ ...base, ...changes });
  if (rec?.kind !== "lift") throw new Error("expected a lift recommendation");
  return rec;
};

describe("parseAnswers", () => {
  it("keeps valid answers and drops bad ones", () => {
    expect(
      parseAnswers({
        building: "hospital",
        stage: "rocket",
        floors: "6",
        roof: ["no", "yes"],
        city: "",
        extra: "x",
      }),
    ).toEqual({ building: "hospital", floors: 6, roof: "no" });
  });

  it("rejects floors outside the enquiry form range", () => {
    expect(parseAnswers({ floors: "1" })).toEqual({});
    expect(parseAnswers({ floors: "61" })).toEqual({});
    expect(parseAnswers({ floors: "3.5" })).toEqual({});
  });

  it("round-trips through the query string", () => {
    expect(parseAnswers(Object.fromEntries(new URLSearchParams(answersToQuery(base))))).toEqual(
      base,
    );
  });
});

describe("question path", () => {
  it("asks every question for a lift, and skips lift questions for maintenance", () => {
    expect(questionsFor(base)).toEqual(Object.keys(finderQuestions));
    expect(questionsFor({ stage: "maintain" })).toEqual(["building", "stage", "city"]);
  });

  it("is complete only when every question on the path is answered", () => {
    expect(isComplete(base)).toBe(true);
    expect(isComplete({ ...base, roof: undefined })).toBe(false);
    expect(isComplete({ building: "office", stage: "maintain", city: "ranchi" })).toBe(true);
    expect(recommendLift({ building: "office" })).toBeNull();
  });

  it("leaves skipped answers out of the query string", () => {
    expect(answersToQuery({ ...base, stage: "maintain" })).toBe(
      "building=apartment&stage=maintain&city=patna",
    );
  });
});

describe("recommendLift", () => {
  const slugs = liftCategories.map((l) => l.slug);

  it("always returns real lifts, never repeating the main pick", () => {
    for (const building of buildingOptions.map((o) => o.value))
      for (const carry of carryOptions.map((o) => o.value))
        for (const roof of roofOptions.map((o) => o.value))
          for (const floors of [2, 5, 8, 20]) {
            const rec = pick({ building, carry, roof, floors });
            expect(slugs).toContain(rec.primary);
            for (const alt of rec.alternatives) expect(slugs).toContain(alt);
            expect(rec.alternatives).not.toContain(rec.primary);
            expect(rec.alternatives.length).toBeLessThanOrEqual(2);
            expect(rec.reasons.length).toBeGreaterThan(0);
          }
  });

  it("follows the rules in order", () => {
    expect(pick({ building: "hospital", carry: "small" }).primary).toBe("dumbwaiter");
    expect(pick({ carry: "goods" }).primary).toBe("freight");
    expect(pick({ building: "factory" }).primary).toBe("freight");
    expect(pick({ carry: "stretcher" }).primary).toBe("hospital");
    expect(pick({ building: "hospital" }).primary).toBe("hospital");
    expect(pick({ building: "home" }).primary).toBe("home");
    expect(pick({ building: "mall" }).primary).toBe("panoramic");
    expect(pick({ roof: "no" }).primary).toBe("mrl");
    expect(pick({ roof: "unsure", floors: 5 }).primary).toBe("mrl");
    expect(pick({ roof: "unsure", floors: 15 }).primary).toBe("mrl");
    expect(pick({ roof: "unsure", floors: 4 }).primary).toBe("passenger");
    expect(pick({ roof: "unsure", floors: 16 }).primary).toBe("passenger");
    expect(pick({ roof: "no", floors: 15 }).primary).toBe("mrl");
    const highRiseNoRoof = pick({ roof: "no", floors: 16 });
    expect(highRiseNoRoof.primary).toBe("passenger");
    expect(highRiseNoRoof.reasons).toContain(finderReasons.highRise);
    expect(pick({}).primary).toBe("passenger");
  });

  it("offers gearless alongside passenger lifts from 8 to 15 floors", () => {
    expect(finderThresholds.mrl).toEqual({ min: 5, max: 15 });
    expect(finderThresholds.gearless).toEqual({ min: 8, max: 15 });
    expect(pick({ floors: 7 }).alternatives).toEqual([]);
    expect(pick({ floors: 8 }).alternatives).toEqual(["mrl"]);
    expect(pick({ floors: 15 }).alternatives).toEqual(["mrl"]);
    const highRise = pick({ floors: 16 });
    expect(highRise.alternatives).toEqual([]);
    expect(highRise.reasons).toContain(finderReasons.highRise);
    expect(pick({ building: "home", floors: finderThresholds.homeTall }).alternatives).toEqual([
      "passenger",
    ]);
  });

  it("explains each pick", () => {
    expect(pick({ roof: "no" }).reasons).toContain(finderReasons.noRoof);
    expect(pick({ building: "mall", roof: "no" }).reasons).toEqual(
      expect.arrayContaining([finderReasons.mall, finderReasons.noRoof]),
    );
  });

  it("points existing lifts at modernisation and new ones at installation", () => {
    expect(pick({}).service).toBe("installation");
    const upgrade = pick({ stage: "upgrade" });
    expect(upgrade.service).toBe("modernisation");
    expect(upgrade.reasons).toContain(finderReasons.upgrade);
  });

  it("names the nearest office, or none for other cities", () => {
    expect(pick({ city: "kolkata" }).office?.city).toBe("Kolkata");
    expect(pick({ city: "kolkata" }).reasons.at(-1)).toContain("Kolkata");
    expect(pick({ city: "other" }).office).toBeNull();
  });

  it("sends maintenance visitors to the AMC service", () => {
    const rec = recommendLift({ building: "apartment", stage: "maintain", city: "patna" });
    expect(rec).toMatchObject({ kind: "maintain", service: "amc" });
    expect(rec?.reasons[0]).toBe(finderReasons.maintain);
  });
});

describe("enquiryDefaultsFromAnswers", () => {
  it("fills the enquiry form with values it accepts", () => {
    const defaults = enquiryDefaultsFromAnswers({ ...base, building: "hospital", floors: 6 });
    expect(defaults).toMatchObject({
      need: "new",
      liftType: "hospital",
      floors: "6",
      city: "Patna",
    });
    expect(defaults?.message).toContain("Suggested: Hospital lifts");
    const parsed = enquirySchema.safeParse({ ...defaults, name: "Asha", phone: "9876543210" });
    expect(parsed.success).toBe(true);
  });

  it("maps every stage to an enquiry need", () => {
    expect(enquiryDefaultsFromAnswers({ ...base, stage: "upgrade" })?.need).toBe("modernise");
    const maintain = enquiryDefaultsFromAnswers({
      building: "office",
      stage: "maintain",
      city: "other",
    });
    expect(maintain).toMatchObject({ need: "amc", liftType: "unsure", floors: "", city: "" });
    expect(maintain?.message).not.toContain("Suggested");
  });

  it("uses lift slugs the enquiry form knows", () => {
    const known = liftTypeOptions.map((o) => o.value as string);
    for (const lift of liftCategories) expect(known).toContain(lift.slug);
  });

  it("returns nothing until the guide is complete", () => {
    expect(enquiryDefaultsFromAnswers({ building: "home" })).toBeNull();
  });
});

describe("guide copy", () => {
  it("uses no statistics (only the 24×7 service hours)", () => {
    const copy = JSON.stringify({
      finderPage,
      finderReasons,
      maintainResult,
      stageOptions,
      roofOptions,
      questions: Object.values(finderQuestions).map((q) => q.title),
    });
    expect((copy.match(/\d+/g) ?? []).filter((n) => n !== "24" && n !== "7")).toEqual([]);
  });
});
