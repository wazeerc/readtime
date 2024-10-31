//@ts-nocheck
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { main } from "../src/main.ts";

Deno.test("main function should display the correct read time", async () => {
  const testUrl = "https://google.com/";
  const expectedReadTime = 2;

  const readTime = await main(testUrl);

  assertEquals(readTime, expectedReadTime);
});
