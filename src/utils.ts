// @ts-ignore
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { AVG_WORDS_PER_MINUTES, TEXT_STRINGS } from "./constants.ts";

type TUrl = `https://${string}` | string | "";

const welcomeMsg = (): void => {
  console.log(TEXT_STRINGS.WELCOME_MSG);
};

const promptUrl = (): TUrl => {
  let input = prompt(TEXT_STRINGS.PROMPT_URL);

  if (!input) throw new Error(TEXT_STRINGS.INVALID_URL);

  if (!input.startsWith("https://")) {
    input = input.replace(/^http:\/\//, "https://");
    if (!input.startsWith("https://")) input = `https://${input}`;
  }

  return input;
};

const fetchPageContent = async (url: TUrl): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(TEXT_STRINGS.FAILED_FETCH_PAGE_CONTENT);
    }
    return await response.text();
  } catch (error) {
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
