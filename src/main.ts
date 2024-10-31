//@ts-nocheck
/// <reference lib="deno.ns" />
import * as utils from "./utils.ts";

const { welcomeMsg, promptUrl, fetchPageContent, parsePageContent, calculateReadTime } = utils;

export const main = async (targetUrl?: string) => {
  try {
    welcomeMsg();

    if (!targetUrl) targetUrl = promptUrl();

    const pageContent = await fetchPageContent(targetUrl);
    const parsedContent = parsePageContent(pageContent);

    const readTime = calculateReadTime(parsedContent);
    console.log(`\n⏱️  Read Time: ${readTime} minute(s).`);
    return readTime;
  } catch (error) {
    console.error(error);
  }
};

import.meta.main && main();
