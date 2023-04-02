declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_TOKEN: string;
      OPENAI_API_KEY: string;
    }
  }
}

export {};
