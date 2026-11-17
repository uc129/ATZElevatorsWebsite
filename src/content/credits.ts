/**
 * Credits for every third-party photo and film. Patna photos are Creative
 * Commons (Wikimedia Commons); lift close-ups are Pexels (free licence, credit
 * given anyway). Credits are not shown on the page or in the footer: they are
 * listed on /credits, linked from the footer (user, 18-Nov-2026).
 */
export type PhotoCredit = {
  /** File under public/ */
  asset: string;
  subject: string;
  author: string;
  license:
    | "CC BY-SA 3.0"
    | "CC BY-SA 4.0"
    | "CC BY 4.0"
    | "Pexels License"
    | "Permission pending"
    | "Used with permission";
  licenseUrl: string;
  sourceUrl: string;
};

const BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const PEXELS = "https://www.pexels.com/license/";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const credits = {
  patnaSkyline: {
    asset: "photos/patna-skyline-golghar.jpg",
    subject: "Patna from Golghar",
    author: "Nandanupadhyay",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA_3,
    sourceUrl: commons("View_of_Patna_city_from_the_top_of_Golghar.jpg"),
  },
  patnaLiftConstruction: {
    asset: "photos/patna-lift-construction.jpg",
    subject: "Lift tower under construction, Patna",
    author: "Shivam Setu",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA_3,
    sourceUrl: commons("Sxs_lift_construction.jpg"),
  },
  patnaCybotech: {
    asset: "photos/patna-cybotech-tower.jpg",
    subject: "Cybotech Tower, Patna",
    author: "Mitranshu",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA_3,
    sourceUrl: commons("Cybotech_Tower,_headoffice_of_Cybotech_Campus.jpg"),
  },
  patnaBiscomaun: {
    asset: "photos/patna-biscomaun-bhawan.jpg",
    subject: "Biscomaun Bhawan, Patna",
    author: "Shivam Setu",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Biscoman_Bhawan_02.JPG"),
  },
  patnaSecretariat: {
    asset: "photos/patna-secretariat-night.jpg",
    subject: "Patna Secretariat at night",
    author: "Shivam Setu",
    license: "CC BY 4.0",
    licenseUrl: BY_4,
    sourceUrl: commons("Patna_Secratariat.jpg"),
  },
  patnaPmchAshokRajpath: {
    asset: "photos/patna-pmch-ashok-rajpath.jpg",
    subject: "PMCH from Ashok Rajpath, Patna",
    author: "Drgopalpmch",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Patna_medical_college_view_from_ashok_raj_path.jpg"),
  },
  patnaNight: {
    asset: "photos/patna-pmch-night.jpg",
    subject: "PMCH, Patna, at night",
    author: "Shivam Setu",
    license: "CC BY 4.0",
    licenseUrl: BY_4,
    sourceUrl: commons("PMCH_at_night.jpg"),
  },
  patnaCentralMall: {
    asset: "photos/patna-the-mall.jpg",
    subject: "Central Mall, Patna",
    author: "Shivam Setu",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("The_Mall_Patna.JPG"),
  },
  patnaPmMallNight: {
    asset: "photos/patna-pm-mall-night.jpg",
    subject: "P&M Mall at night, Patna",
    author: "Kharbaan Ghaltaan",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("P%26M_Mall_night1.jpg"),
  },
  patnaHospital: {
    asset: "photos/patna-hospital.jpg",
    subject: "Hospital in Patna",
    author: "BigAolloSepctra",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Hospital_in_patna.jpg"),
  },
  mrlGearless: {
    asset: "photos/mrl-gearless-machine.jpg",
    subject: "Gearless drive in a machine-room-less lift",
    author: "Carloferrari",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons(
      "Wittur-mrl-elevator-internal-view-with-gearless-drive-ropes-and-overspeed-governor.jpg",
    ),
  },
  liftDoors: {
    asset: "photos/lift-doors-steel.jpg",
    subject: "Stainless steel lift doors",
    author: "Salman Haris",
    license: "Pexels License",
    licenseUrl: PEXELS,
    sourceUrl: "https://www.pexels.com/photo/elevators-in-a-hotel-16383996/",
  },
  liftCar: {
    asset: "photos/lift-car-interior.jpg",
    subject: "Lift car interior",
    author: "Ana Benet",
    license: "Pexels License",
    licenseUrl: PEXELS,
    sourceUrl: "https://www.pexels.com/photo/photo-of-an-elevator-cabin-8243095/",
  },
  liftLobby: {
    asset: "photos/lift-lobby.jpg",
    subject: "Lift lobby",
    author: "Quang Nguyen Vinh",
    license: "Pexels License",
    licenseUrl: PEXELS,
    sourceUrl: "https://www.pexels.com/photo/hallway-in-modern-hotel-26729563/",
  },
  liftPanel: {
    asset: "photos/lift-button-panel.jpg",
    subject: "Lift button panel",
    author: "Erik Mclean",
    license: "Pexels License",
    licenseUrl: PEXELS,
    sourceUrl: "https://www.pexels.com/photo/metal-control-panel-in-elevator-16026075/",
  },
  cityInMotion: {
    asset: "media/city-in-motion-720.mp4",
    subject: "Escalators in a Pune shopping mall (film)",
    author: "Amit Patekar",
    license: "Pexels License",
    licenseUrl: PEXELS,
    sourceUrl: "https://www.pexels.com/video/shopping-mall-escalator-in-mall-14393755/",
  },
  patnaRising: {
    asset: "media/patna-rising.mp4",
    subject: "Drone film of construction beside the Ganga, Patna (slowed)",
    author: "On Road (Instagram)",
    /** Set to "Used with permission" once the creator agrees; do not ship before. */
    license: "Permission pending",
    licenseUrl: "https://www.instagram.com/",
    sourceUrl: "https://www.instagram.com/",
  },
} satisfies Record<string, PhotoCredit>;

export type CreditId = keyof typeof credits;

/** Credits used by video rather than photos. */
export const videoCreditIds: CreditId[] = ["cityInMotion", "patnaRising"];

export const allCredits: PhotoCredit[] = Object.values(credits);
