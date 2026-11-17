import type { MetadataRoute } from "next";
import { liftCategories, liftHref } from "@/content/lifts";
import { officeHref, officeList } from "@/content/offices";
import { serviceHref, services } from "@/content/services";
import { siteUrl } from "@/lib/seo";

/** Every public page. Placeholder (coming soon) pages are left out until built. */
const staticRoutes = [
  "/",
  "/lifts",
  "/services",
  "/projects",
  "/about",
  "/contact",
  "/support",
  "/quote",
  "/privacy",
  "/terms",
  "/credits",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...liftCategories.map((l) => liftHref(l.slug)),
    ...services.map((s) => serviceHref(s.slug)),
    ...officeList.map((o) => officeHref(o.slug)),
  ];
  return routes.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
