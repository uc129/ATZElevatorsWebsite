import { expect, test, type Page } from "@playwright/test";

async function openDrawer(page: Page, isMobile: boolean) {
  const quote = isMobile
    ? page
        .getByRole("navigation", { name: "Quick contact" })
        .getByRole("link", { name: "Get a quote" })
    : page.getByRole("banner").getByRole("link", { name: "Get a quote" });
  await quote.click();
  const drawer = page.getByRole("dialog", { name: "Get a free quote" });
  await expect(drawer).toBeVisible();
  return drawer;
}

test("the quote button opens the enquiry drawer and Escape closes it", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const drawer = await openDrawer(page, isMobile);
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

test("the form explains what to fix and keeps what was typed", async ({ page, isMobile }) => {
  await page.goto("/");
  const drawer = await openDrawer(page, isMobile);

  await drawer.getByLabel("What do you need?").selectOption("amc");
  await drawer.getByLabel("Your name").fill("Test Visitor");
  await drawer.getByLabel("Mobile number").fill("12345");
  await drawer.getByRole("button", { name: "Send enquiry" }).click();

  await expect(drawer.getByRole("alert")).toContainText("Check the field marked below");
  const phone = drawer.getByLabel("Mobile number");
  await expect(phone).toHaveAttribute("aria-invalid", "true");
  await expect(phone).toBeFocused();
  await expect(drawer.getByLabel("What do you need?")).toHaveValue("amc");
  await expect(drawer.getByLabel("Your name")).toHaveValue("Test Visitor");
});

test("a valid enquiry ends with a WhatsApp message to sales", async ({ page }) => {
  await page.goto("/quote");
  const form = page.getByRole("main");
  await form.getByLabel("What do you need?").selectOption("new");
  await form.getByLabel("Lift type").selectOption("hospital");
  await form.getByLabel("City").fill("Patna");
  await form.getByLabel("Your name").fill("Test Visitor");
  await form.getByLabel("Mobile number").fill("98765 43210");
  await form.getByRole("button", { name: "Send enquiry" }).click();

  await expect(form.getByRole("status")).toContainText("Thanks, Test. One last step.");
  const whatsapp = form.getByRole("link", { name: "Send on WhatsApp" });
  const href = (await whatsapp.getAttribute("href")) ?? "";
  expect(href).toContain("https://wa.me/917257001413");
  const text = new URL(href).searchParams.get("text") ?? "";
  expect(text).toContain("Lift type: Hospital or stretcher lift");
  expect(text).toContain("Mobile: 9876543210");
});
