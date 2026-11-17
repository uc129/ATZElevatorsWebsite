/**
 * Credits for third-party photos (Creative Commons, via Wikimedia Commons).
 * Every third-party photo on the site must be listed here; the footer renders
 * this list. ATZ's own photos need no credit.
 */
export type PhotoCredit = {
  subject: string;
  author: string;
  license: "CC BY 2.0" | "CC BY 4.0" | "CC BY-SA 4.0";
  licenseUrl: string;
  sourceUrl: string;
};

const BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const credits = {
  panoramicAtrium: {
    subject: "Panoramic lifts in a hotel atrium",
    author: 'OOO TD "Vek"',
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Panoramic_VEK_Elevator_shafts_in_Beton_Brut_Hotel_(Anapa).jpg"),
  },
  glassCar: {
    subject: "Glass lift car",
    author: "Baron Maddock",
    license: "CC BY 4.0",
    licenseUrl: BY_4,
    sourceUrl: commons("Inside_of_the_glass_elevator_at_Tysons_Mall.jpg"),
  },
  carTopMaintenance: {
    subject: "Lift maintenance",
    author: "Killarnee",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Elevator_maintenance_1.jpg"),
  },
  carTopInspection: {
    subject: "Lift inspection",
    author: "Killarnee",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Elevator_maintenance_2.jpg"),
  },
  glassTower: {
    subject: "Glass lift tower",
    author: "Metropolitan Transportation Authority",
    license: "CC BY 2.0",
    licenseUrl: BY_2,
    sourceUrl: commons("New_Elevator_Installed_at_8_Av_Station_in_Brooklyn_(53059355346).jpg"),
  },
  patnaHospital: {
    subject: "Hospital in Patna",
    author: "BigAolloSepctra",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Hospital_in_patna.jpg"),
  },
  patnaNight: {
    subject: "PMCH, Patna, at night",
    author: "Shivam Setu",
    license: "CC BY 4.0",
    licenseUrl: BY_4,
    sourceUrl: commons("PMCH_at_night.jpg"),
  },
} satisfies Record<string, PhotoCredit>;

export type CreditId = keyof typeof credits;

export const photoCredits: PhotoCredit[] = Object.values(credits);

/** Short caption for a photo tag: "Photo: Author · CC BY 4.0". */
export function creditLine(id: CreditId) {
  const c = credits[id];
  return `Photo: ${c.author} · ${c.license}`;
}
