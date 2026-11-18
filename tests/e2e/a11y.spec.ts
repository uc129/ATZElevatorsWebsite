import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { a11yPages } from "./routes";

test.describe("accessibility (WCAG 2.2 AA)", () => {
  for (const path of a11yPages) {
    test(`${path} has no detectable violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map(
        (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`,
      );
      expect(summary).toEqual([]);
    });
  }

  test("the open enquiry drawer has no detectable violations", async ({ page, isMobile }) => {
    test.skip(isMobile, "Covered on desktop");
    await page.goto("/");
    await page.getByRole("banner").getByRole("link", { name: "Get a quote" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page }).include("dialog").analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
