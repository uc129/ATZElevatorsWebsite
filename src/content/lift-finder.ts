/**
 * Copy for the "Find your lift" guide (/find-your-lift): the questions, their
 * options and the sentences that explain a recommendation. The rules that
 * pick a lift live in src/lib/lift-finder.ts. Plan:
 * docshub/plans/2026-11-18-find-your-lift-plan.md.
 *
 * No statistics in this copy (a unit test checks for digits).
 */
import { officeList } from "./offices";

/** lucide-react icon names, mapped to components where the guide renders. */
export type FinderIcon =
  | "house"
  | "building"
  | "hospital"
  | "store"
  | "shopping-bag"
  | "factory"
  | "utensils"
  | "landmark"
  | "sparkles"
  | "refresh"
  | "wrench"
  | "users"
  | "bed"
  | "package"
  | "files"
  | "check"
  | "x"
  | "help"
  | "map-pin";

export type FinderOption<V extends string = string> = {
  value: V;
  label: string;
  hint?: string;
  icon?: FinderIcon;
};

export const buildingOptions = [
  { value: "home", label: "Independent house or villa", icon: "house" },
  { value: "apartment", label: "Apartment society", icon: "building" },
  { value: "hospital", label: "Hospital or clinic", icon: "hospital" },
  { value: "office", label: "Office or shop", icon: "store" },
  { value: "mall", label: "Mall or hotel", icon: "shopping-bag" },
  { value: "factory", label: "Factory or warehouse", icon: "factory" },
  { value: "restaurant", label: "Restaurant or kitchen", icon: "utensils" },
  { value: "institution", label: "Government or institution", icon: "landmark" },
] as const satisfies readonly FinderOption[];

export const stageOptions = [
  {
    value: "new",
    label: "No, it needs a new lift",
    hint: "A new building, or one that never had a lift",
    icon: "sparkles",
  },
  {
    value: "upgrade",
    label: "Yes, it needs upgrading or replacing",
    hint: "An old, slow or unreliable lift",
    icon: "refresh",
  },
  {
    value: "maintain",
    label: "Yes, I need maintenance or repairs",
    hint: "Any brand, any age",
    icon: "wrench",
  },
] as const satisfies readonly FinderOption[];

export const carryOptions = [
  { value: "people", label: "People", icon: "users" },
  { value: "stretcher", label: "Patients on stretchers or beds", icon: "bed" },
  { value: "goods", label: "Goods and heavy loads", icon: "package" },
  { value: "small", label: "Small items like food, files or linen", icon: "files" },
] as const satisfies readonly FinderOption[];

export const roofOptions = [
  { value: "yes", label: "Yes", hint: "There is space above the top floor", icon: "check" },
  { value: "no", label: "No", hint: "The roof is used or there is no space", icon: "x" },
  {
    value: "unsure",
    label: "Not sure",
    hint: "Our engineer checks this on the survey",
    icon: "help",
  },
] as const satisfies readonly FinderOption[];

export const cityOptions = [
  ...officeList.map((o) => ({ value: o.slug, label: o.city, icon: "map-pin" as const })),
  { value: "other", label: "Somewhere else", icon: "map-pin" as const },
] satisfies FinderOption[];

/** Floors use the same range as the enquiry form. */
export const floorLimits = { min: 2, max: 60 } as const;

/** `label` is the short name used in the answers summary. */
export const finderQuestions = {
  building: { label: "Building", title: "What kind of building is it?", options: buildingOptions },
  stage: { label: "Lift now", title: "Is there a lift there now?", options: stageOptions },
  carry: {
    label: "Carries",
    title: "What will the lift mostly carry?",
    options: carryOptions,
  },
  floors: {
    label: "Floors",
    title: "How many floors, including the ground?",
    hint: "Count every floor the lift will stop at.",
  },
  roof: {
    label: "Room for a machine room",
    title: "Is there room on the roof for a machine room?",
    options: roofOptions,
  },
  city: { label: "City", title: "Which city is the building in?", options: cityOptions },
} as const;

export const finderForm = {
  submit: "Show my lift",
  errorSummary: (count: number) =>
    count === 1 ? "Answer the question marked below." : "Answer the questions marked below.",
  choose: "Choose an answer.",
  floors: "Enter a number of floors from two to sixty.",
  skipNote: "Only need maintenance or repairs? Skip the next three questions.",
} as const;

export const finderPage = {
  eyebrow: "Find your lift",
  title: "Which lift is right for your building?",
  lead: "Answer a few quick questions and we will suggest the lift that fits, with the reasons. It takes about a minute.",
  resultEyebrow: "Our suggestion",
  disclaimer:
    "This is a starting point. An ATZ engineer confirms the right lift after a free site survey of your shaft, load and power supply.",
  alternativesTitle: "Also worth a look",
  reasonsTitle: "Why this lift",
  answersTitle: "Your answers",
  changeAnswers: "Change answers",
  startAgain: "Start again",
  quote: "Get a quote with these answers",
  whatsapp: "Send on WhatsApp",
  nextTitle: "Next step",
  officeTitle: "Your nearest team",
  otherCity:
    "We work across Bihar, Jharkhand, West Bengal, Odisha and Assam. Call us and we will tell you which team covers your city.",
} as const;

/** One sentence per rule that applied. Keys match the rules in lib/lift-finder.ts. */
export const finderReasons = {
  small: "You mostly move small items, so a compact service lift does the job without a full car.",
  goods:
    "You mostly move goods, so a heavy-duty freight lift with a strong car and wide doors fits.",
  factory: "Factories and warehouses need lifts built for heavy, everyday loads.",
  stretcher:
    "You move patients on stretchers or beds, so the car needs to be deep enough for them.",
  hospital: "Hospitals and clinics need deep cars, smooth stops and level floors for patients.",
  home: "In an independent house, a compact home lift fits a smaller shaft and looks at home.",
  homeTall: "For a taller house, a passenger lift is also worth comparing.",
  mall: "In a mall or hotel, a glass lift turns the ride into part of the building.",
  noRoof: "There is no room on the roof, so a lift with no machine room fits.",
  unsureRoof: "If the roof turns out to be tight, a lift with no machine room avoids building one.",
  passenger: "A passenger lift is the dependable choice for people moving between floors.",
  tall: "For a taller building, a gearless lift gives a quieter, smoother ride.",
  highRise:
    "For a high-rise, our engineers plan the lifts around the building's traffic and shaft on the survey.",
  upgrade:
    "You already have a lift, so modernisation can keep the shaft and replace what is worn out.",
  maintain: "We maintain and repair lifts of every brand, with a 24×7 breakdown line.",
} as const;

export type FinderReason = keyof typeof finderReasons;

export const maintainResult = {
  title: "You need a maintenance partner",
  lead: "Tell us about your lift and we will arrange a free inspection and an AMC that suits it.",
} as const;

export function officeReason(city: string) {
  return `Our ${city} team looks after your building, from survey to service.`;
}
