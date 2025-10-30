import { test } from "@playwright/test";

test.describe("Test Groups", () => {
  test.beforeEach(async ({ page }) => {
    page.goto("https://practice.cydeo.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });

  test("InnerText(): ", async ({ page }) => {
    let headerText = await page.locator("//span[@class='h1y']").innerText();
    console.log(`Header Text is => ${headerText}`);
  });

  test("InputValue(): This method only works with <input>, <textarea>, <select> and returns the input value as a String", async ({
    page,
  }) => {
    let inputsLink = page.getByText("Inputs");
    await inputsLink.click();

    let inputsBox = page.locator("//input[@type='number']");
    await inputsBox.fill("78");
    console.log("Input Value entered is: " + (await inputsBox.inputValue()));
  });

  test("getAttribute(): It retrieves the attribute value", async ({ page }) => {
    let abTestingLink = page.getByText("A/B Testing");
    let hrefLink = await abTestingLink.getAttribute("href");
    console.log(hrefLink);
  });
});
