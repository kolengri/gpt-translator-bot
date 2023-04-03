import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai';

export class OpenAI {
  private api: OpenAIApi;
  private initialMessages: ChatCompletionRequestMessage[] = [];

  constructor(apiKey = process.env.OPENAI_API_KEY) {
    if (!apiKey)
      throw new Error('OPENAI_API_KEY is not defined in process.env.');

    this.api = new OpenAIApi(new Configuration({apiKey}));
  }

  public setInitialMessages(messages: ChatCompletionRequestMessage[]) {
    this.initialMessages = messages;
  }

  public async complete(
    message: ChatCompletionRequestMessage,
    maxTokens: number = 64
  ) {
    const completions = await this.api.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [...this.initialMessages, message],
      max_tokens: maxTokens,
      temperature: 0,
      top_p: 0.1,
    });

    return completions;
  }
}
