//@ts-nocheck: To get rid of Deno related errors
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { main } from "../src/main.ts";
import { TEXT_STRINGS } from "../src/constants.ts";

Deno.test("main function should display the correct read time", async () => {
  const testUrl = "https://google.com/";
  const expectedReadTime = 2;

  const readTime = await main(testUrl);

  assertEquals(readTime, expectedReadTime);
});

Deno.test("main function should prompt user to exit after displaying read time", async () => {
  let output = "";
  console.log = msg => (output = msg);

  await main("https://google.com/");
  const expectedOutput = TEXT_STRINGS.EXIT_MSG;

  assertEquals(output, expectedOutput);
});
