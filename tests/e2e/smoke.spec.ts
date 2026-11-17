import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page renders the tagline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Keeping the world in motion.");
});

test("the quote button opens the enquiry drawer", async ({ page, isMobile }) => {
  await page.goto("/");
  const quote = isMobile
    ? page
        .getByRole("navigation", { name: "Quick contact" })
        .getByRole("link", { name: "Get a quote" })
    : page.getByRole("banner").getByRole("link", { name: "Get a quote" });
  await quote.click();
  const drawer = page.getByRole("dialog", { name: "Get a free quote" });
  await expect(drawer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

for (const path of ["/", "/quote"]) {
  test(`${path} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
