import {ChatCompletionRequestMessage} from 'openai';
import {OpenAI} from '../OpenAI';

const apiKey = 'your-api-key-here';
const initialMessages: ChatCompletionRequestMessage[] = [
  {
    content: 'Hello!',
    role: 'user',
  },
];

describe(OpenAI.name, () => {
  it('OpenAI constructor throws error when no API key is defined', () => {
    expect(() => {
      const openAI = new OpenAI('');
    }).toThrowError('OPENAI_API_KEY is not defined in process.env.');
  });

  it('setInitialMessages method sets the initial messages', () => {
    const openAI = new OpenAI(apiKey);
    openAI.setInitialMessages(initialMessages);
    expect(openAI['initialMessages']).toEqual(initialMessages);
  });

  it('complete method generates chat completions', async () => {
    const openAI = new OpenAI(apiKey);
    (openAI as any).api.createChatCompletion = jest.fn().mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: 'Hello!',
              role: 'user',
            },
          },
        ],
      },
    });
    openAI.setInitialMessages(initialMessages);
    const completion = await openAI.complete({
      content: 'How are you?',
      role: 'user',
    });

    expect(completion.data.choices).toBeDefined();
    expect(completion.data.choices[0].message?.content).toBeDefined();
  });
});
