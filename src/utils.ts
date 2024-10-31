// @ts-ignore
import { DOMParser } from "jsr:@b-fuze/deno-dom";

type TUrl = `https://${string}` | string | "";

const AVG_WORDS_PER_MINUTES: number = 200 as const;

const welcomeMsg = (): void => {
  console.log(`📖 Find out how long it will take to read an article!\n`);
};

const promptUrl = (): TUrl => {
  let input = prompt("🌐 Please enter the URL:");

  if (!input) throw new Error("Invalid URL");

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
      throw new Error(`❌ Failed to fetch page content`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`❌ Failed to fetch page content`);
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
