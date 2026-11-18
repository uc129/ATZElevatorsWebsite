/**
 * Homepage copy. Rules (user, 18-Nov-2026): no statistics, marketing phrases
 * instead; founded 2002; ERP data is the source of truth for company facts.
 */
import type { PhotoId } from "./photos";

export const hero = {
  eyebrow: "ATZ Elevators · Patna, since 2002",
  lead: "ATZ manufactures, installs, maintains and modernises passenger, home, hospital and freight lifts, and services every make. Rooted in Patna, with engineers across Bihar, Jharkhand, West Bengal, Odisha and Assam.",
  assurances: ["Every make serviced", "24×7 breakdown support", "Free site survey"],
  photos: { main: "patnaSkyline", inset: "patnaLiftConstruction" } satisfies Record<
    string,
    PhotoId
  >,
};

/** No numbers: short claims that read as promises. */
export const highlights = [
  { title: "Rooted in Patna", text: "Built and run from Bihar since 2002." },
  {
    title: "Reach across the east",
    text: "Engineers in Bihar, Jharkhand, West Bengal, Odisha and Assam.",
  },
  { title: "Any make, any age", text: "Maintained, repaired and modernised." },
  { title: "Always on call", text: "A breakdown line that never sleeps." },
];

export const inMotion = {
  eyebrow: "Cities on the move",
  title: "Every busy building runs on vertical transport.",
  text: "Malls, hospitals and homes across India move people floor to floor all day. We keep that movement safe, smooth and on time, from the first survey to the last safety check.",
};

/** Client buildings with openly licensed photos (PMCH). Others to follow from ATZ. */
export const clientBuildings = [
  { photo: "patnaPmchNight", caption: "PMCH, Patna" },
  { photo: "patnaPmchAshokRajpath", caption: "PMCH from Ashok Rajpath" },
] as const satisfies readonly { photo: PhotoId; caption: string }[];

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

export { services } from "./services";

/**
 * Sample quotes for layout, clearly labelled. Replaced by real, verified
 * client testimonials (with permission) when ATZ supplies them. Shown in sets
 * of three that rotate on the homepage (`testimonialSetSize`); keep the count a
 * multiple of three.
 */
export const testimonialSetSize = 3;

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
  {
    quote:
      "We wanted a lift for my parents without giving up a room. ATZ planned a compact home lift beside the stairwell, and my mother now goes upstairs on her own.",
    role: "Owner, independent house",
    place: "Gaya, Bihar",
  },
  {
    quote:
      "Our school lift runs every day of term. The engineers visit on schedule and plan any repair work around exam days, so it is always ready when the children need it.",
    role: "Principal, school",
    place: "Ranchi, Jharkhand",
  },
  {
    quote:
      "Guests notice the lift before almost anything else. ATZ fitted a quiet, smooth car with a finish that suits our lobby, and took care of every detail at handover.",
    role: "General manager, hotel",
    place: "Bhubaneswar, Odisha",
  },
  {
    quote:
      "We chose to modernise an old lift in our office building instead of replacing it. ATZ kept the shaft, renewed the controller and doors, and the building stayed open throughout.",
    role: "Executive engineer, government building",
    place: "Patna, Bihar",
  },
  {
    quote:
      "On our residential projects, ATZ shares the shaft drawings early, so our site teams build it right the first time. Every handover has been on time.",
    role: "Project manager, real estate developer",
    place: "Kolkata, West Bengal",
  },
  {
    quote:
      "Our goods lift carries heavy loads all day. When a part wore out, ATZ fitted a replacement quickly and kept the floor moving.",
    role: "Plant manager, factory",
    place: "Guwahati, Assam",
  },
];

/** Offices from the ERP regions master. Jamshedpur is not shown (user, 18-Nov-2026); branch contact details to follow. */
export const offices = {
  photos: ["patnaBiscomaun", "patnaSecretariat"] satisfies PhotoId[],
  branches: [
    { city: "Ranchi", state: "Jharkhand" },
    { city: "Kolkata", state: "West Bengal" },
    { city: "Bhubaneswar", state: "Odisha" },
    { city: "Guwahati", state: "Assam" },
  ],
};
