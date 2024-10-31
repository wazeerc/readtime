import * as utils from "./utils.ts";

const { welcomeMsg, promptUrl, fetchPageContent, parsePageContent, calculateReadTime } = utils;

export const main = async () => {
  try {
    welcomeMsg();
    const targetUrl = promptUrl();

    const pageContent = await fetchPageContent(targetUrl);
    const parsedContent = parsePageContent(pageContent);

    const readTime = calculateReadTime(parsedContent);
    console.log(`\n⏱️  Read Time: ${readTime} minute(s).`);
  } catch (error) {
    console.error(error);
  }
};

main();
