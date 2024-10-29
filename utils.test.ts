// @ts-ignore
import { assertEquals, assertThrows } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { welcomeMsg, promptUrl } from "./utils.ts";

// Mock prompt function
const originalPrompt = globalThis.prompt;

// @ts-ignore
Deno.test("welcomeMsg should log the correct message", () => {
  let output = "";
  console.log = msg => (output = msg);

  welcomeMsg();

  assertEquals(output, "📖 Find out how long it will take to read an article!\n");
});

// @ts-ignore
Deno.test("promptUrl should throw an error if input is empty", () => {
  globalThis.prompt = () => "";

  assertThrows(
    () => {
      promptUrl();
    },
    Error,
    "Invalid URL",
  );
});

// @ts-ignore
Deno.test("promptUrl should return a secure URL if input does not start with https", () => {
  globalThis.prompt = () => "example.com";

  const result = promptUrl();
  assertEquals(result, "https://example.com");
});

// @ts-ignore
Deno.test("promptUrl should return a secure URL if input does starts with http", () => {
  globalThis.prompt = () => "http://example.com";

  const result = promptUrl();
  assertEquals(result, "https://example.com");
});

// @ts-ignore
Deno.test("promptUrl should return the input if it is a secure URL", () => {
  globalThis.prompt = () => "https://example.com";

  const result = promptUrl();
  assertEquals(result, "https://example.com");
});

// Restore original prompt function
globalThis.prompt = originalPrompt;
