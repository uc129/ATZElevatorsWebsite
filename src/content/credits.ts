/**
 * Credits for third-party photos and video. Photos are Creative Commons, from
 * Wikimedia Commons, all taken in Patna (user, 18-Nov-2026: organic, local
 * photos only). Every third-party item on the site must be listed here; the
 * footer renders this list. ATZ's own photos need no credit.
 */
export type PhotoCredit = {
  subject: string;
  author: string;
  license: "CC BY-SA 3.0" | "CC BY-SA 4.0" | "CC BY 4.0" | "Pexels License";
  licenseUrl: string;
  sourceUrl: string;
};

const BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const credits = {
  patnaSkyline: {
    subject: "Patna from Golghar",
    author: "Nandanupadhyay",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA_3,
    sourceUrl: commons("View_of_Patna_city_from_the_top_of_Golghar.jpg"),
  },
  patnaLiftConstruction: {
    subject: "Lift tower under construction, Patna",
    author: "Shivam Setu",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA_3,
    sourceUrl: commons("Sxs_lift_construction.jpg"),
  },
  patnaDighaHighrises: {
    subject: "High-rises on the Digha–AIIMS road, Patna",
    author: "Sntshkumar750",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Digha-AIIMS_Elevated_Road.jpg"),
  },
  patnaPmchAshokRajpath: {
    subject: "PMCH from Ashok Rajpath, Patna",
    author: "Drgopalpmch",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Patna_medical_college_view_from_ashok_raj_path.jpg"),
  },
  patnaOneMall: {
    subject: "Patna One Mall",
    author: "Shivam Setu",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("Patna_One_Mall_01.jpg"),
  },
  patnaTheMall: {
    subject: "The Mall, Patna",
    author: "Shivam Setu",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("The_Mall_Patna.JPG"),
  },
  patnaPmMallNight: {
    subject: "P&M Mall at night, Patna",
    author: "Kharbaan Ghaltaan",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA_4,
    sourceUrl: commons("P%26M_Mall_night1.jpg"),
  },
  patnaFordHospital: {
    subject: "Ford Hospital, Patna",
    author: "Saigeindia",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA_3,
    sourceUrl: commons("Ford_Hospital_and_Research_Centre_Patna.JPG"),
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
  cityInMotion: {
    subject: "Escalators in a Pune shopping mall (film)",
    author: "Amit Patekar",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    sourceUrl: "https://www.pexels.com/video/shopping-mall-escalator-in-mall-14393755/",
  },
} satisfies Record<string, PhotoCredit>;

export type CreditId = keyof typeof credits;

export const photoCredits: PhotoCredit[] = Object.values(credits);

/** Short caption for a photo tag: "Photo: Author · CC BY 4.0". */
export function creditLine(id: CreditId) {
  const c = credits[id];
  return `Photo: ${c.author} · ${c.license}`;
}
