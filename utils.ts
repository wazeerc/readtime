// @ts-ignore
import { DOMParser } from "jsr:@b-fuze/deno-dom";

type TUrl = `https://${string}` | string | "";

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
  const response = await fetch(url);
  return response.text();
};

const parsePageContent = (pageContent: string): string => {
  const doc = new DOMParser().parseFromString(pageContent, "text/html");
  if (!doc) throw new Error("❌ Failed to parse document");

  const main = doc.querySelector("main");
  if (main) return main.textContent;

  const article = doc.querySelector("article");
  if (article) return article.textContent;

  return doc.body.textContent;
};

const sanitizeContent = (content: string): string => {
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  content = content.replace(/ on\w+="[^"]*"/gi, "");
  content = content.replace(/javascript:[^"]*/gi, "");
  return content;
};

const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 250;
  const words = content.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
};

export {
  welcomeMsg,
  promptUrl,
  fetchPageContent,
  parsePageContent,
  sanitizeContent,
  calculateReadTime,
};
