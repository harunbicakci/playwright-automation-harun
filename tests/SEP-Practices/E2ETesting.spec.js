import { test, expect } from "@playwright/test";
import { firstPage } from "../../pages/firstPage.js";

test("Page Elements Validation", async ({ page }) => {
  const firstPageObj = new firstPage(page);
  await page.waitForTimeout(2000);
  await firstPageObj.navigateToFirstPage();
  await firstPageObj.validateFooterLength(5);
  await firstPageObj.validateHowDidYouHearDropdown();
  await firstPageObj.fillTheFormWithValidData(
    "TestName",
    "TestLastname",
    "test@test.com",
    "4079876543"
  );
});
