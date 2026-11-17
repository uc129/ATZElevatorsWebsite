/**
 * Services: cards on the homepage and /services, and the detail pages at
 * /services/[slug]. No statistics (user rule); plain promises and process.
 */
import type { PhotoId } from "./photos";

export type Service = {
  slug: string;
  title: string;
  /** One-line summary for cards */
  text: string;
  cta: string;
  photo: PhotoId;
  icon: "building" | "calendar" | "refresh" | "wrench";
  /** Detail page */
  lead: string;
  sections: { title: string; items: { title: string; text: string }[] }[];
};

export const services = [
  {
    slug: "installation",
    title: "New installation",
    text: "Survey, design, manufacture, installation and handover, with one engineer responsible from start to finish.",
    cta: "Plan a new lift",
    photo: "patnaCybotech",
    icon: "building",
    lead: "From the first site survey to the day you sign for the keys, one ATZ engineer stays answerable for your lift.",
    sections: [
      {
        title: "How a new lift comes together",
        items: [
          {
            title: "Free site survey",
            text: "We measure the shaft, pit, headroom and power supply, and note how the building will be used.",
          },
          {
            title: "Clear, itemised quotation",
            text: "Lift type, capacity, doors, cabin finish, timeline and warranty, written so you can compare it line by line.",
          },
          {
            title: "Manufacture and delivery",
            text: "Your lift is built to the agreed specification and delivered to site in the planned sequence.",
          },
          {
            title: "Installation",
            text: "Our own crews install the guide rails, machine, car and doors, then wire and commission the controller.",
          },
          {
            title: "Testing and handover",
            text: "Load and safety tests, then a handover with documents, training on rescue procedure and the first service visit booked.",
          },
        ],
      },
      {
        title: "What the building prepares",
        items: [
          {
            title: "A finished shaft and pit",
            text: "Built to the drawing we share after the survey, plumb, clean and dry.",
          },
          {
            title: "Power at the machine position",
            text: "A dedicated supply and earthing, ready before commissioning.",
          },
          {
            title: "Safe access for our crew",
            text: "A clear path for material delivery and lighting in the shaft during installation.",
          },
        ],
      },
    ],
  },
  {
    slug: "amc",
    title: "AMC and maintenance",
    text: "Scheduled preventive visits, safety checks and priority callouts on an annual maintenance contract.",
    cta: "See AMC plans",
    photo: "liftLobby",
    icon: "calendar",
    lead: "A lift that is looked after on schedule rides smoother, breaks down less and lasts longer. Our AMC keeps it that way, whoever built it.",
    sections: [
      {
        title: "Two kinds of contract",
        items: [
          {
            title: "Comprehensive",
            text: "Preventive visits, callouts and the replacement of covered parts, all within the contract.",
          },
          {
            title: "Non-comprehensive",
            text: "Preventive visits and callouts; parts are quoted and replaced with your approval.",
          },
        ],
      },
      {
        title: "On every visit",
        items: [
          {
            title: "Safety checks",
            text: "Brakes, doors, landing locks, alarm and emergency lighting.",
          },
          {
            title: "Cleaning and lubrication",
            text: "Guide rails, door tracks and the machine, so the ride stays quiet.",
          },
          {
            title: "A written report",
            text: "What we checked, what we changed and anything that needs attention soon.",
          },
        ],
      },
    ],
  },
  {
    slug: "modernisation",
    title: "Modernisation",
    text: "Upgrade old controllers, drives, doors and cabins to today's safety and comfort standards, without replacing the whole lift.",
    cta: "Upgrade a lift",
    photo: "liftPanel",
    icon: "refresh",
    lead: "Keep the shaft and rails, renew what wears out. Modernising an older lift brings today's safety and comfort without starting from scratch.",
    sections: [
      {
        title: "What we upgrade",
        items: [
          {
            title: "Controller and drive",
            text: "Smoother starts and stops, accurate levelling and lower power use.",
          },
          { title: "Doors", text: "Automatic doors with safety edges in place of manual gates." },
          {
            title: "Cabin and fixtures",
            text: "New panels, lighting, floor display and push buttons.",
          },
          {
            title: "Safety devices",
            text: "Rescue on power failure, overload sensing and modern landing locks.",
          },
        ],
      },
      {
        title: "Signs your lift needs it",
        items: [
          { title: "Frequent breakdowns", text: "The same faults coming back after repair." },
          { title: "Uneven stops", text: "The car stops above or below the floor." },
          {
            title: "Hard-to-find parts",
            text: "Spares for the old controller or machine are no longer made.",
          },
        ],
      },
    ],
  },
  {
    slug: "repairs",
    title: "Repairs, all makes",
    text: "Breakdown response and repairs for any brand of lift, by engineers based near you.",
    cta: "Book a repair",
    photo: "patnaCentralMall",
    icon: "wrench",
    lead: "Whoever made your lift, our engineers can diagnose it, repair it and get it moving again.",
    sections: [
      {
        title: "How a repair works",
        items: [
          {
            title: "Call the breakdown line",
            text: "Day or night. Tell us the address and what the lift is doing.",
          },
          {
            title: "An engineer from your nearest team",
            text: "Diagnoses the fault on site and makes the lift safe first.",
          },
          {
            title: "A clear quote for parts",
            text: "Nothing is replaced without your approval, unless it is covered by your AMC.",
          },
        ],
      },
    ],
  },
] as const satisfies readonly Service[];

export function serviceHref(slug: string) {
  return `/services/${slug}`;
}
