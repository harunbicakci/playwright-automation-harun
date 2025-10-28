import { test } from "@playwright/test";

test("Getting the title of the page", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");

  //await page.waitForTimeout(3000);

  let actualTitle = await page.title();
  console.log(actualTitle);
});

test("Getting the current URL of the page", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");

  let actualUrl = page.url();

  console.log(actualUrl);
});

test("Set the window size", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  await page.waitForTimeout(3000);

  //   await page.setViewportSize({width: 1850, height: 1080});
  //   await page.waitForTimeout(3000);
});
