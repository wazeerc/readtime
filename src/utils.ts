//@ts-nocheck: To get rid of Deno related errors
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { AVG_WORDS_PER_MINUTES, TEXT_STRINGS } from "./constants.ts";

export type TUrl = `https://${string}` | string | "";

const welcomeMsg = (): void => {
  console.log(TEXT_STRINGS.WELCOME_MSG);
};

const promptUrl = (): TUrl => {
  const input = prompt(TEXT_STRINGS.PROMPT_URL);

  if (!input) throw new Error(TEXT_STRINGS.INVALID_URL);
  if (!input.startsWith("https://")) throw new Error(TEXT_STRINGS.INSECURE_URL);

  return input;
};

const fetchPageContent = async (url: TUrl): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(TEXT_STRINGS.FAILED_FETCH_PAGE_CONTENT);
    }
    return await response.text();
  } catch (_error) {
    throw new Error(TEXT_STRINGS.FAILED_FETCH_PAGE_CONTENT);
  }
};

const parsePageContent = (pageContent: string): string => {
  const doc = new DOMParser().parseFromString(pageContent, "text/html");

  const main = doc?.querySelector("main");
  if (main) return main.textContent;

  const article = doc?.querySelector("article");
  if (article) return article.textContent;

  return doc?.body.textContent.trim();
};

const calculateReadTime = (parsedPageContent: string): number => {
  if (!parsedPageContent || parsePageContent.length === 0) return 0;
  const numberOfWordsInPage = parsedPageContent.split(" ").length;
  return Math.ceil(numberOfWordsInPage / AVG_WORDS_PER_MINUTES);
};

export { welcomeMsg, promptUrl, fetchPageContent, parsePageContent, calculateReadTime };
