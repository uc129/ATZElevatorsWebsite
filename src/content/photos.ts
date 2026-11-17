/**
 * Photo registry. Static imports give next/image the size and a blur
 * placeholder. Third-party photos point at their credit (content/credits.ts);
 * `atz: true` marks ATZ's own photos.
 */
import type { StaticImageData } from "next/image";
import atzManualCollapsible from "../../public/photos/atz-manual-collapsible.jpg";
import atzSwingDoor from "../../public/photos/atz-swing-door.jpg";
import carTopInspection from "../../public/photos/car-top-inspection.jpg";
import carTopMaintenance from "../../public/photos/car-top-maintenance.jpg";
import glassCarInterior from "../../public/photos/glass-car-interior.jpg";
import glassLiftTower from "../../public/photos/glass-lift-tower.jpg";
import panoramicAtrium from "../../public/photos/panoramic-atrium.jpg";
import patnaHospital from "../../public/photos/patna-hospital.jpg";
import patnaPmchNight from "../../public/photos/patna-pmch-night.jpg";
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
  panoramicAtrium: {
    src: panoramicAtrium,
    alt: "Panoramic glass lift shafts rising through a hotel atrium",
    credit: "panoramicAtrium",
  },
  glassCarInterior: {
    src: glassCarInterior,
    alt: "Stainless steel lift car with glass side walls",
    credit: "glassCar",
  },
  carTopMaintenance: {
    src: carTopMaintenance,
    alt: "Maintenance on top of a lift car, with ropes and controller",
    credit: "carTopMaintenance",
  },
  carTopInspection: {
    src: carTopInspection,
    alt: "Inspection box on top of a lift car",
    credit: "carTopInspection",
  },
  glassLiftTower: {
    src: glassLiftTower,
    alt: "Newly installed glass lift tower beside a building",
    credit: "glassTower",
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
