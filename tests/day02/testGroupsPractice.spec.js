import { test } from "@playwright/test";

test.describe("2 test case execution", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("Get the title", async ({ page }) => {
    console.log("Title of the page is " + (await page.title())); // since the title() method returns a promise, I need to add await keyword here
  });

  test("Get the URL", async ({ page }) => {
    console.log("The URL of the page is " + page.url());
  });
});
