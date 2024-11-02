// @ts-nocheck
import { assertEquals, assertThrows } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import {
  TUrl,
  welcomeMsg,
  promptUrl,
  fetchPageContent,
  parsePageContent,
  calculateReadTime,
} from "../src/utils.ts";
import { TEXT_STRINGS } from "../src/constants.ts";

const fakeUrl: TUrl = "https://example.com" as string;

//#region Tests: welcomeMsg
Deno.test("welcomeMsg should log the correct message", () => {
  let output = "";
  console.log = msg => (output = msg);

  welcomeMsg();

  assertEquals(output, TEXT_STRINGS.WELCOME_MSG);
});
//#endregion

//#region Tests: promptUrl
// Mock prompt function
const originalPrompt = globalThis.prompt;

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

Deno.test("promptUrl should return a secure URL if input does not start with https", () => {
  globalThis.prompt = () => "example.com";

  const result = promptUrl();
  assertEquals(result, fakeUrl);
});

Deno.test("promptUrl should return a secure URL if input does start with http", () => {
  globalThis.prompt = () => "http://example.com";

  const result = promptUrl();
  assertEquals(result, fakeUrl);
});

Deno.test("promptUrl should return the input if it is a secure URL", () => {
  globalThis.prompt = () => fakeUrl;

  const result = promptUrl();
  assertEquals(result, fakeUrl);
});

// Restore prompt function
globalThis.prompt = originalPrompt;
//#endregion

//#region Tests: fetchPageContent
Deno.test(
  "fetchPageContent should make a fetch request using the provided URL and return the correct text content",
  async () => {
    const testUrl = fakeUrl;
    const testUrlTextSample = "Example Domain";

    const text = await fetchPageContent(testUrl);

    assertEquals(text.includes(testUrlTextSample), true);
  },
);

Deno.test("fetchPageContent should throw an error when given an invalid URL", async () => {
  const invalidUrl = "https://example.fake";

  try {
    await fetchPageContent(invalidUrl);
    throw new Error("Expected error was not thrown");
  } catch (error) {
    assertEquals(error.message, TEXT_STRINGS.FAILED_FETCH_PAGE_CONTENT);
  }
});

Deno.test(
  "fetchPageContent should throw an error when fetch returns a non-ok response",
  async () => {
    // Mock fetch to return a non-ok response
    const originalFetch = globalThis.fetch;
    globalThis.fetch = () =>
      Promise.resolve({
        ok: false,
        status: 404,
        text: () => Promise.resolve("Not Found"),
      });

    try {
      await fetchPageContent(fakeUrl);
      throw new Error("Expected error was not thrown");
    } catch (error) {
      assertEquals(error.message, TEXT_STRINGS.FAILED_FETCH_PAGE_CONTENT);
    }

    globalThis.fetch = originalFetch;
  },
);
//#endregion

//#region Tests: parsePageContent
Deno.test("parsePageContent should return main content if available", () => {
  let pageContent = `
    <html>
      <body>
        <main>Main content</main>
      </body>
    </html>
  `;

  let result = parsePageContent(pageContent);
  assertEquals(result, "Main content");
});

Deno.test("parsePageContent should return article content if available", () => {
  let pageContent = `
    <html>
      <body>
        <article>Article content</article>
      </body>
    </html>
  `;

  let result = parsePageContent(pageContent);
  assertEquals(result, "Article content");
});

Deno.test(
  "parsePageContent should return body content if no main or article content is available",
  () => {
    let pageContent = `
    <html>
      <body>
        Body content
      </body>
    </html>
  `;

    let result = parsePageContent(pageContent);
    assertEquals(result, "Body content");
  },
);
//#endregion

//#region Tests: calculateReadTime
Deno.test("calculateReadTime should return 0 for empty content", () => {
  let parsedPageContent = "";

  let result = calculateReadTime(parsedPageContent);
  assertEquals(result, 0);
});

Deno.test("calculateReadTime should return 1 for content with exactly 200 words", () => {
  let parsedPageContent = "word ".repeat(200).trim();

  let result = calculateReadTime(parsedPageContent);
  assertEquals(result, 1);
});
//#endregion
