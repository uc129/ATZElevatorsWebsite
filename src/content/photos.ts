/**
 * Photo registry. Static imports give next/image the size and a blur
 * placeholder. Every photo points at its credit (content/credits.ts); `atz:
 * true` is for ATZ's own photos when they arrive.
 * Rules (user, 18-Nov-2026): recognisable Patna buildings and streets, and
 * clean lift close-ups; no generic or foreign building stock.
 */
import type { StaticImageData } from "next/image";
import liftButtonPanel from "../../public/photos/lift-button-panel.jpg";
import liftCarInterior from "../../public/photos/lift-car-interior.jpg";
import liftDoorsSteel from "../../public/photos/lift-doors-steel.jpg";
import liftLobby from "../../public/photos/lift-lobby.jpg";
import mrlGearlessMachine from "../../public/photos/mrl-gearless-machine.jpg";
import patnaBiscomaunBhawan from "../../public/photos/patna-biscomaun-bhawan.jpg";
import patnaCybotechTower from "../../public/photos/patna-cybotech-tower.jpg";
import patnaHospital from "../../public/photos/patna-hospital.jpg";
import patnaLiftConstruction from "../../public/photos/patna-lift-construction.jpg";
import patnaPmMallNight from "../../public/photos/patna-pm-mall-night.jpg";
import patnaPmchAshokRajpath from "../../public/photos/patna-pmch-ashok-rajpath.jpg";
import patnaPmchNight from "../../public/photos/patna-pmch-night.jpg";
import patnaSecretariatNight from "../../public/photos/patna-secretariat-night.jpg";
import patnaSkylineGolghar from "../../public/photos/patna-skyline-golghar.jpg";
import patnaTheMall from "../../public/photos/patna-the-mall.jpg";
import type { CreditId } from "./credits";

export type Photo = {
  src: StaticImageData;
  alt: string;
} & ({ atz: true; credit?: never } | { atz?: false; credit: CreditId });

export const photos = {
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
  patnaCybotech: {
    src: patnaCybotechTower,
    alt: "Cybotech Tower, a glass-fronted office building in Patna",
    credit: "patnaCybotech",
  },
  patnaBiscomaun: {
    src: patnaBiscomaunBhawan,
    alt: "Biscomaun Bhawan, the round white tower that marks the Patna skyline",
    credit: "patnaBiscomaun",
  },
  patnaSecretariat: {
    src: patnaSecretariatNight,
    alt: "The Patna Secretariat and its clock tower lit up at night",
    credit: "patnaSecretariat",
  },
  patnaPmchAshokRajpath: {
    src: patnaPmchAshokRajpath,
    alt: "Patna Medical College and Hospital buildings seen from Ashok Rajpath",
    credit: "patnaPmchAshokRajpath",
  },
  patnaPmchNight: {
    src: patnaPmchNight,
    alt: "Patna Medical College and Hospital lit up at night",
    credit: "patnaNight",
  },
  patnaCentralMall: {
    src: patnaTheMall,
    alt: "Central Mall, Patna: a red and glass commercial building",
    credit: "patnaCentralMall",
  },
  patnaPmMallNight: {
    src: patnaPmMallNight,
    alt: "P&M Mall in Patna at night, lit up with crowds at the entrance",
    credit: "patnaPmMallNight",
  },
  patnaHospital: {
    src: patnaHospital,
    alt: "Multi-storey hospital building in Patna",
    credit: "patnaHospital",
  },
  mrlGearless: {
    src: mrlGearlessMachine,
    alt: "Inside a machine-room-less lift shaft: the gearless drive, ropes and speed governor",
    credit: "mrlGearless",
  },
  liftDoors: {
    src: liftDoorsSteel,
    alt: "A row of brushed stainless steel lift doors in a lobby",
    credit: "liftDoors",
  },
  liftCar: {
    src: liftCarInterior,
    alt: "A bright, clean lift car interior with handrail and floor display",
    credit: "liftCar",
  },
  liftLobby: {
    src: liftLobby,
    alt: "A quiet hotel corridor with lift doors on both sides",
    credit: "liftLobby",
  },
  liftPanel: {
    src: liftButtonPanel,
    alt: "Close-up of a stainless steel lift button panel",
    credit: "liftPanel",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
