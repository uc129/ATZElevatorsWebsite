/**
 * Photo registry. Static imports give next/image the size and a blur
 * placeholder. Third-party photos point at their credit (content/credits.ts);
 * `atz: true` marks ATZ's own photos. Only organic, local photos: Patna
 * streets and buildings, no generic stock (user, 18-Nov-2026).
 */
import type { StaticImageData } from "next/image";
import atzManualCollapsible from "../../public/photos/atz-manual-collapsible.jpg";
import atzSwingDoor from "../../public/photos/atz-swing-door.jpg";
import patnaDighaHighrises from "../../public/photos/patna-digha-highrises.jpg";
import patnaFordHospital from "../../public/photos/patna-ford-hospital.jpg";
import patnaHospital from "../../public/photos/patna-hospital.jpg";
import patnaLiftConstruction from "../../public/photos/patna-lift-construction.jpg";
import patnaOneMall from "../../public/photos/patna-one-mall.jpg";
import patnaPmMallNight from "../../public/photos/patna-pm-mall-night.jpg";
import patnaPmchAshokRajpath from "../../public/photos/patna-pmch-ashok-rajpath.jpg";
import patnaPmchNight from "../../public/photos/patna-pmch-night.jpg";
import patnaSkylineGolghar from "../../public/photos/patna-skyline-golghar.jpg";
import patnaTheMall from "../../public/photos/patna-the-mall.jpg";
import type { CreditId } from "./credits";

export type Photo = {
  src: StaticImageData;
  alt: string;
} & ({ atz: true; credit?: never } | { atz?: false; credit: CreditId });

export const photos = {
  atzManualCollapsible: {
    src: atzManualCollapsible,
    alt: "ATZ passenger lift with a collapsible gate and an ATZ-branded call panel",
    atz: true,
  },
  atzSwingDoor: {
    src: atzSwingDoor,
    alt: "ATZ passenger lift with a white swing landing door",
    atz: true,
  },
  patnaSkyline: {
    src: patnaSkylineGolghar,
    alt: "Patna seen from the top of Golghar: offices, the round Biscomaun tower and green treetops",
    credit: "patnaSkyline",
  },
  patnaLiftConstruction: {
    src: patnaLiftConstruction,
    alt: "A new lift tower rising in bamboo scaffolding against a school building in Patna",
    credit: "patnaLiftConstruction",
  },
  patnaDighaHighrises: {
    src: patnaDighaHighrises,
    alt: "Residential high-rises beside the Digha–AIIMS elevated road in Patna",
    credit: "patnaDighaHighrises",
  },
  patnaPmchAshokRajpath: {
    src: patnaPmchAshokRajpath,
    alt: "Patna Medical College and Hospital buildings seen from Ashok Rajpath",
    credit: "patnaPmchAshokRajpath",
  },
  patnaOneMall: {
    src: patnaOneMall,
    alt: "Patna One Mall, a multi-storey shopping centre with a green facade",
    credit: "patnaOneMall",
  },
  patnaTheMall: {
    src: patnaTheMall,
    alt: "The Mall, Patna: a red and glass commercial building",
    credit: "patnaTheMall",
  },
  patnaPmMallNight: {
    src: patnaPmMallNight,
    alt: "P&M Mall in Patna at night, lit up with crowds at the entrance",
    credit: "patnaPmMallNight",
  },
  patnaFordHospital: {
    src: patnaFordHospital,
    alt: "Ford Hospital, a multi-storey hospital building in Patna",
    credit: "patnaFordHospital",
  },
  patnaHospital: {
    src: patnaHospital,
    alt: "Multi-storey hospital building in Patna",
    credit: "patnaHospital",
  },
  patnaPmchNight: {
    src: patnaPmchNight,
    alt: "Patna Medical College and Hospital lit up at night",
    credit: "patnaNight",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
