import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test("File Download Practice", async ({ page }) => {
  let promisedDownloadEvent = page.waitForEvent("download"); // create event listener for download

  await page.goto("https://practice.cydeo.com/download");

  await page.click("text='images.jpeg'"); // triggers the download event

  let download = await promisedDownloadEvent;

  let downloadPath = path.join(
    __dirname,
    "./downloads",
    download.suggestedFilename()
  );

  await download.saveAs(downloadPath);

  expect(fs.existsSync(downloadPath)).toBeTruthy();
});

test("File Upload Practice", async ({ page }) => {});
