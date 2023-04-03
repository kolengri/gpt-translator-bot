import {Telegram} from '../Telegram';
import {createTelegramBotClient} from '@/utils/createTelegramBotClient';

jest.mock('@/utils/createTelegramBotClient', () => ({
  createTelegramBotClient: jest.fn(),
}));

describe(Telegram.name, () => {
  let telegram: Telegram;
  const botInstance = {
    launch: jest.fn(),
    stop: jest.fn(),
    on: jest.fn(),
    command: jest.fn(),
    action: jest.fn(),
    start: jest.fn(),
  };

  beforeEach(() => {
    // Reset the mock implementation for createTelegramBotClient
    (createTelegramBotClient as jest.Mock).mockReturnValue(botInstance);

    // Initialize a new instance of Telegram before each test
    telegram = new Telegram();
  });

  it('should create a new bot instance on initialization', () => {
    // Assert that createTelegramBotClient was called once
    expect(createTelegramBotClient).toHaveBeenCalledTimes(1);

    // Assert that the bot property was set to the mock instance returned by createTelegramBotClient
    expect(telegram.getBotInstance()).toBe(botInstance);
  });

  it('should throw an error when no bot instance is created', () => {
    // Reset the mock implementation for createTelegramBotClient
    (createTelegramBotClient as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    // Assert that the constructor throws an error
    expect(() => {
      new Telegram();
    }).toThrowError();
  });

  it('should call launch method on start', () => {
    telegram.start();

    // Assert that the launch method was called on the bot instance
    expect(botInstance.launch).toHaveBeenCalled();
  });

  it('should call stop method on stop', () => {
    telegram.stop();

    // Assert that the stop method was called on the bot instance
    expect(botInstance.stop).toHaveBeenCalled();
  });

  it('should call on method on message', () => {
    const fn = jest.fn();
    telegram.onMessage(fn);

    // Assert that the on method was called on the bot instance with the correct arguments
    expect(botInstance.on).toHaveBeenCalled();
  });

  it('should call command method on command', () => {
    const command = 'test';
    const fn = jest.fn();
    telegram.onCommand(command, fn);

    // Assert that the command method was called on the bot instance with the correct arguments
    expect(botInstance.command).toHaveBeenCalledWith(command, fn as any);
  });

  it('should call action method on action', () => {
    const action = 'test';
    const fn = jest.fn();
    telegram.onAction(action, fn);

    // Assert that the action method was called on the bot instance with the correct arguments
    expect(botInstance.action).toHaveBeenCalledWith(action, fn as any);
  });

  it('should call start method on start', () => {
    const fn = jest.fn();
    telegram.onStart(fn);

    // Assert that the start method was called on the bot instance with the correct arguments
    expect(botInstance.start).toHaveBeenCalledWith(fn as any);
  });

  it('should call command method with quit on quit', () => {
    const fn = jest.fn();
    telegram.onQuit(fn);

    // Assert that the command method was called on the bot instance with the 'quit' command and the given function
    expect(botInstance.command).toHaveBeenCalledWith('quit', fn as any);
  });

  it('should call command method with help on help', () => {
    const fn = jest.fn();
    telegram.onHelp(fn);

    // Assert that the command method was called on the bot instance with the 'help' command and the given function
    expect(botInstance.command).toHaveBeenCalledWith('help', fn as any);
  });
});
