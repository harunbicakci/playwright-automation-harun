import { test } from "@playwright/test";

test("Simple Google Test", async ({ page }) => {
  await page.goto("https://www.google.com/");

  let searchBox = page.locator("//textarea[@class = 'gLFyf']"); // this has auto waiting functionality, no need for await keyword.

  //   let searchBox = page.$$("//textarea[@class = 'gLFyf']");

  // searchBox.type("Harun Bicakci");

  searchBox.fill("Harun Bicakci");
  await page.waitForTimeout(3000);

  await searchBox.press("Enter");
  await page.waitForTimeout(3000);
});

/*

<textarea jsname="yZiJbe" class="gLFyf" aria-controls="Alh6id" 
aria-owns="Alh6id" autofocus="" title="Search" value="" 
aria-label="Search" placeholder="" aria-autocomplete="both" 
aria-expanded="false" aria-haspopup="false" autocapitalize="off" 
autocomplete="off" autocorrect="off" id="APjFqb" maxlength="2048" 
name="q" role="combobox" rows="1" spellcheck="false" 
data-ved="0ahUKEwj5gImox8WQAxXnfDABHTSyE78Q39UDCA8"></textarea>

*/

//textarea[@class = 'gLFyf']

// locators =>
// await page.getByRole("button", { name: "Submit" }).click();
// await page.getByText("Welcome Back!").isVisible();
// await page.getByLabel("Username").fill("testuser");
// await page.getByPlaceholder("Enter your email").fill("user@example.com");
// await page.getByAltText("Company Logo").click();
// await page.getByTitle("Settings").click();
// await page.getByTestId("login-button").click();

//////////////////////////////////////////////////////////////////////////////////////////////////


