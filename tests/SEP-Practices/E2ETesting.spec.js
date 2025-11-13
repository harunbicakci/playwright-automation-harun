import { test, expect } from "@playwright/test";
// import { FirstPage } from "../../pages/firstPage.js";

test("Page Elements Validation", async ({ page }) => {
  const firstPageObj = new FirstPage(page);
  await firstPageObj.waitForTimeout(2000);
  await firstPageObj.navigateToFirstPage();
  await firstPageObj.validateFooterLength(5);
  await firstPageObj.validateHowDidYouHearDropdown();
  await firstPageObj.fillTheFormWithValidData(
    "TestName",
    "TestLastname",
    "test@test.com",
    "4079876543"
  );

  // jenkins setup
});
