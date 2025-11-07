import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
    await page.locator("//a[@href='/frames']").click();
  });

  test("Iframe Testing", async ({ page }) => {
    await page.getByText("iFrame").click();
    let myFrame = page.frameLocator("#mce_0_ifr");
    let elementInsideTheFrame = myFrame.locator("#tinymce");

    await elementInsideTheFrame.clear(); // if the clear() method doesnt work, use this
    //await elementInsideTheFrame.press("Control+A", "delete");
    await elementInsideTheFrame.fill("Hello");
    await expect(elementInsideTheFrame).toHaveText("Hello");
  });

  test("Nested Frames Testing", async ({ page }) => {});
});
