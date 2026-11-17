/**
 * Offices from the ERP regions master. Patna has the full address (ERP);
 * branch addresses and phones are to follow from the user, so branches use
 * the central service line for now. Jamshedpur is not shown (user, 18-Nov-2026).
 */
import { company } from "./company";

export type Office = {
  slug: string;
  city: string;
  state: string;
  kind: "Head office" | "Branch";
  /** Full address lines, when known */
  address?: readonly string[];
  mapsUrl?: string;
};

export const officeList: Office[] = [
  {
    slug: "patna",
    city: "Patna",
    state: "Bihar",
    kind: "Head office",
    address: company.headOffice.lines,
    mapsUrl: company.headOffice.mapsUrl,
  },
  { slug: "ranchi", city: "Ranchi", state: "Jharkhand", kind: "Branch" },
  { slug: "kolkata", city: "Kolkata", state: "West Bengal", kind: "Branch" },
  { slug: "bhubaneswar", city: "Bhubaneswar", state: "Odisha", kind: "Branch" },
  { slug: "guwahati", city: "Guwahati", state: "Assam", kind: "Branch" },
];

export function findOffice(slug: string) {
  return officeList.find((o) => o.slug === slug);
}

export function officeHref(slug: string) {
  return `/contact/${slug}`;
}
