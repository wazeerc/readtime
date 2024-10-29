import { welcomeMsg } from "./utils.ts";
// @ts-ignore
import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";

// @ts-ignore
Deno.test("welcomeMsg should log the correct message", () => {
  let output = "";
  const originalConsoleLog = console.log;
  console.log = msg => (output = msg);

  welcomeMsg();

  assertEquals(output, "📖 Find out how long it will take to read an article!\n");

  // Restore console.log
  console.log = originalConsoleLog;
});
