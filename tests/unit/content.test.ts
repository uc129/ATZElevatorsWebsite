import { describe, expect, it } from "vitest";
import { clients } from "@/content/clients";
import { company } from "@/content/company";
import { allCredits, credits, videoCreditIds } from "@/content/credits";
import {
  highlights,
  hero,
  inMotion,
  services,
  stages,
  testimonials,
  testimonialSetSize,
} from "@/content/home";
import { liftCategories } from "@/content/lifts";
import { photos } from "@/content/photos";

describe("content rules", () => {
  it("uses no statistics in marketing copy (only the founding year)", () => {
    const copy = [
      hero.lead,
      ...hero.assurances,
      ...highlights.flatMap((h) => [h.title, h.text]),
      inMotion.title,
      inMotion.text,
      ...stages.map((s) => s.text),
      ...services.map((s) => s.text),
    ].join(" ");
    const numbers = (copy.match(/\d+/g) ?? []).filter((n) => n !== String(company.founded));
    // "24×7" describes the service hours, not a statistic.
    expect(numbers.filter((n) => n !== "24" && n !== "7")).toEqual([]);
  });

  it("tells each lift's story without figures (years in words)", () => {
    for (const lift of liftCategories) {
      for (const text of [lift.history, lift.atz]) {
        expect(text.length).toBeGreaterThan(100);
        // "24×7" describes the service hours, not a statistic.
        expect((text.match(/\d+/g) ?? []).filter((n) => n !== "24" && n !== "7")).toEqual([]);
      }
    }
  });

  it("states the 2002 founding year and never 1998", () => {
    expect(company.founded).toBe(2002);
    expect(JSON.stringify({ hero, highlights, stages })).not.toContain("1998");
  });

  it("labels sample testimonials without inventing client names", () => {
    for (const t of testimonials) {
      expect(t).not.toHaveProperty("name");
    }
  });

  it("has whole sets of sample testimonials, with no figures in them", () => {
    expect(testimonials.length % testimonialSetSize).toBe(0);
    expect(testimonials.length / testimonialSetSize).toBeGreaterThan(1);
    for (const t of testimonials) expect(t.quote).not.toMatch(/\d/);
  });
});

describe("photos and credits", () => {
  it("credits every third-party photo, and every credit is used", () => {
    const used = new Set<string>();
    for (const photo of Object.values(photos)) {
      expect(credits).toHaveProperty(photo.credit);
      used.add(photo.credit);
    }
    // Film credits are used by video, not photos.
    const photoCreditIds = Object.keys(credits).filter(
      (id) => !videoCreditIds.includes(id as keyof typeof credits),
    );
    expect([...used].sort()).toEqual(photoCreditIds.sort());
    expect(allCredits).toHaveLength(Object.keys(credits).length);
    for (const c of allCredits) expect(c.asset).toMatch(/^(photos|media)\//);
  });

  it("gives every photo alt text", () => {
    for (const photo of Object.values(photos)) expect(photo.alt.length).toBeGreaterThan(10);
  });

  it("points lift categories at real photos", () => {
    for (const lift of liftCategories) {
      if (lift.photo) expect(photos).toHaveProperty(lift.photo);
    }
  });
});

describe("clients and lifts", () => {
  it("has unique client names and lift slugs", () => {
    expect(new Set(clients.map((c) => c.name)).size).toBe(clients.length);
    const slugs = liftCategories.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("shows government clients by name, not emblem", () => {
    for (const name of ["Government of Bihar", "MES"]) {
      expect(clients.find((c) => c.name === name)?.logo).toBeUndefined();
    }
  });
});
