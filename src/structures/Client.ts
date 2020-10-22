import { Client, Collection, Message, Snowflake } from 'discord.js';
import Settings from '../interfaces/settings';
import RegesterUtils from '../utils/Regesters';
import BaseCommand from './baseCommand';
import mongoose from 'mongoose';
import('./Members');

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
      const prefix: string = this.settings.prefix || '~';
      if (message.author.bot) return;

      const messageArray: string[] = message.content.split(' ');
      const command: string = messageArray[0];
      const args: string[] = messageArray.slice(1);

      if (!command.startsWith(prefix)) return;

      const cmd: BaseCommand | undefined = this.commands.get(command.slice(prefix.length)) || 
        this.commands.get(this.aliases.get(command.slice(prefix.length)) || '');

      if (!cmd) return;
      else {
        try {
          cmd.run(message, args);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  public get owners(): string[] {
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
    } else {
      return [];
    }
  }

  public connect(url: string) {
    mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const db = mongoose.connection;

    db.on('connected', () => {
      this.emit('dbConnected');
    });

    db.on('error', (error) => {
      this.emit('error', (error));
    });

    db.on('disconnected', () => {
      this.emit('dbDisconnect');
    });
  }

  public async ready(token: string): Promise<void> {
    await this.regester.CommandsRegester(this, '../commands/');
    await super.login(token);
  }
}

export default Booster;
