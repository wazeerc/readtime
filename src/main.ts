import * as utils from "./utils.ts";

const {
  welcomeMsg,
  promptUrl,
  fetchPageContent,
  parsePageContent,
  sanitizeContent,
  calculateReadTime,
} = utils;

const main = async () => {
  try {
    welcomeMsg();
    const targetUrl = promptUrl();

    const pageContent = await fetchPageContent(targetUrl);
    const parsedContent = parsePageContent(pageContent);
    const sanitizedContent = sanitizeContent(parsedContent);

    const readTime = calculateReadTime(sanitizedContent);
    console.log(`\n⏱️  Read Time: ${readTime} minute(s).`);
  } catch (error) {
    console.error(error);
  }
};

main();
