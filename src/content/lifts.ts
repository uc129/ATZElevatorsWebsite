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
  /** Buildings this lift suits, for the detail page */
  idealFor: string[];
  /** A short history of this kind of lift, for the detail page. No digits: years in words. */
  history: string;
  /** What ATZ does with this kind of lift. Only facts already on the site. */
  atz: string;
};

export const liftCategories: LiftCategory[] = [
  {
    slug: "passenger",
    history:
      "The passenger lift as we know it began in the nineteenth century, when Elisha Otis showed that a car could be held safely even if its rope broke. Steam and hydraulic lifts gave way to electric traction, and push buttons and automatic doors later replaced the lift attendant, making the lift an everyday part of apartments and offices.",
    atz: "ATZ builds passenger lifts for apartment societies, offices, shops and schools, with doors from simple manual collapsible gates to automatic centre-opening glass. Our engineers size the car, speed and doors to your building after a free survey, our own crews install it, and an AMC with a 24×7 breakdown line keeps it running.",
    idealFor: ["Apartment blocks", "Offices", "Shops and showrooms", "Schools and colleges"],
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
    history:
      "For most of their history, lifts were built for large buildings. Lifts for private homes grew out of the platform and chair lifts made for people who found stairs hard, and smaller hydraulic and gearless drives have since made a lift practical in an ordinary house.",
    atz: "ATZ fits home lifts in independent houses, duplexes and villas, choosing a hydraulic or gearless drive to suit the shaft and the space you have. We plan the lift around the family who will use it, with gentle starts and safe doors, and service it from a team close by.",
    idealFor: ["Independent houses", "Duplexes and villas", "Homes with elderly members"],
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
    history:
      "Gearless traction machines arrived in the early twentieth century and gave the first skyscrapers a smoother, quieter ride. Towards the end of that century, compact permanent-magnet motors became small enough to sit inside the shaft itself, and the machine room on the roof was no longer needed.",
    atz: "ATZ installs machine-room-less and gearless lifts in new apartments and offices, where they free up the roof and use less power than older geared machines. We also suggest them when modernising an old lift, so a building can retire a worn machine room and gain a quieter ride.",
    idealFor: [
      "New buildings with no room on the roof",
      "Offices and apartments",
      "Buildings where a quiet ride matters",
    ],
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
    history:
      "Glass lifts made the ride part of the architecture in the nineteen-sixties, when atrium hotels in the United States put glass-walled cars on show above their lobbies. Since then, panoramic lifts have become a signature of malls, hotels and showrooms around the world.",
    atz: "ATZ designs panoramic lifts for malls, hotels and atriums, with glass cars and finishes chosen to suit the building. A glass lift is always on show, so we plan the car, the structure around it and the cleaning and service routine together, and it stays as good to look at as it is to ride.",
    idealFor: ["Malls", "Hotels", "Atriums and showrooms"],
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
    history:
      "As hospitals grew taller in the early twentieth century, ordinary passenger cars proved too short for a patient lying on a bed or stretcher. Deep bed lifts followed, with wide doors, gentle starts and level stops, so that patients, staff and equipment could move between wards safely.",
    atz: "ATZ's healthcare clients include PMCH, IGIMS and NMCH in Patna. We build hospital and stretcher lifts with deep cars and smooth, level stops, and because a lift out of service in a hospital is never a small matter, our breakdown line answers around the clock.",
    idealFor: ["Hospitals", "Nursing homes", "Clinics and diagnostic centres"],
    icon: "hospital",
    photo: "patnaHospital",
    name: "Hospital lifts",
    short: "Stretcher and bed",
    blurb: "Deep cars sized for stretchers and beds, for hospitals, clinics and nursing homes.",
    variants: ["Hospital lift", "Stretcher lift"],
  },
  {
    slug: "freight",
    history:
      "Goods lifts came before passenger lifts. Hoists moved materials in mills, mines and warehouses through the industrial revolution, and Elisha Otis first designed his safety brake for a factory goods hoist, before it ever carried people.",
    atz: "ATZ builds heavy-duty freight lifts for warehouses, factories, showrooms and commercial kitchens, with strong cars, wide doors and controls made for daily loading. We size each lift to the loads you actually move, and plan its service around your working hours.",
    idealFor: ["Warehouses", "Factories", "Showrooms and commercial kitchens"],
    icon: "package",
    name: "Freight lifts",
    short: "Goods and industrial",
    blurb: "Heavy-duty goods lifts for warehouses, factories, showrooms and commercial kitchens.",
    variants: ["Freight lift"],
  },
  {
    slug: "dumbwaiter",
    history:
      "Dumbwaiters are among the oldest lifts still in use. For centuries, small cars pulled by hand on ropes carried food from basement kitchens up to dining rooms in large houses, and electric motors later brought the same idea to restaurants, hotels and hospitals.",
    atz: "ATZ installs dumbwaiters for restaurants, hotels, hospitals and offices, sized for trays, files or linen. They save staff from carrying loads up and down the stairs all day, and we maintain them on the same AMC as the building's other lifts.",
    idealFor: ["Restaurants and hotels", "Hospitals", "Offices moving files"],
    icon: "utensils",
    name: "Dumbwaiters",
    short: "Small service lifts",
    blurb:
      "Small service lifts that move food, files and linen between floors in restaurants, hotels and hospitals.",
    variants: ["Dumbwaiter"],
  },
];

export function findLift(slug: string) {
  return liftCategories.find((c) => c.slug === slug);
}

export function liftHref(slug: string) {
  return `/lifts/${slug}`;
}
