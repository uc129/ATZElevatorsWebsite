import { expect, test } from "@playwright/test";

test.describe("with motion allowed", () => {
  test("the homepage film plays when on screen and can be paused", async ({ page }) => {
    await page.goto("/");
    const video = page.locator("video").first();
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);

    await page.getByRole("button", { name: "Pause video" }).click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(page.getByRole("button", { name: "Play video" })).toBeVisible();
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the film waits for Play and the lift animation is still", async ({ page }) => {
    await page.goto("/");
    const video = page.locator("video").first();
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(page.getByRole("button", { name: "Play video" })).toBeVisible();

    const animation = await page
      .locator("#how-we-work svg g")
      .nth(1)
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe("none");
  });
});

test("the About page story: no video, photo first, then the heading and text", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("main video")).toHaveCount(0);
  const photo = page.getByRole("img", { name: /Patna seen from the top of Golghar/ });
  const heading = page.getByRole("heading", { name: "Rooted in Patna, rising with the city." });
  await expect(photo).toBeVisible();
  const photoTop = (await photo.boundingBox())!.y;
  const headingTop = (await heading.boundingBox())!.y;
  expect(headingTop).toBeGreaterThan(photoTop);
  const textTop = (await page
    .locator("#story-title ~ *, section:has(#story-title) p")
    .filter({ hasText: /was incorporated in Patna/ })
    .first()
    .boundingBox())!.y;
  expect(textTop).toBeGreaterThan(headingTop);
});

test.describe("homepage lift types move on by themselves", () => {
  // One interval is 6 s (--animate-tab-progress); allow a little over.
  const interval = 6_000;
  const selected = (page: import("@playwright/test").Page, name: string) =>
    page.locator("#lifts").getByRole("tab", { name: new RegExp(`^${name}`) });

  async function showLifts(page: import("@playwright/test").Page) {
    await page.goto("/");
    await page.locator("#lifts").scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0); // hovering pauses it
  }

  test("the next lift type is selected after one interval", async ({ page }) => {
    await showLifts(page);
    await expect(selected(page, "Passenger lifts")).toHaveAttribute("aria-selected", "true");
    await expect(selected(page, "Home lifts")).toHaveAttribute("aria-selected", "true", {
      timeout: interval + 3_000,
    });
  });

  test("choosing a lift type stops it", async ({ page }) => {
    await showLifts(page);
    await selected(page, "Hospital lifts").click();
    await page.mouse.move(0, 0);
    await expect(page.getByRole("button", { name: /Pause the list/ })).toHaveCount(0);
    await page.waitForTimeout(interval + 1_000);
    await expect(selected(page, "Hospital lifts")).toHaveAttribute("aria-selected", "true");
  });

  test("Pause holds it and Play starts it again", async ({ page }) => {
    await showLifts(page);
    await page.getByRole("button", { name: /Pause the list/ }).click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(interval + 1_000);
    await expect(selected(page, "Passenger lifts")).toHaveAttribute("aria-selected", "true");
    await page.getByRole("button", { name: /^Play: move through the list/ }).click();
    await page.mouse.move(0, 0);
    await expect(selected(page, "Home lifts")).toHaveAttribute("aria-selected", "true", {
      timeout: interval + 3_000,
    });
  });
});

test.describe("homepage lift types with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("they stay put and offer no Pause button", async ({ page }) => {
    await page.goto("/");
    await page.locator("#lifts").scrollIntoViewIfNeeded();
    await expect(page.getByRole("button", { name: /Pause the list/ })).toHaveCount(0);
    await page.waitForTimeout(7_000);
    await expect(
      page.locator("#lifts").getByRole("tab", { name: /^Passenger lifts/ }),
    ).toHaveAttribute("aria-selected", "true");
  });
});
