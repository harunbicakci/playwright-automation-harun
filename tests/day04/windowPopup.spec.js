import { test, expect } from "@playwright/test";

test("Window Popup Practice", async ({ page }) => {
  // create event listener for window popup
  let promisedNewPageEvent = page.waitForEvent("popup"); // 1st Step: Do NOT use AWAIT keyword
  await page.goto("https://practice.cydeo.com/windows");

  await page.click("text='Click Here'"); // 2nd Step
  // this action click will trigger the event
  let newPage = await promisedNewPageEvent; // 3rd Step: Wait for it to resolve

  await page.waitForTimeout(2000);
  console.log(await newPage.title());
  await expect(newPage).toHaveTitle("New Window");
  await expect(page).toHaveTitle("Windows");

  await page.bringToFront();
  let firstWindowElement = page.getByText("Opening a new window");
  expect(firstWindowElement).toBeVisible();

  await newPage.bringToFront();
  let secondPageElement = newPage.getByText("New Window");
  await expect(secondPageElement).toBeVisible();
});
