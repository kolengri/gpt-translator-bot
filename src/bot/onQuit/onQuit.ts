import {logger} from '@/utils/logger';

export const onQuit = async (bot: BotInstance) => {
  bot.command('quit', async (ctx) => {
    logger.info('Bot quit command received');
    await ctx.telegram.leaveChat(ctx.message.chat.id);
    await ctx.leaveChat();
    logger.info('Bot quit command finished');
  });
};
