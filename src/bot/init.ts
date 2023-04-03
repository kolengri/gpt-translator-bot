import {logger} from '@/utils/logger';
import {onStart} from './onStart';
import {onQuit} from './onQuit';
import {onMessage} from './onMessage';
import {Telegram} from '@/Telegram/Telegram';

export const init = async () => {
  try {
    logger.info('Bot initialization started', {
      meta: {
        env: process.env.NODE_ENV,
        allowedUserIds: JSON.parse(process.env.ALLOWED_USER_IDS ?? '[]'),
      },
    });

    const bot = new Telegram();

    bot.onStart(onStart);
    bot.onQuit(onQuit);
    bot.onMessage(onMessage);

    bot.start();

    logger.info('Bot initialization finished successfully');
    // Enable graceful stop
    process.once('SIGINT', (e) => {
      logger.error('SIGINT', e);
      bot.stop('SIGINT');
    });
    process.once('SIGTERM', (e) => {
      logger.error('SIGTERM', e);
      bot.stop('SIGTERM');
    });
  } catch (error) {
    logger.info('Bot initialization failed -', error);
  }
};
