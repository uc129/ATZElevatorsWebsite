/**
 * "Find your lift" guide: parse the answers from the URL, pick a lift and
 * build the pre-filled enquiry. Pure functions, no markup; the copy lives in
 * src/content/lift-finder.ts. The rules are a starting point for visitors,
 * not engineering advice: the result always defers to a site survey.
 */
import { z } from "zod";
import {
  buildingOptions,
  carryOptions,
  cityOptions,
  finderReasons,
  floorLimits,
  officeReason,
  roofOptions,
  stageOptions,
  type FinderReason,
} from "@/content/lift-finder";
import { liftCategories, type LiftCategory } from "@/content/lifts";
import { findOffice, type Office } from "@/content/offices";
import type { EnquiryField } from "@/lib/enquiry";

/**
 * Thresholds, in floors including the ground. Named here so ATZ engineers
 * can tune them in one place (open question 4 in the plan, answered by ATZ).
 */
export const finderThresholds = {
  /** With "not sure" about roof space, suggest MRL in this range (ATZ, 18-Nov-2026). */
  mrl: { min: 5, max: 15 },
  /** Offer gearless (the MRL and gearless range) alongside a passenger lift in this range. */
  gearless: { min: 8, max: 15 },
  /** Above this, the engineers plan the lift around the building. */
  highRise: 15,
  /** A house this tall gets a passenger lift as an alternative. */
  homeTall: 5,
} as const;

const within = (floors: number, range: { min: number; max: number }) =>
  floors >= range.min && floors <= range.max;

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

/** One schema per answer, so a bad value drops only that answer. */
const answerSchemas = {
  building: z.enum(values(buildingOptions)),
  stage: z.enum(values(stageOptions)),
  carry: z.enum(values(carryOptions)),
  floors: z.coerce.number().int().min(floorLimits.min).max(floorLimits.max),
  roof: z.enum(values(roofOptions)),
  city: z.enum(values(cityOptions)),
};

export type FinderKey = keyof typeof answerSchemas;
export type FinderAnswers = { [K in FinderKey]: z.output<(typeof answerSchemas)[K]> };
export type PartialAnswers = Partial<FinderAnswers>;

/** Question order. Maintenance skips the lift questions. */
export const finderKeys: FinderKey[] = ["building", "stage", "carry", "floors", "roof", "city"];

export function questionsFor(answers: PartialAnswers): FinderKey[] {
  return answers.stage === "maintain" ? ["building", "stage", "city"] : finderKeys;
}

type SearchParams = Record<string, string | string[] | undefined>;

/** Read answers from the query string, keeping the valid ones only. */
export function parseAnswers(params: SearchParams): PartialAnswers {
  const answers: Record<string, unknown> = {};
  for (const key of finderKeys) {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value === undefined || value === "") continue;
    const parsed = answerSchemas[key].safeParse(value);
    if (parsed.success) answers[key] = parsed.data;
  }
  return answers as PartialAnswers;
}

export function isComplete(answers: PartialAnswers): boolean {
  return questionsFor(answers).every((key) => answers[key] !== undefined);
}

/** The query string for a set of answers, in question order. */
export function answersToQuery(answers: PartialAnswers): string {
  const params = new URLSearchParams();
  for (const key of questionsFor(answers)) {
    const value = answers[key];
    if (value !== undefined) params.set(key, String(value));
  }
  return params.toString();
}

export type LiftSlug = LiftCategory["slug"];

export type Recommendation =
  | {
      kind: "lift";
      primary: LiftSlug;
      alternatives: LiftSlug[];
      service: "installation" | "modernisation";
      reasons: string[];
      office: Office | null;
    }
  | {
      kind: "maintain";
      service: "amc";
      reasons: string[];
      office: Office | null;
    };

type Pick = { primary: LiftSlug; alternatives: LiftSlug[]; reasons: FinderReason[] };

/** The lift rules, in order; the first match wins. */
function pickLift(a: Omit<FinderAnswers, "city">): Pick {
  const gearless = within(a.floors, finderThresholds.gearless);
  const highRise = a.floors > finderThresholds.highRise;

  if (a.carry === "small") {
    return { primary: "dumbwaiter", alternatives: ["freight"], reasons: ["small"] };
  }
  if (a.carry === "goods" || a.building === "factory") {
    return {
      primary: "freight",
      alternatives: ["passenger"],
      reasons: a.carry === "goods" ? ["goods"] : ["factory"],
    };
  }
  if (a.carry === "stretcher" || a.building === "hospital") {
    return {
      primary: "hospital",
      alternatives: ["passenger", "dumbwaiter"],
      reasons: a.carry === "stretcher" ? ["stretcher"] : ["hospital"],
    };
  }
  if (a.building === "home") {
    const homeTall = a.floors >= finderThresholds.homeTall;
    return {
      primary: "home",
      alternatives: homeTall ? ["passenger"] : [],
      reasons: homeTall ? ["home", "homeTall"] : ["home"],
    };
  }
  if (a.building === "mall") {
    return {
      primary: "panoramic",
      alternatives: a.roof === "no" ? ["mrl", "passenger"] : ["passenger", "mrl"],
      reasons: a.roof === "no" ? ["mall", "noRoof"] : ["mall"],
    };
  }
  if (highRise) {
    return { primary: "passenger", alternatives: [], reasons: ["passenger", "highRise"] };
  }
  if (a.roof === "no") {
    return { primary: "mrl", alternatives: ["passenger"], reasons: ["noRoof"] };
  }
  if (a.roof === "unsure" && within(a.floors, finderThresholds.mrl)) {
    return { primary: "mrl", alternatives: ["passenger"], reasons: ["unsureRoof"] };
  }
  return {
    primary: "passenger",
    alternatives: gearless ? ["mrl"] : [],
    reasons: gearless
      ? ["passenger", "tall"]
      : highRise
        ? ["passenger", "highRise"]
        : ["passenger"],
  };
}

function officeFor(city: FinderAnswers["city"]) {
  return city === "other" ? null : (findOffice(city) ?? null);
}

function withOffice(reasons: string[], office: Office | null) {
  return office ? [...reasons, officeReason(office.city)] : reasons;
}

/** Returns null until every question on the visitor's path is answered. */
export function recommendLift(answers: PartialAnswers): Recommendation | null {
  if (!isComplete(answers)) return null;
  const a = answers as FinderAnswers;
  const office = officeFor(a.city);

  if (a.stage === "maintain") {
    return {
      kind: "maintain",
      service: "amc",
      reasons: withOffice([finderReasons.maintain], office),
      office,
    };
  }

  const pick = pickLift(a);
  const keys: FinderReason[] = a.stage === "upgrade" ? [...pick.reasons, "upgrade"] : pick.reasons;
  return {
    kind: "lift",
    primary: pick.primary,
    alternatives: pick.alternatives.filter((s) => s !== pick.primary),
    service: a.stage === "upgrade" ? "modernisation" : "installation",
    reasons: withOffice(
      keys.map((k) => finderReasons[k]),
      office,
    ),
    office,
  };
}

const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

const liftName = (slug: string) => liftCategories.find((l) => l.slug === slug)?.name ?? slug;

/** A plain-text summary of the answers, for the enquiry message and WhatsApp. */
export function answersSummary(answers: FinderAnswers, rec: Recommendation): string {
  const lines = [
    "From the Find your lift guide:",
    `Building: ${labelOf(buildingOptions, answers.building)}`,
    `Lift now: ${labelOf(stageOptions, answers.stage)}`,
  ];
  if (rec.kind === "lift") {
    lines.push(
      `Carries: ${labelOf(carryOptions, answers.carry)}`,
      `Floors: ${answers.floors}`,
      `Room for a machine room: ${labelOf(roofOptions, answers.roof)}`,
      `Suggested: ${liftName(rec.primary)}`,
    );
  }
  return lines.join("\n");
}

export type EnquiryDefaults = Partial<Record<EnquiryField, string>>;

/** Defaults for the enquiry form, with the same field names and values. */
export function enquiryDefaultsFromAnswers(answers: PartialAnswers): EnquiryDefaults | null {
  const rec = recommendLift(answers);
  if (!rec) return null;
  const a = answers as FinderAnswers;
  const need = { new: "new", upgrade: "modernise", maintain: "amc" } as const;
  return {
    need: need[a.stage],
    liftType: rec.kind === "lift" ? rec.primary : "unsure",
    floors: rec.kind === "lift" ? String(a.floors) : "",
    city: rec.office?.city ?? "",
    message: answersSummary(a, rec),
  };
}
