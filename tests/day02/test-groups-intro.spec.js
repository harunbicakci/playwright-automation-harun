import { test } from "@playwright/test";

test.describe("", () => {

  test.beforeAll(async () => {
    console.log("Before all test case executed");
  });  
    
  test.beforeEach(async () => {
    console.log("Before each test case...");
  });

  test.afterEach(async () => {
    console.log("After each test case...");
  });

  test("Test Case 1", async () => {
    console.log("Test Case 1 is executed");
  });

  test("Test Case 2", async () => {
    console.log("Test Case 2 is executed");
  });

  test("Test Case 3", async () => {
    console.log("Test Case 3 is executed");
  });

  test("Test Case 4", async () => {
    console.log("Test Case 4 executed ");
  });

  test.afterAll(async () => {
    console.log("After All gets executed");
  });
});
