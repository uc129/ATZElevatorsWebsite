import { expect, test } from "@playwright/test";

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop header only");

  test("the Lifts menu opens, links to a lift and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("banner").getByRole("button", { name: "Lifts" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page
      .getByRole("link", { name: /Hospital lifts/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/lifts\/hospital$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hospital lifts");
  });

  test("main links mark the current page", async ({ page }) => {
    await page.goto("/services");
    const link = page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Services" });
    await expect(link).toHaveAttribute("aria-current", "page");
  });

  test("the skip link moves focus to the content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("phone navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Phone menu only");

  test("the menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(menu).toBeHidden();
  });

  test("the quick contact bar offers call, WhatsApp and a quote", async ({ page }) => {
    await page.goto("/");
    const bar = page.getByRole("navigation", { name: "Quick contact" });
    await expect(bar.getByRole("link", { name: "Call" })).toHaveAttribute(
      "href",
      "tel:+917257001413",
    );
    await expect(bar.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      /wa\.me\/917257001413/,
    );
  });
});

test("breadcrumbs lead back to the parent page", async ({ page }) => {
  await page.goto("/services/amc");
  await page
    .getByRole("navigation", { name: "Breadcrumb" })
    .getByRole("link", { name: "Services" })
    .click();
  await expect(page).toHaveURL(/\/services$/);
});

test("the breakdown line uses the service number", async ({ page }) => {
  await page.goto("/support");
  await expect(page.getByRole("link", { name: /Call 93341 19103/ }).first()).toHaveAttribute(
    "href",
    "tel:+919334119103",
  );
});
