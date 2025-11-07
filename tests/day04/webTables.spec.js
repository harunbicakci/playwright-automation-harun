import { expect, test } from "@playwright/test";

test("Web Table Validaitons", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  await page.getByText("Web Tables").click();
  await page.waitForTimeout(2000);

  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

  let rows = await table.locator("//tr").all(); // 9 rows
  expect(rows.length).toBe(9);

  let columns = await table.locator("//th").all();
  expect(columns.length).toBe(13);

  let cells = await table.locator("//td").all();
  expect(cells.length).toBe(104);

  for (let cell of cells) {
    console.log(await cell.textContent());
  }
});

test("Validate the Data Cells", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  await page.getByText("Web Tables").click();
  await page.waitForTimeout(2000);
  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
  let rows = await table.locator("//tr").all(); // 9 rows

  for (let row of rows) {
    let cells = await row.locator("//td").all();
    if (cells.length > 2) {
      for (let i = 1; i < cells.length - 1; i++) {
        console.log(await cells[i].textContent());
      }
      console.log("-----------------------------------");
    }
  }
});

test("Checkboxes on the table", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  await page.getByText("Web Tables").click();
  await page.waitForTimeout(2000);
  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
  let checkboxes = await table.locator("//input[@type='checkbox']").all();

  for (let checkbox of checkboxes) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
});
