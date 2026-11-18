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
  const textTop = (await page.getByText(/was incorporated in Patna/).boundingBox())!.y;
  expect(textTop).toBeGreaterThan(headingTop);
});
