import {Context} from 'telegraf';
import {logger} from '../logger';

export const restrictUsers = async (
  ctx: Context,
  next: () => Promise<void>
) => {
  const allowedUserIds = JSON.parse(process.env.ALLOWED_USER_IDS ?? '[]');
  const userId = ctx.message?.from.id;
  if (userId && allowedUserIds.includes(userId)) {
    await next();
  } else {
    logger.warn(`User ${userId} is not allowed to use this feature.`, {
      meta: {
        allowedUserIds,
      },
    });
    await ctx.reply('Sorry, you do not have access to this feature.');
  }
};
