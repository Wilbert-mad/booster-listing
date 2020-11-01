import { Message } from 'discord.js';
import memberShema from '../interfaces/membersShema';
import BaseCommand from '../structures/baseCommand';
import Booster from '../structures/Client';

class Bump extends BaseCommand {
  constructor() {
    super('bump', {
      aliases: ['bp'],
      description: 'Bump your advertisement(s) to the server',
      usage: '[advert-Id|name]',
    });
  }

  async run(client: Booster, message: Message, args: string[]) {
    // @ts-ignore
    const feach: memberShema = await message.member.adData();
    if (feach) {
      if (feach.advertisements.length >= 1) {
        if (!args[0]) return await message.channel.send({ embed: {
          description: 'You didn\'t mention an advertisement'
        }});
        try {
          const advertisementID = parseInt(args[0]).toString();
          const advert = feach.advertisements.find(ad => ad.adID == advertisementID);
        } catch(e) {
          const advert = feach.advertisements.find(ad => ad.name == args.join(':'));
        }
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