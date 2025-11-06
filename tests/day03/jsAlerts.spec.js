import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
    await page.getByText("JavaScript Alerts").click();
  });
  test("Regular Alert", async ({ page }) => {
    await page.getByText("Click for JS Alert").click();

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });

  test("Confirmation Alert", async ({ page }) => {
    await page.getByText("Click for JS Confirm").click();
    page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
  });

  test("Prompt Alert", async ({ page }) => {
    await page.getByText("Click for JS Prompt").click();
    page.on("dialog", async (dialog) => {
      await dialog.accept("JavaScript");
    });
  });
});
