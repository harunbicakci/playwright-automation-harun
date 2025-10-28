import { test } from "@playwright/test";

test("Google test", async () => {
  // navigate to https://www.google.com
  await page.goto("https://www.google.com");

  // wait for 3 seconds
  await page.waitForTimeout(3000);
});
