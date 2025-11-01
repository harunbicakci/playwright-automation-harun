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
await page.getByRole("button", { name: "Submit" }).click();
await page.getByText("Welcome Back!").isVisible();
await page.getByLabel("Username").fill("testuser");
await page.getByPlaceholder("Enter your email").fill("user@example.com");
await page.getByAltText("Company Logo").click();
await page.getByTitle("Settings").click();
await page.getByTestId("login-button").click();

//////////////////////////////////////////////////////////////////////////////////////////////////

// import { test, expect, request } from "@playwright/test";
// import fs from "fs";
// import { getNotesForUser } from "../../utils/dbUtils.js";

test.describe("Eligibility & Sponsorship Validation", () => {
  const basePayload = JSON.parse(
    fs.readFileSync("testData/basePayload.json", "utf8")
  );
  const apiUrl = "https://api.yourdomain.com/userNotes";

  const combinations = [
    { eligibility: 0, sponsorship: 0 },
    { eligibility: 1, sponsorship: 0 },
    { eligibility: 0, sponsorship: 1 },
    { eligibility: 1, sponsorship: 1 },
  ];

  for (const combo of combinations) {
    //Declares a test whose title includes the specific combination (so reports are clear).
    test(`Validate Notes for eligibility=${combo.eligibility}, sponsorship=${combo.sponsorship}`, async () => {
      const payload = { ...basePayload, ...combo }; // Creates a new object payload by shallow-merging basePayload and the combo flags.
      const apiContext = await request.newContext(); // Creates a fresh API request context (Playwright feature) to make HTTP calls.
      const response = await apiContext.post(apiUrl, { data: payload }); // Sends a POST request to apiUrl with the JSON body payload. Playwright serializes data to JSON and sets appropriate headers automatically.

      expect(response.status()).toBe(201);

      const dbResult = await getNotesForUser(payload.email); // Calls the DB helper to fetch persisted notes for the user identified by payload.email.
      const { eligibility_notes, sponsorship_notes } = dbResult[0]; // Destructures the first row returned to get eligibility_notes and sponsorship_notes columns.

      if (combo.eligibility === 1 && combo.sponsorship === 1) {
        // Case: both flags 1 (true). Assert both DB columns contain the payload notes.
        expect(eligibility_notes).toContain(payload.notes);
        expect(sponsorship_notes).toContain(payload.notes);
      } else if (combo.eligibility === 1 && combo.sponsorship === 0) {
        expect(eligibility_notes).toContain(payload.notes);
        expect(sponsorship_notes).toBeNull();
      } else if (combo.eligibility === 0 && combo.sponsorship === 1) {
        expect(sponsorship_notes).toContain(payload.notes);
        expect(eligibility_notes).toBeNull();
      } else {
        expect(eligibility_notes).toBeNull();
        expect(sponsorship_notes).toBeNull();
      }
    });
  }
});
