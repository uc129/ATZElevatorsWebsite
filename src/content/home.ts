/**
 * Homepage copy. Rules (user, 18-Nov-2026): no statistics, marketing phrases
 * instead; founded 2002; ERP data is the source of truth for company facts.
 */
import type { PhotoId } from "./photos";

export const hero = {
  eyebrow: "ATZ Elevators · Patna, since 2002",
  lead: "ATZ manufactures, installs, maintains and modernises passenger, home, hospital and freight lifts, and services every make. Rooted in Patna, with engineers across Bihar, Jharkhand, Odisha and Assam.",
  assurances: ["Every make serviced", "24×7 breakdown support", "Free site survey"],
  photos: { main: "patnaSkyline", inset: "patnaLiftConstruction" } satisfies Record<
    string,
    PhotoId
  >,
};

/** No numbers: short claims that read as promises. */
export const highlights = [
  { title: "Rooted in Patna", text: "Built and run from Bihar since 2002." },
  { title: "Reach across the east", text: "Engineers in Bihar, Jharkhand, Odisha and Assam." },
  { title: "Any make, any age", text: "Maintained, repaired and modernised." },
  { title: "Always on call", text: "A breakdown line that never sleeps." },
];

export const inMotion = {
  eyebrow: "Cities on the move",
  title: "Every busy building runs on vertical transport.",
  text: "Malls, hospitals and homes across India move people floor to floor all day. We keep that movement safe, smooth and on time, from the first survey to the last safety check.",
};

export type Stage = { floor: string; title: string; text: string; tag: string };

/** Lift journey, ground to top. Merges the old site's eight steps into five floors. */
export const stages: Stage[] = [
  {
    floor: "G",
    title: "Free site survey",
    text: "We measure the shaft, pit, headroom and power supply, and note what the building needs.",
    tag: "Step 01",
  },
  {
    floor: "1",
    title: "Clear, itemised quotation",
    text: "One proposal covering the lift type, doors, finishes, timeline and warranty. No surprises later.",
    tag: "Step 02",
  },
  {
    floor: "2",
    title: "Installation by our own crews",
    text: "We build, wire and commission the lift on site, with one engineer answerable from start to finish.",
    tag: "Step 03",
  },
  {
    floor: "3",
    title: "Testing and handover",
    text: "Load tests and safety checks, then a handover with certification and documents.",
    tag: "Step 04",
  },
  {
    floor: "4",
    title: "AMC and lifetime care",
    text: "Scheduled maintenance and 24×7 breakdown cover keep the lift safe for its whole life.",
    tag: "For life",
  },
];

export const services = [
  {
    title: "New installation",
    text: "Survey, design, manufacture, installation and handover, with one engineer responsible from start to finish.",
    href: "/services/installation",
    cta: "Plan a new lift",
    photo: "patnaDighaHighrises",
    icon: "building",
  },
  {
    title: "AMC and maintenance",
    text: "Scheduled preventive visits, safety checks and priority callouts on an annual maintenance contract.",
    href: "/services/amc",
    cta: "See AMC plans",
    photo: "patnaPmchAshokRajpath",
    icon: "calendar",
  },
  {
    title: "Modernisation",
    text: "Upgrade old controllers, drives, doors and cabins to today's safety and comfort standards, without replacing the whole lift.",
    href: "/services/modernisation",
    cta: "Upgrade a lift",
    photo: "patnaTheMall",
    icon: "refresh",
  },
  {
    title: "Repairs, all makes",
    text: "Breakdown response and repairs for any brand of lift, by engineers based near you.",
    href: "/services/repairs",
    cta: "Book a repair",
    photo: "patnaOneMall",
    icon: "wrench",
  },
] as const satisfies readonly {
  title: string;
  text: string;
  href: string;
  cta: string;
  photo: PhotoId;
  icon: "building" | "calendar" | "refresh" | "wrench";
}[];

/**
 * Sample quotes for layout, clearly labelled. Replaced by real, verified
 * client testimonials (with permission) when ATZ supplies them.
 */
export const testimonials = [
  {
    quote:
      "Our society's lift was installed on schedule, and the AMC visits happen every month without us chasing anyone. When it stopped once at night, the Patna team reached us the same evening.",
    role: "Secretary, apartment society",
    place: "Boring Road, Patna",
  },
  {
    quote:
      "We needed a stretcher lift that stops level at every floor. ATZ surveyed the building, explained the options clearly, and the lift has run smoothly since handover.",
    role: "Administrator, hospital",
    place: "Kankarbagh, Patna",
  },
  {
    quote:
      "ATZ took over maintenance of a lift another company had installed, and fixed faults that had kept coming back. The quotation was clear and there were no surprises.",
    role: "Owner, showroom",
    place: "Muzaffarpur, Bihar",
  },
];

/** Offices from the ERP regions master (Kolkata left out at the user's request). */
export const offices = {
  photos: ["patnaHospital", "patnaPmchNight"] satisfies PhotoId[],
  branches: [
    { city: "Ranchi", state: "Jharkhand" },
    { city: "Jamshedpur", state: "Jharkhand" },
    { city: "Bhubaneswar", state: "Odisha" },
    { city: "Guwahati", state: "Assam" },
  ],
};
