/**
 * Site navigation. Routes follow the sitemap on the design canvas
 * (/lifts, /services, /projects, /about, /contact, /support, /quote).
 * Pages that do not exist yet are stubbed in step 6.
 */
import { liftCategories, liftHref } from "./lifts";

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const supportLink: NavLink = { label: "Customer support", href: "/support" };

export const quoteHref = "/quote";

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Lifts",
    links: [
      ...liftCategories.map((c) => ({ label: c.name, href: liftHref(c.slug) })),
      { label: "All lifts", href: "/lifts" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "New installation", href: "/services/installation" },
      { label: "AMC and maintenance", href: "/services/amc" },
      { label: "Modernisation", href: "/services/modernisation" },
      { label: "Repairs, all makes", href: "/services/repairs" },
      { label: "Log a complaint", href: "/support/complaint" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ATZ", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
