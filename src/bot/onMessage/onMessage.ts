import {createOpenAIClient} from '@/utils/createOpenAIClient';
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
    content: `I want you to act as an professional translator. I will speak on any language and I will ask you to translate to other language. If I didn’t prompt you target language use English by default. I want you to only reply the translated sentence and nothing else, do not write explanations. My first sentence is `,
  },
];

export const onMessage = (bot: BotInstance) => {
  bot.on(message('text'), restrictUsers, async (_ctx) => {
    const ctx = _ctx as BotOnMessageContext;
    const {text} = ctx?.message ?? {};
    if (!text) {
      logger.info('Bot message received - no text', {meta: ctx.message});
      return;
    }

    logger.info('Bot message received', {
      meta: ctx.message,
    });

    const aiClient = createOpenAIClient();

    logger.info('AI request started', {meta: text});

    try {
      bot.telegram.sendChatAction(ctx.chat.id, 'typing');
      const completions = await aiClient.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          ...INIT_MESSAGES_PROMPT,
          {
            content: text,
            role: 'user',
          },
        ],
        max_tokens: 1000,
        temperature: 0,
        top_p: 0.1,
      });

      logger.info('AI request finished', {meta: completions.data});
      const message = completions.data.choices[0].message;
      if (!message) {
        logger.info('AI request failed - no text in response', {
          meta: completions.data,
        });
        return;
      }

      await ctx.reply(message.content);
    } catch (error) {
      logger.info('AI request failed -', error);
    } finally {
      logger.info('AI request finished');
    }
  });
};
