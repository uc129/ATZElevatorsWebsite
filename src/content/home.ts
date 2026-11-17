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

/**
 * Patna drone film (On Road, Instagram), slowed to 0.625x. For the About page
 * (step 6). Permission from the creator is pending: do not ship until confirmed.
 */
export const patnaRising = {
  eyebrow: "Patna is rising",
  title: "New floors go up across the city every season.",
  text: "Hospitals, offices and homes are climbing higher along the Ganga. Every new floor needs a lift that is planned early, built right and cared for over a lifetime. That is the work we do.",
  video: "/media/patna-rising.mp4",
  poster: "/media/patna-rising-poster.jpg",
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
