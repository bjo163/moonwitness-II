import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("primary navigation leads into the core journey", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link")).toHaveCount(5);
  await expect(nav.getByRole("link", { name: "Story" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Lore" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Explore" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Archive" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Journey" })).toBeVisible();

  await nav.getByRole("link", { name: "Story" }).click();
  await expect(page).toHaveURL(/\/storytelling$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "THE STORY BEGINS HERE"
  );
});

test("Explorer search can reach a canonical entity", async ({ page }) => {
  await page.goto("/explore");

  await page.getByRole("textbox", { name: "Search MoonWitness" }).fill("era_00");
  await page.getByRole("combobox", { name: "Filter by node type" }).selectOption("ERA");
  await page.getByRole("button", { name: /SEARCH/ }).click();

  await expect(page).toHaveURL(/q=era_00/);
  await expect(page).toHaveURL(/type=ERA/);

  const entityLink = page.locator('a[href="/entity/era_00"]').first();
  await expect(entityLink).toBeVisible();
  await entityLink.click();

  await expect(page).toHaveURL(/\/entity\/era_00$/);
  await expect(page.getByText("era_00", { exact: true })).toBeVisible();
  await expect(page.getByText("RAW NODE DATA", { exact: true })).toHaveCount(0);
});

test("robots and sitemap expose public discovery surfaces", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain("/storytelling");
  expect(xml).toContain("/entity/era_00");
});

for (const route of ["/", "/storytelling", "/explore"]) {
  test(`core route ${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical"
    );

    expect(
      blocking,
      blocking
        .map(
          (violation) =>
            `${violation.id}: ${violation.help} -> ${violation.nodes
              .map((node) => node.target.join(" "))
              .join(", ")}`
        )
        .join("\n")
    ).toEqual([]);
  });
}
