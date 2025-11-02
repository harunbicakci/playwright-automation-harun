import { test } from "@playwright/test";

test.describe("Test Cases of User Story", () => {
  test.beforeAll(async () => {
    console.log("Before each test case");
  });
  test.afterAll(async () => {
    console.log("After each test case");
  });
  test("Test Case 1", async ({ page }) => {});
  test("Test Case 2", async ({ page }) => {});
  test("Test Case 3", async ({ page }) => {});
});

test("One single Test Case", async ({ page }) => {});
