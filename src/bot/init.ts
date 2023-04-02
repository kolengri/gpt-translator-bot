import {logger} from '@/utils/logger';
import {message} from 'telegraf/filters';
import {createTelegramBotClient} from '@/utils/createTelegramBotClient';
import {onStart} from './onStart';
import {onQuit} from './onQuit';
import {onMessage} from './onMessage';

export const init = async () => {
  try {
    logger.info('Bot initialization started', {
      meta: {
        env: process.env.NODE_ENV,
        allowedUserIds: JSON.parse(process.env.ALLOWED_USER_IDS ?? '[]'),
      },
    });
    const bot = createTelegramBotClient();

    onStart(bot);

    onQuit(bot);

    onMessage(bot);

    bot.launch();

    logger.info('Bot initialization finished successfully');
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    logger.info('Bot initialization failed -', error);
  }
};
