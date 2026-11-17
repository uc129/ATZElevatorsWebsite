import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { liftCategories } from "@/content/lifts";
import { footerNav, legalNav, mainNav, supportLink } from "@/content/navigation";
import { officeList } from "@/content/offices";
import { services } from "@/content/services";

const paths = sitemap().map((e) => new URL(e.url).pathname);

describe("routes", () => {
  it("lists every lift, service and office page in the sitemap", () => {
    for (const l of liftCategories) expect(paths).toContain(`/lifts/${l.slug}`);
    for (const s of services) expect(paths).toContain(`/services/${s.slug}`);
    for (const o of officeList) expect(paths).toContain(`/contact/${o.slug}`);
  });

  it("has unique service and office slugs", () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(new Set(officeList.map((o) => o.slug)).size).toBe(officeList.length);
  });

  it("links navigation only to pages that exist", () => {
    const built = new Set([
      ...paths,
      "/careers",
      "/support/complaint",
      "/support/track",
      "/support/amc",
    ]);
    const links = [...mainNav, supportLink, ...legalNav, ...footerNav.flatMap((g) => g.links)].map(
      (l) => l.href,
    );
    for (const href of links) expect(built, href).toContain(href);
  });

  it("does not show Jamshedpur", () => {
    expect(officeList.map((o) => o.city)).not.toContain("Jamshedpur");
    expect(officeList.map((o) => o.city)).toContain("Kolkata");
  });
});
