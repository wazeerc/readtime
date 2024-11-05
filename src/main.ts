/// <reference lib="deno.ns" />
import * as utils from "./utils.ts";
import { TEXT_STRINGS } from "../src/constants.ts";

const {
  welcomeMsg,
  promptUrl,
  fetchPageContent,
  parsePageContent,
  calculateReadTime,
} = utils;

export const main = async (targetUrl?: string) => {
  try {
    welcomeMsg();

    if (!targetUrl) targetUrl = promptUrl();

    const pageContent = await fetchPageContent(targetUrl);
    const parsedContent = parsePageContent(pageContent);

    const readTime = calculateReadTime(parsedContent);
    console.log(
      TEXT_STRINGS.READ_TIME.replace("{readTime}", readTime.toString())
    );
    console.log(TEXT_STRINGS.EXIT_MSG);
    return readTime;
  } catch (error) {
    console.error(error);
  }
};

if (import.meta.main) {
  main();
  await new Promise((resolve) =>
    Deno.stdin.read(new Uint8Array(1)).then(resolve)
  );
}
