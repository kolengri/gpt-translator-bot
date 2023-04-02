import { logger } from '@/utils/logger';
import { message } from 'telegraf/filters';
import { createTelegramBotClient } from '@/utils/createTelegramBotClient';

export const init = async () => {
  console.log(1111);
  // Path: src/bot/init.ts
  // Compare this snippet from src/bot/index.ts:
  // export * from './init';
  //
  // export * from './onMessage';
  //
  // export * from './onStart';
  //
  // export * from './onText';
  logger.info('Bot initialization started');
  const bot = createTelegramBotClient();
  logger.info('Bot initialization finished');

  bot.command('quit', async (ctx) => {
    logger.info('Bot quit command received');
    await ctx.telegram.leaveChat(ctx.message.chat.id);
    await ctx.leaveChat();
    logger.info('Bot quit command finished');
  });

  bot.on(message('text'), async (ctx) => {
    // Explicit usage
    await ctx.telegram.sendMessage(
      ctx.message.chat.id,
      `Hello ${ctx.state.role}`
    );

    // Using context shortcut
    await ctx.reply(`Hello ${ctx.state.role}`);
  });

  bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};
