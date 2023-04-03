import {OpenAI} from '@/OpenAI';
import {logger} from '@/utils/logger';
import {restrictUsers} from '@/utils/restrictUsers';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import {message} from 'telegraf/filters';

const INIT_MESSAGES_PROMPT: Array<ChatCompletionRequestMessage> = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    // prettier-ignore
    content: `I want you to act as a professional translator. I will speak in any language, and I will ask you to translate to another language. If I don't prompt you with a target language, use English by default. If I ask you to change the style of the text or add something to it, do it. If there is no such request, translate it without changes. I want you to only reply with the translated sentence and nothing else; do not write explanations. My first sentence is:`,
  },
];

export const onMessage = (bot: BotInstance) => {
  bot.on(message('text'), restrictUsers, async (_ctx) => {
    const ai = new OpenAI({
      initialMessages: INIT_MESSAGES_PROMPT,
    });
    const ctx = _ctx as BotOnMessageContext;
    const {text} = ctx?.message ?? {};

    if (!text) {
      logger.info('Bot message received - no text', {meta: ctx.message});
      return;
    }

    logger.info('Bot message received', {
      meta: ctx.message,
    });

    try {
      bot.telegram.sendChatAction(ctx.chat.id, 'typing');

      logger.info('AI request started', {meta: text});
      const completions = await ai.complete({
        content: text,
        role: 'user',
      });

      logger.info('AI request finished', {meta: completions.data});
      const message = completions.data.choices[0].message;

      if (!message) {
        logger.info('AI request failed - no text in response', {
          meta: completions.data,
        });
        return;
      }

      logger.info('AI request finished successfully');
      await ctx.reply(message.content);
      logger.info('Bot message sent', {meta: message.content});
    } catch (error) {
      logger.info('AI request failed -', error);
    }
  });
};
