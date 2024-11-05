type TTextStrings = {
  [key: string]: string;
};

export const TEXT_STRINGS: TTextStrings = {
  WELCOME_MSG: `📖 Find out how long it will take to read an article!\n`,
  PROMPT_URL: "🌐 Please enter the URL:",
  INVALID_URL: "❌ Invalid URL",
  FAILED_FETCH_PAGE_CONTENT: "❌ Failed to fetch page content",
  READ_TIME: `\n⏱️  Read Time: {readTime} minute(s).\n`,
  EXIT_MSG: "Press any key(s) to exit...",
};

export const AVG_WORDS_PER_MINUTES: number = 200;
