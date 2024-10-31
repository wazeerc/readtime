//@ts-nocheck
/// <reference lib="deno.ns" />
import * as utils from "./utils.ts";
import { TEXT_STRINGS } from "./constants.ts";

const { welcomeMsg, promptUrl, fetchPageContent, parsePageContent, calculateReadTime } = utils;

export const main = async (targetUrl?: string) => {
  try {
    welcomeMsg();

    if (!targetUrl) targetUrl = promptUrl();

    const pageContent = await fetchPageContent(targetUrl);
    const parsedContent = parsePageContent(pageContent);

    const readTime = calculateReadTime(parsedContent);
    console.log(TEXT_STRINGS.READ_TIME.replace("{readTime}", readTime.toString()));
    return readTime;
  } catch (error) {
    console.error(error);
  }
};

import.meta.main && main();
