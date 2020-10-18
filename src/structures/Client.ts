import { Client, Collection, Message, Snowflake } from 'discord.js';
import Settings from '../interfaces/settings';
import RegesterUtils from '../utils/Regesters';
import BaseCommand from './baseCommand';

interface Regesters {
  CommandsRegester: (client: Booster, dir: string) => Promise<void>,
  EventsRegester: (client: Booster) => Promise<void>,
}

class Booster extends Client {
  public settings: Settings;
  public commands: Collection<string, BaseCommand>;
  public aliases: Collection<string, string>;
  private regester: Regesters;

  constructor(settings: Settings = {}) {
    super({
      disableMentions: 'everyone',
      messageCacheMaxSize: 500,
    });

    this.settings = settings;

    this.commands = new Collection();

    this.aliases = new Collection();

    this.regester = RegesterUtils;

    this.on('ready', () => {
      console.log(`${this.user!.username} is ready`);
    });

    this.on('message', (message: Message) => {
      if (message.author.bot) return;
    });
  }

  public get owners() {
    if (Array.isArray(this.settings.BotOwners)) {
      const arr: Snowflake[] = [];
      this.settings.BotOwners.forEach((owner: Snowflake) => {
        if (owner.includes(' ')) {
          owner = owner.replace(/s+/g, '');
          arr.push(owner);
        } else {
          arr.push(owner);
        }
      });
      return [...arr];
    } else if (typeof this.settings.BotOwners == 'string') {
      let owner = this.settings.BotOwners; 
      if (owner.includes(' ')) {
        owner = owner.replace(/s+/g, '');
      }
      return [this.settings.BotOwners];
    }
  }

  public async ready(token: string) {
    await this.regester.CommandsRegester(this, '../commands/');
    await super.login(token);
  }
}

export default Booster;
