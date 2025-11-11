import { expect } from "@playwright/test";

export class FirstPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator("[formcontrolname='firstName']");
    this.firstNameFloatingLabel = page.locator("#mat-mdc-form-field-label-0");
    this.lastNameInput = page.locator("[formcontrolname='lastName']");
    this.lastNameFloatingLabel = page.locator("#mat-mdc-form-field-label-2");
    this.emailAddressInput = page.locator("[formcontrolname='email']");
    this.emailFloatingLabel = page.locator("#mat-mdc-form-field-label-4");
    this.phoneInput = page.locator("[formcontrolname='phoneNumber']");
    this.phoneFloatingLabel = page.locator("#mat-mdc-form-field-label-6");
    this.howDidYouHearDropdown = page.locator(
      'mat-select[formcontrolname="referralSource"]'
    );
    this.howDidYouHearDropdownElements = page.locator(
      "#cdk-overlay-0 mat-option span.mdc-list-item__primary-text"
    );
    this.nextButton = page.getByText("Next");
    this.footerElementsArray = page.locator(
      "//div[@class='details-footer ng-star-inserted']/a"
    );
    this.bar = page.locator("//div[@class='row info-holder']");
    this.cydeoLogo = page.locator(".ng-star-inserted");
    this.lockLogo = page.locator(".icon-size ng-star-inserted");
    this.formFooter = page.locator(".footer-text");
    this.leftMenuText = page.getByText(" Test Automation with Selenium");
  }

  async navigateToFirstPage() {
    const ENCODED_CREDENTIALS = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
    ).toString("base64");

    await page.setExtraHTTPHeaders({
      Authorization: `Basic ${ENCODED_CREDENTIALS}`,
    });

    await page.waitForTimeout(2000);
    await page.goto("https://qa.sep.tdtm.cydeo.com/taws");
    await page.waitForTimeout(2000);

    // await page.goto(
    //   "https://automation-user:123abc@qa.sep.tdtm.cydeo.com/taws"
    // );
  }

  async fillTheFormWithValidData(firstName, lastName, email, phoneNo) {
    await this.firstNameInput.fill(firstName);
    await this.firstNameFloatingLabel.isVisible();
    await this.lastNameInput.fill(lastName);
    await this.lastNameFloatingLabel.isVisible();
    await this.emailAddressInput.fill(email);
    await this.emailFloatingLabel.isVisible();
    await this.phoneInput.fill(phoneNo);
    await expect(this.phoneFloatingLabel).toBeVisible();
  }

  async validateHowDidYouHearDropdown() {
    await this.howDidYouHearDropdown.click();

    let actualDropdownElementsArray =
      await this.howDidYouHearDropdownElements.allInnerTexts();
    let expectedDropdownElementsArray = [
      "Select One",
      "Email",
      "Facebook",
      "Google",
      "Instagram",
      "LinkedIN",
      "Twitter",
      "Referred by a friend or colleague",
      "Other",
    ];
    expect(actualDropdownElementsArray).toEqual(expectedDropdownElementsArray);
  }

  async validateFooterLength(expectedLength) {
    const actualLength = await this.footerElementsArray.count();
    expect(actualLength).toBe(expectedLength);
  }
}
