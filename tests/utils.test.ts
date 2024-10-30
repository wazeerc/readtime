// @ts-nocheck
import { assertEquals, assertThrows } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { welcomeMsg, promptUrl } from "../src/utils.ts";

Deno.test("welcomeMsg function tests", () => {
  Deno.test("welcomeMsg should log the correct message", () => {
    let output = "";
    console.log = msg => (output = msg);

    welcomeMsg();

    assertEquals(output, "📖 Find out how long it will take to read an article!\n");
  });
});

Deno.test("promptUrl function tests", () => {
  // Mock prompt function
  const originalPrompt = globalThis.prompt;

  Deno.test("should throw an error if input is empty", () => {
    globalThis.prompt = () => "";

    assertThrows(
      () => {
        promptUrl();
      },
      Error,
      "Invalid URL",
    );
  });

  Deno.test("should return a secure URL if input does not start with https", () => {
    globalThis.prompt = () => "example.com";

    const result = promptUrl();
    assertEquals(result, "https://example.com");
  });

  Deno.test("should return a secure URL if input does start with http", () => {
    globalThis.prompt = () => "http://example.com";

    const result = promptUrl();
    assertEquals(result, "https://example.com");
  });

  Deno.test("should return the input if it is a secure URL", () => {
    globalThis.prompt = () => "https://example.com";

    const result = promptUrl();
    assertEquals(result, "https://example.com");
  });

  globalThis.prompt = originalPrompt;
});
