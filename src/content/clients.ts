/**
 * Clients, handpicked by ATZ (user, 18-Nov-2026). Logos come from the earlier
 * atz-website-2025 repo. Government emblems (Government of Bihar, MES) are
 * shown by name only: the State Emblem may not be used as a logo.
 */
import type { StaticImageData } from "next/image";
import allIndiaRadio from "../../public/clients/all-india-radio.png";
import bikanervala from "../../public/clients/bikanervala.png";
import bmsicl from "../../public/clients/bmsicl.png";
import funCinemas from "../../public/clients/fun-cinemas.png";
import hotelSamrat from "../../public/clients/hotel-samrat-international.png";
import igims from "../../public/clients/igims.png";
import medipark from "../../public/clients/medipark-hospital.png";
import nmch from "../../public/clients/nmch.png";
import pmch from "../../public/clients/pmch.png";
import saakaar from "../../public/clients/saakaar-infra.png";
import stMichaels from "../../public/clients/st-michaels-high-school.png";

export type ClientSector =
  "Healthcare" | "Government and public" | "Education" | "Hospitality and retail" | "Real estate";

export type Client = {
  name: string;
  /** Who they are, in a few words */
  about: string;
  sector: ClientSector;
  logo?: StaticImageData;
};

export const clients: Client[] = [
  { name: "PMCH", about: "Patna Medical College and Hospital", sector: "Healthcare", logo: pmch },
  {
    name: "IGIMS",
    about: "Indira Gandhi Institute of Medical Sciences, Patna",
    sector: "Healthcare",
    logo: igims,
  },
  {
    name: "NMCH",
    about: "Nalanda Medical College and Hospital, Patna",
    sector: "Healthcare",
    logo: nmch,
  },
  {
    name: "BMSICL",
    about: "Bihar Medical Services and Infrastructure Corporation",
    sector: "Healthcare",
    logo: bmsicl,
  },
  {
    name: "MediPark Hospital",
    about: "Multi-speciality hospital",
    sector: "Healthcare",
    logo: medipark,
  },
  {
    name: "Government of Bihar",
    about: "State government buildings",
    sector: "Government and public",
  },
  {
    name: "All India Radio",
    about: "National public broadcaster",
    sector: "Government and public",
    logo: allIndiaRadio,
  },
  { name: "MES", about: "Military Engineer Services", sector: "Government and public" },
  {
    name: "St. Michael's High School",
    about: "School, Patna",
    sector: "Education",
    logo: stMichaels,
  },
  { name: "Don Bosco Academy", about: "School, Patna", sector: "Education" },
  {
    name: "Hotel Samrat International",
    about: "Hotel, Patna",
    sector: "Hospitality and retail",
    logo: hotelSamrat,
  },
  {
    name: "Bikanervala",
    about: "Restaurants and sweets",
    sector: "Hospitality and retail",
    logo: bikanervala,
  },
  {
    name: "Fun Cinemas",
    about: "Cinema, Patna",
    sector: "Hospitality and retail",
    logo: funCinemas,
  },
  { name: "Saakaar Infra", about: "Real estate developer", sector: "Real estate", logo: saakaar },
];
