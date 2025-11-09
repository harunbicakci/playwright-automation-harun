import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("File Upload Practice", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/upload");
  await page.waitForTimeout(2000);

  const filePath = path.join(__dirname, "uploads", "TestUpload.txt");

  await page.setInputFiles("//input[@id='file-upload']", filePath);
  await page.waitForTimeout(1000);

  await page.click("//input[@id='file-submit']");

  await expect(page.getByText("File Uploaded!")).toBeVisible();
});

