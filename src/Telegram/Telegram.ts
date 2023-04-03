import {createTelegramBotClient} from '@/utils/createTelegramBotClient';
import {restrictUsers} from '@/utils/restrictUsers';
import {message} from 'telegraf/filters';

export class Telegram {
  private bot: BotInstance;

  constructor() {
    this.bot = createTelegramBotClient();
  }

  public start() {
    this.bot.launch();
  }

  public stop(signal?: string) {
    this.bot.stop(signal);
  }

  public onMessage(fn: (ctx: BotOnMessageContext) => void) {
    this.bot.on(message('text'), restrictUsers, fn as any);
  }

  public onCommand(command: string, fn: (ctx: BotOnMessageContext) => void) {
    this.bot.command(command, fn as any);
  }

  public onAction(action: string, fn: (ctx: BotOnMessageContext) => void) {
    this.bot.action(action, fn as any);
  }

  public onStart(fn: (ctx: BotOnMessageContext) => void) {
    this.bot.start(fn as any);
  }

  public onQuit(fn: (ctx: BotOnMessageContext) => void) {
    this.bot.command('quit', fn as any);
  }

  public onHelp(fn: (ctx: BotOnMessageContext) => void) {
    this.bot.command('help', fn as any);
  }

  public getBotInstance() {
    return this.bot;
  }
}
