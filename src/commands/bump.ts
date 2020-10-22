import { Message } from 'discord.js';
import memberShema from '../interfaces/membersShema';
import BaseCommand from '../structures/baseCommand';

class Bump extends BaseCommand {
  constructor() {
    super('bump', {
      aliases: ['bp'],
      description: 'Bump your advertisement(s) to the server',
      usage: '[advert-Id]',
    });
  }

  async run(message: Message, [advertID]: string[]) {
    // @ts-ignore
    const feach: memberShema = await message.member.adData();
    if (feach) {
      if (advertID && feach.advertisements.length > 0) {
        return await message.channel.send(JSON.stringify(feach));
      } else {
        return await message.channel.send({ embed: {
          description: 'You currently don\'t have any Advertisments in you profile'
        }});
      }
    } else {
      return await message.channel.send({ embed: {
        description: 'You currently don\'t have a Profile. attempt using this command again'
      }});
    }
  }
}

export default Bump;