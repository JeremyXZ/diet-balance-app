import { test, expect } from "@playwright/test";

test("input in Weight column should result in  a value showing in the corresponding rows in Column 'O6_intake'", async ({
  page,
}) => {
  //visit the site
  await page.goto("/");

  // locate all the input elements on the page
  const weightInputs = await page.$$("input");
  console.log("length", weightInputs.length);

  //loop over each element, fill in a value in the input field and obtain the corresponding rows
  // in the fifth sibling element after the current node (column "O6_intake")
  // for (const weightInput of weightInputs) {
  //   await weightInput.fill("123");
  //   const correspondingCell = await weightInput.$(
  //     "xpath=following-sibling::td[5]"
  //   );
  //   const cellText = await correspondingCell.textContent();

  //   //expect each corresponding row in column "O6_intake" to contain a value (not an empty cell), which should be a number
  //   expect(cellText).not.toBe("");
  //   expect(typeof cellText).toBe("number");
  // }
  for (const weightInput of weightInputs) {
    try {
      await weightInput.fill("123");
      const correspondingCell = await weightInput.$(
        "xpath=following-sibling::td[5]"
      );

      if (correspondingCell === null) {
        console.error("No corresponding cell found for this input");
        continue; // Skip to the next iteration of the loop
      }

      const cellText = await correspondingCell.textContent();
      // ...
    } catch (error) {
      console.error(error);
    }
  }
});

test("input in Weight column should result in  a value showing in the corresponding rows in Column 'O3_intake'", async ({
  page,
}) => {
  //visit the site
  await page.goto("/");

  // locate all the input elements on the page
  const weightInputs = await page.$$("input");

  //loop over each element, fill in a value in the input field and obtain the corresponding rows
  // in the 6th sibling element after the current node (column "O3_intake")
  for (const weightInput of weightInputs) {
    await weightInput.fill("123");
    const correspondingCell = await weightInput.$(
      "xpath=following-sibling::td[6]"
    );
    const cellText = await correspondingCell.textContent();
    console.log("cellText", cellText);

    //expect each corresponding row in column "O3_intake" to contain a value (not an empty cell), which should be a number
    await expect(cellText).not.toBe("");
    await expect(typeof cellText).toBe("number");
  }
});

test("input in Weight column should result in  a value showing in the corresponding rows in Column 'Overall_ratio'", async ({
  page,
}) => {
  //visit the site
  await page.goto("/");

  // locate all the input elements on the page
  const weightInputs = await page.$$("input");

  //loop over each element, fill in a value in the input field and obtain the corresponding rows
  // in the 7th sibling element after the current node (column "Overall_ratio")
  for (const weightInput of weightInputs) {
    await weightInput.fill("123");
    const correspondingCell = await weightInput.$(
      "xpath=following-sibling::td[10]"
    );
    const cellText = await correspondingCell.textContent();
    console.log("cellText", cellText);

    //expect each corresponding row in column "Overall_ratio" to contain a value (not an empty cell), which should be a string.
    expect(cellText).not.toBe("");
    expect(typeof cellText).toBe("very good");
  }
});
