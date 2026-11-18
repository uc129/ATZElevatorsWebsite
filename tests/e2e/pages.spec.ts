import { expect, test } from "@playwright/test";
import { pages } from "./routes";

test.describe("every page", () => {
  for (const path of pages) {
    test(`${path} loads with one heading and no errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/ATZ Elevators/);

      // No sideways scrolling on any page.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow).toBe(false);

      // Every image that has loaded has real pixels.
      const broken = await page.evaluate(() =>
        [...document.images]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.src),
      );
      expect(broken).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  test("an unknown page shows the 404", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "This page is not on our list.",
    );
  });

  for (const path of ["/lifts/no-such-lift", "/services/no-such-service", "/contact/jamshedpur"]) {
    // Unknown slugs of prerendered routes stream the not-found page, so the
    // status may already be 200; Next adds noindex either way (Next 16 docs,
    // not-found.md). Check what search engines and visitors actually get.
    test(`${path} shows the not-found page, marked noindex`, async ({ page }) => {
      const response = await page.goto(path);
      expect([200, 404]).toContain(response?.status());
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "This page is not on our list.",
      );
      await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
    });
  }
});
