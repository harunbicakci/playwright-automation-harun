import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    page.goto("https://practice.cydeo.com/");
    // first way to check the Title
    await expect(page).toHaveTitle("Practice");
    // second way to check the Title
    expect(await page.title()).toBe("Practice");
  });

  test.afterEach(async ({ page }) => {
    //  await page.waitForTimeout(2000);
  });

  test("Verify Checkboxes are Checked", async ({ page }) => {
    page.getByText("Checkboxes").click();
    let firstCheckBox = page.locator("input#box1");
    let secondCheckBox = page.locator("input#box2");

    await firstCheckBox.check();
    await secondCheckBox.check();

    await expect(firstCheckBox).toBeChecked();
    await expect(secondCheckBox).toBeChecked();

    // -------------------------------------------------------

    expect(await firstCheckBox.isChecked()).toBeTruthy();
  });

  test("Verify Checkboxes are Unchecked", async ({ page }) => {
    page.getByText("Checkboxes").click();
    let firstCheckBox = page.locator("input#box1");
    let secondCheckBox = page.locator("input#box2");

    await firstCheckBox.uncheck();
    await secondCheckBox.uncheck();

    await expect(firstCheckBox).not.toBeChecked();
    await expect(secondCheckBox).not.toBeChecked();

    // -------------------------------------------------------

    await expect(firstCheckBox.isChecked()).toBeFalsy;
  });

  test("Verify the text of the element", async ({ page }) => {
    let headerElement = page.locator("span.h1y");
    await expect(headerElement).toHaveText("Test Automation Practice");

    // -------------------------------------------------------

    let actualText = await headerElement.innerText();
    console.log(actualText);
    expect(actualText).toEqual("Test Automation Practice");
  });
});
