import {Context, NarrowedContext, Telegraf, Update} from 'telegraf';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_TOKEN: string;
      OPENAI_API_KEY: string;
      ALLOWED_USER_IDS: string;
      NODE_ENV: 'development' | 'production';
    }
  }

  type BotInstance = Telegraf<Context<Update>>;
  type BotOnMessageContext = NarrowedContext<
    Context<Update>,
    Update.MessageUpdate<
      Record<'text', {}> & Message.TextMessage & AddOptionalKeys<never>
    >
  >;
}

export {};
