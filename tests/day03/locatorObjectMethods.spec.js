import { test } from "@playwright/test";

test.describe("Test Groups", () => {
  test.beforeEach(async ({ page }) => {
    page.goto("https://practice.cydeo.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });

  test("Check(): It checks the radio button and the check buttons, if they havent been checked yet", async ({
    page,
  }) => {
    // let checkboxesLink = page.locator("text=Checkboxes");
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();
    let checkbox1 = page.locator("#box1");
    await checkbox1.check();
  });

  test("Uncheck(): Check(): It checks the radio button and the check buttons, if they havent been checked yet", async ({
    page,
  }) => {
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();
    let checkbox2 = page.locator("#box2");
    await checkbox2.uncheck();
  });

  test("SelectOption(): used for dropdowns", async ({ page }) => {
    let checkboxesLink = page.getByText("Dropdown");
    await checkboxesLink.click();

    let simpleDropdown = page.locator("//select[@id='dropdown']");
    // simpleDropdown.selectOption("1"); // selecting by the value
    // simpleDropdown.selectOption({ label: "Option 1" }); // selecting by visible text
    simpleDropdown.selectOption({ index: 1 });
  });
});
