import { Message } from 'discord.js';
import CommandOptions from '../interfaces/commandOptions';

class BaseCommand {
  public name: string;
  public aliases: string[];
  public guildOnly: boolean;
  public ownerOnly: boolean;
  public usage: string;
  public description: string

  constructor(name: string, options: CommandOptions = {}) {
    this.name = name;
    this.aliases = options.aliases || [];
    this.guildOnly = options.guildOnly || true;
    this.ownerOnly = options.ownerOnly || false;
    this.usage = options.usage || 'This command has no usage.';
    this.description = options.description || 'Found no description for this command.';
  }

  // @ts-ignore
  run(message: Message, args: string[] ) {
    throw new Error(`\'${this.name}\' has no run function`);
  }
}

export default BaseCommand;