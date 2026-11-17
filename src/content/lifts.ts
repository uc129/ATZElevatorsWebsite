/**
 * Lift categories. Copy from the prototype canvas (product tabs and mega
 * menu). A category without a good photo shows its icon until ATZ supplies
 * one (brochure crops are too small for the web).
 */
import type { PhotoId } from "./photos";

export type LiftIcon = "users" | "home" | "cog" | "panorama" | "hospital" | "package" | "utensils";

export type LiftCategory = {
  slug: string;
  name: string;
  /** One line for menus */
  short: string;
  blurb: string;
  variants: string[];
  icon: LiftIcon;
  photo?: PhotoId;
};

export const liftCategories: LiftCategory[] = [
  {
    slug: "passenger",
    icon: "users",
    photo: "liftDoors",
    name: "Passenger lifts",
    short: "Residential and commercial",
    blurb:
      "For apartments, offices and commercial buildings. Choose from six door configurations, from manual collapsible gates to automatic centre-opening glass doors.",
    variants: [
      "Manual collapsible",
      "Manual swing door",
      "Manual telescopic",
      "Auto telescopic",
      "Auto centre-opening",
      "Auto centre-opening glass",
    ],
  },
  {
    slug: "home",
    icon: "home",
    photo: "liftCar",
    name: "Home lifts",
    short: "Villas and duplexes",
    blurb:
      "Compact lifts for independent houses and duplexes, with hydraulic or gearless drives that fit smaller shafts.",
    variants: ["Hydraulic home lift", "Gearless home lift"],
  },
  {
    slug: "mrl",
    icon: "cog",
    photo: "mrlGearless",
    name: "MRL and gearless",
    short: "No machine room",
    blurb:
      "Traction lifts with gearless machines and no machine room. They ride more smoothly and free up space on the roof.",
    variants: ["MRL lift", "Traction gearless lift"],
  },
  {
    slug: "panoramic",
    icon: "panorama",
    photo: "patnaPmMallNight",
    name: "Panoramic lifts",
    short: "Glass cars",
    blurb:
      "Glass-walled cars for malls, hotels and atriums, where the ride is part of the architecture.",
    variants: ["Panoramic lift"],
  },
  {
    slug: "hospital",
    icon: "hospital",
    photo: "patnaHospital",
    name: "Hospital lifts",
    short: "Stretcher and bed",
    blurb: "Deep cars sized for stretchers and beds, for hospitals, clinics and nursing homes.",
    variants: ["Hospital lift", "Stretcher lift"],
  },
  {
    slug: "freight",
    icon: "package",
    name: "Freight lifts",
    short: "Goods and industrial",
    blurb: "Heavy-duty goods lifts for warehouses, factories, showrooms and commercial kitchens.",
    variants: ["Freight lift"],
  },
  {
    slug: "dumbwaiter",
    icon: "utensils",
    name: "Dumbwaiters",
    short: "Small service lifts",
    blurb:
      "Small service lifts that move food, files and linen between floors in restaurants, hotels and hospitals.",
    variants: ["Dumbwaiter"],
  },
];

export function liftHref(slug: string) {
  return `/lifts/${slug}`;
}
