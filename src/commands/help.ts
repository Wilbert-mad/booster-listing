import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../structures/baseCommand';
import Booster from '../structures/Client';

class Help extends BaseCommand {
  constructor() {
    super('help', {
      aliases: ['h']
    });
  }

  async run(client: Booster, message: Message, [command]: string[]) {
    if (command) {
      const cmd: BaseCommand | undefined = client.commands.get(command) || 
        client.commands.get(client.aliases.get(command) || '');
      
      if (!cmd) return;
      const commandHelp = new MessageEmbed()
        .setAuthor(`❯ Command ${capita(cmd.name)}`)
        .setDescription([
          `**❯❯ Description**: ${cmd.description}`,
          `**❯❯ Guild Only**: ${cmd.guildOnly ? 'Yes' : 'No'}`,
          `**❯❯ Aliase(s)**: ${cmd.aliases.length ? 
              cmd.aliases.map(a => indent(a)).join(', ') : 'No aliases found.'}`,
          `**❯❯ Usage**: ${cmd.usage}`
        ])
        .setThumbnail(client.user!.avatarURL() || '')
        .setTimestamp();

      message.channel.send(commandHelp);
    } else {
      const helpCommand = new MessageEmbed()
        .setTimestamp()
        .setThumbnail(client.user!.avatarURL() || '')
        .setFooter(`Guild prefix ${client.settings.prefix || '~'}`);
      
      if (!client.owners.includes(message.author.id)) {
        helpCommand.setDescription(client.commands.filter(cmd => !cmd.ownerOnly)
          .map(cmd => indent(cmd.name)).join(', '));
        await message.channel.send(helpCommand);
      } else {
        helpCommand.setDescription(client.commands.map(cmd => indent(cmd.name)).join(', '));
        await message.channel.send(helpCommand);
      }
    }
  }
}

const indent = (str: string): string => {
  return `\`${str}\``;
}

const capita = (str: string) => str.split(' ')
  .map(str => `${str.slice(0, 1).toUpperCase() + str.slice(1)}`)
  .join(' ');

export default Help;
