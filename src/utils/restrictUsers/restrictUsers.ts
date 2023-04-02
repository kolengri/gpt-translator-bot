import {Context} from 'telegraf';

const ALLOWED_USER_IDS = JSON.parse(process.env.ALLOWED_USER_IDS ?? '[]');

export const restrictUsers = async (
  ctx: Context,
  next: () => Promise<void>
) => {
  const userId = ctx.message?.from.id;
  if (userId && ALLOWED_USER_IDS.includes(userId)) {
    await next();
  } else {
    await ctx.reply('Sorry, you do not have access to this feature.');
  }
};
