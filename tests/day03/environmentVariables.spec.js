import { test, expect } from "@playwright/test";

// To create environment variables
// 1- Go to search bar on top VS Code
// 2- Search for > user settings JSON and open
// 3- Update the "playwright.env" and "terminal.integrated.env.osx" titles

test("@env-test Testing environment variables", async ({ page }) => {
  console.log(process.env.PRACTICE_USERNAME);
  console.log(process.env.PRACTICE_PASSWORD);
  console.log(`Username is ${process.env.PRACTICE_USERNAME}`);
  console.log(`Password is ${process.env.PRACTICE_PASSWORD}`);
});

test("Bypass Authentication by encoding the credentials base84 format", async ({
  page,
}) => {
  let encodedCredential = Buffer.from(
    `${process.env.PRACTICE_USERNAME}:${process.env.PRACTICE_PASSWORD}`
  ).toString("base64");
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredential}`,
  });

  await page.goto("https://practice.cydeo.com/basic_auth");
  await page.waitForTimeout(2000);
});
