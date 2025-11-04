import { test, expect } from "@playwright/test";

test("Bypass Authentication by embedding credentials in URL ", async ({
  page,
}) => {
  // https://username:password@www.practice.cydeo.com/
  await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");
  await page.waitForTimeout(2000);
});

test("Bypass Authentication by encoding the credentials base84 format", async ({
  page,
}) => {
  let encodedCredential = Buffer.from("admin:admin").toString("base64");
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredential}`,
  });

  await page.goto("https://practice.cydeo.com/basic_auth");
  await page.waitForTimeout(2000);
});
