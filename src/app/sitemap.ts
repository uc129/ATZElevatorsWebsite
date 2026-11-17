import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** Pages that exist so far. Extend as routes are added (step 6). */
const routes = ["/", "/quote"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
