import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
    await page.waitForTimeout(2000);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("Left Click", async ({ page }) => {
    await page.click("text='A/B Testing'");
  });

  test("Right Click", async ({ page }) => {
    await page.click("text='A/B Testing'", { button: "right" });
  });

  test("Hover Mouse", async ({ page }) => {
    await page.click("text='Hovers'");
    // for single emelent
    // await page.hover("//img[@alt='User Avatar']");

    // for multiple elements
    let elements = await page.locator("//img[@alt='User Avatar']").all();

    for (let each of elements) {
      await each.hover();
    }
  });
  test("Mouse Wheel Scrolling", async ({ page }) => {
    await page.mouse.wheel(0, 4000);
  });

  test("Scrolling to Specific Element", async ({ page }) => {
    let inputLink = page.getByText("Inputs");
    await inputLink.scrollIntoViewIfNeeded();
    await inputLink.click();
  });

  test("Drag and Drop", async ({ page }) => {
    await page.click("text='Drag and Drop'");
    await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']");

    let squareA = page.locator("//div[@id='column-a']");
    let squareB = page.locator("//div[@id='column-b']");
    await squareA.dragTo(squareB);
  });
});
