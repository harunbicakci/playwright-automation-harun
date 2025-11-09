// "playwright.env": {
//     "PRACTICE_USERNAME": "admin",
//     "PRACTICE_PASSWORD": "admin",

//     "SEP_USERNAME": "automation-user",
//     "SEP_PASSWORD": "123abc",

//     "SEP_QA_URL": "https://qa.sep.tdtm.cydeo.com/taws",

//   },

//   "terminal.integrated.env.osx": {

//     "PRACTICE_USERNAME": "admin",
//     "PRACTICE_PASSWORD": "admin",

//     "SEP_USERNAME": "automation-user",
//     "SEP_PASSWORD": "123abc",

//     "SEP_QA_URL": "https://qa.sep.tdtm.cydeo.com/taws",

//   },

import { test } from "@playwright/test";

test("SEP Practice @sep", async ({ page }) => {
  CommonUI.loginToSEP(page);

  await page.waitForTimeout(3000);

  // Start Application Step:

  CommonUI.completeStartApplicationStep(
    page,
    "Muhtar",
    "Mahmut",
    "mahmut@example.com",
    "05555555555"
  );

  await page.waitForTimeout(3000);

  // Payment Plan Step:
  CommonUI.completePaymentPlanStep(page, "upfront");

  await page.waitForTimeout(3000);

  // submit payment step:

  CommonUI.completeSubmitPaymentStep(
    page,
    "4242424242424242",
    "01/30",
    "123",
    "12345"
  );

  await page.waitForTimeout(3000);
});

class CommonUI {
  static async loginToSEP(page) {
    const ENCODED_CREDENTIALS = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
    ).toString("base64");

    await page.setExtraHTTPHeaders({
      Authorization: `Basic ${ENCODED_CREDENTIALS}`,
    });

    await page.goto(`${process.env.SEP_QA_URL}`);
  }

  static async completeStartApplicationStep(
    page,
    firstName,
    lastName,
    email,
    phone
  ) {
    let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
    await firstNameInput.fill(firstName);

    let lastNameInput = page.locator("//input[@formcontrolname='lastName']");
    await lastNameInput.fill(lastName);

    let emailInput = page.locator("//input[@formcontrolname='email']");
    await emailInput.fill(email);

    let phoneInput = page.locator("//input[@formcontrolname='phoneNumber']");
    await phoneInput.fill(phone);

    let howDidYouHearAboutUsDropDown = page.locator(
      "//mat-label[text()='How did you hear about us?']"
    );
    await howDidYouHearAboutUsDropDown.click();

    await page.click(`//span[text()='Email']`);

    let nextButton1 = page.locator("//button[@type='submit']");
    await nextButton1.click();
  }

  static async completePaymentPlanStep(page, paymentPlan) {
    paymentPlan = paymentPlan.toLowerCase();

    switch (paymentPlan) {
      case "upfront":
        let upfrontPaymentPlanOption = page.locator(
          "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
        );
        await upfrontPaymentPlanOption.click();
        break;

      case "installment":
      case "installments":
        let installmentPaymentPlanOption = page.locator(
          "///mat-expansion-panel-header[@id='mat-expansion-panel-header-1']"
        );
        await installmentPaymentPlanOption.click();
        break;
    }

    let nextButton2 = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await nextButton2.click();
  }

  static async completeSubmitPaymentStep(
    page,
    cardNumber,
    expiryDate,
    securityCode,
    zipCode
  ) {
    let paymentFrame = page.frameLocator(
      "//iframe[@title='Secure payment input frame']"
    );

    let cardNumberInput = paymentFrame.locator(
      "//input[@id='Field-numberInput']"
    );
    await cardNumberInput.fill(cardNumber);

    let expiryDateInput = paymentFrame.locator(
      "//input[@id='Field-expiryInput']"
    );
    await expiryDateInput.fill(expiryDate);

    let securityCodeInput = paymentFrame.locator(
      "//input[@id='Field-cvcInput']"
    );
    await securityCodeInput.fill(securityCode);

    let zipCodeInput = paymentFrame.locator(
      "//input[@id='Field-postalCodeInput']"
    );
    await zipCodeInput.fill(zipCode);

    let termsAndConditionsCheckbox = page.locator(
      "//input[@id='defaultCheck2']"
    );
    await termsAndConditionsCheckbox.check();

    let payButton = page.locator(
      "//button[@type='button' and contains(@class, 'next-button')]"
    );
    await payButton.click();
  }
}
