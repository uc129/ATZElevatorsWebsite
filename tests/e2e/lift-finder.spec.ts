import { expect, test, type Page } from "@playwright/test";

/** Choose an answer by its visible label inside a question. */
async function choose(page: Page, question: string, answer: string) {
  await page.getByRole("group", { name: question }).getByText(answer, { exact: true }).click();
}

test.describe("Find your lift without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("answering every question shows a suggestion with reasons", async ({ page }) => {
    await page.goto("/find-your-lift");
    await choose(page, "What kind of building is it?", "Hospital or clinic");
    await choose(page, "Is there a lift there now?", "No, it needs a new lift");
    await choose(page, "What will the lift mostly carry?", "Patients on stretchers or beds");
    await page.getByLabel("How many floors, including the ground?").fill("6");
    await choose(page, "Is there room on the roof for a machine room?", "Not sure");
    await choose(page, "Which city is the building in?", "Patna");
    await page.getByRole("button", { name: "Show my lift" }).click();

    await expect(page).toHaveURL(/building=hospital/);
    await expect(page.getByRole("heading", { level: 2, name: "Hospital lifts" })).toBeVisible();
    await expect(page.getByText("You move patients on stretchers or beds")).toBeVisible();
    await expect(page.getByRole("link", { name: "ATZ in Patna" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Get a quote with these answers" }),
    ).toHaveAttribute("href", /\/quote\?need=new&liftType=hospital&floors=6&city=Patna/);
  });

  test("a submit with gaps marks the questions to answer and keeps the rest", async ({ page }) => {
    await page.goto("/find-your-lift");
    await choose(page, "What kind of building is it?", "Apartment society");
    await page.getByRole("button", { name: "Show my lift" }).click();

    await expect(page.getByRole("alert")).toHaveText("Answer the questions marked below.");
    await expect(page.getByRole("radio", { name: "Apartment society" })).toBeChecked();
    await expect(
      page.getByRole("group", { name: "Is there a lift there now?" }),
    ).toHaveAccessibleDescription("Choose an answer.");
  });

  test("maintenance skips the lift questions", async ({ page }) => {
    await page.goto("/find-your-lift");
    await choose(page, "What kind of building is it?", "Office or shop");
    await choose(page, "Is there a lift there now?", "Yes, I need maintenance or repairs");
    await choose(page, "Which city is the building in?", "Somewhere else");
    await page.getByRole("button", { name: "Show my lift" }).click();

    await expect(
      page.getByRole("heading", { level: 2, name: "You need a maintenance partner" }),
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "AMC and maintenance" }),
    ).toBeVisible();
  });

  test("Change answers reopens the form with the answers kept", async ({ page }) => {
    await page.goto(
      "/find-your-lift?building=mall&stage=new&carry=people&floors=4&roof=yes&city=ranchi",
    );
    await expect(page.getByRole("heading", { level: 2, name: "Panoramic lifts" })).toBeVisible();
    await page.getByRole("link", { name: "Change answers" }).click();
    await expect(page.getByRole("radio", { name: "Mall or hotel" })).toBeChecked();
    await expect(page.getByLabel("How many floors, including the ground?")).toHaveValue("4");
    await expect(page.getByRole("alert")).toHaveCount(0);
  });
});

const hospitalResult =
  "/find-your-lift?building=hospital&stage=new&carry=stretcher&floors=6&roof=unsure&city=patna";

test.describe("Find your lift to a pre-filled quote", () => {
  test("without JavaScript, the quote page opens filled in", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(hospitalResult);
    await page.getByRole("link", { name: "Get a quote with these answers" }).click();

    await expect(page).toHaveURL(/\/quote\?/);
    const form = page.getByRole("main");
    await expect(form.getByLabel("What do you need?")).toHaveValue("new");
    await expect(form.getByLabel("Lift type")).toHaveValue("hospital");
    await expect(form.getByLabel("Floors (incl. ground)")).toHaveValue("6");
    await expect(form.getByLabel("City")).toHaveValue("Patna");
    await expect(form.getByLabel("Anything else?")).toHaveValue(
      /installing a hospital lift at our hospital/,
    );
    await expect(form.getByLabel("Your name")).toHaveValue("");
    await context.close();
  });

  test("with JavaScript, every quote button on the result opens the drawer filled in", async ({
    page,
    isMobile,
  }) => {
    await page.goto(hospitalResult);
    await page
      .getByRole("main")
      .getByRole("link", { name: "Get a quote with these answers" })
      .click();

    const drawer = page.getByRole("dialog", { name: "Get a free quote" });
    await expect(drawer).toBeVisible();
    await expect(page).toHaveURL(hospitalResult);
    await expect(drawer.getByLabel("Lift type")).toHaveValue("hospital");
    await expect(drawer.getByLabel("Floors (incl. ground)")).toHaveValue("6");
    await expect(drawer.getByLabel("City")).toHaveValue("Patna");
    await expect(drawer.getByLabel("Anything else?")).toHaveValue(
      "Hi, I'd like to talk about installing a hospital lift at our hospital. I would be grateful if you could contact me to arrange a site visit.",
    );

    // The header (or phone bar) button knows the page's answers too.
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await headerQuote(page, isMobile).click();
    await expect(drawer.getByLabel("Lift type")).toHaveValue("hospital");
  });

  test("on other pages the header button opens the standard form", async ({ page, isMobile }) => {
    await page.goto("/about");
    await headerQuote(page, isMobile).click();
    const drawer = page.getByRole("dialog", { name: "Get a free quote" });
    await expect(drawer.getByLabel("Lift type")).toHaveValue("unsure");
    await expect(drawer.getByLabel("Floors (incl. ground)")).toHaveValue("6");
    await expect(drawer.getByLabel("Anything else?")).toHaveValue(
      "Hi, I'd like to talk about a lift for our building. I would be grateful if you could contact me at your earliest convenience.",
    );
  });

  test("lift and office pages pre-fill what they know, from any quote button", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/lifts/home");
    await page.getByRole("link", { name: "Get a quote for this lift" }).click();
    const drawer = page.getByRole("dialog", { name: "Get a free quote" });
    await expect(drawer.getByLabel("What do you need?")).toHaveValue("new");
    await expect(drawer.getByLabel("Lift type")).toHaveValue("home");
    await page.keyboard.press("Escape");
    await headerQuote(page, isMobile).click();
    await expect(drawer.getByLabel("Lift type")).toHaveValue("home");

    await page.goto("/contact/kolkata");
    await headerQuote(page, isMobile).click();
    await expect(drawer.getByLabel("City")).toHaveValue("Kolkata");
  });
});

function headerQuote(page: Page, isMobile: boolean) {
  return isMobile
    ? page
        .getByRole("navigation", { name: "Quick contact" })
        .getByRole("link", { name: "Get a quote" })
    : page.getByRole("banner").getByRole("link", { name: "Get a quote" });
}
