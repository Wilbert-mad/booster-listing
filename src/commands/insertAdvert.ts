import { Message, MessageReaction, User } from 'discord.js';
import memberShema from '../interfaces/membersShema';
import BaseCommand from '../structures/baseCommand';

class insertAdvert extends BaseCommand {
  constructor() {
    super('insertadvert', {
      description: 'Add a advertisment to your profile list',
      aliases: ['addasvert', 'addad'],
      usage: '<...advertData>',
    });
  }

  async run(message: Message, args: string[]) {
    // @ts-ignore
    const feach: memberShema = message.member.adData();
    if (feach) {
      const filter = (reaction: MessageReaction, user: User) => !user.bot;
      const msgQuestin: Message = await message.channel.send('Would you like to continue creating a new advertisment?');

      // set reactions 
      await msgQuestin.react('✔');
      await msgQuestin.react('❌');
      // get first reaction
      const collected = await msgQuestin.awaitReactions((reaction: MessageReaction, user: User) => !user.bot, {
        errors: ['time'],
        time: 15000,
        max: 1,
      });

      const firstInCollection = collected.first();
      if (firstInCollection) {
        if (firstInCollection.emoji.name == '✔') {
          const collector = message.channel.createMessageCollector((msg: Message) => msg.author == message.author && !message.author.bot);
          await message.channel.send('What would you like to name your advertisment? e.g: \'name: <name-here>\'');
          collector.on('collect', (msg: Message) => {
            const commandArg = msg.content.split(new RegExp(/\s+/))[0];
            const args = msg.content.split(new RegExp(/\s+/)).slice(1);

            console.log(commandArg, args);
          });
        } else if (firstInCollection.emoji.name == '❌') {
          return await message.channel.send('You have regected the request.');
        } else {
          return await message.channel.send('There was an error evaluation your reaction try again.');
        }
      }
    } else {
      return await message.channel.send({ embed: {
        description: 'You currently don\'t have a Profile. attempt using this command again'
      }});
    }
  }
}

export default insertAdvert;