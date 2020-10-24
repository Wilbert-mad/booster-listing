import { Message, MessageReaction, User } from 'discord.js';
import advertisementData from '../interfaces/advertisementData';
import memberShema from '../interfaces/membersShema';
import BaseCommand from '../structures/baseCommand';
import { REGEX } from '../utils/Constants';

const separatorFyi = '(**FYI**: The \':\' are replaced with a space later but are saved as \':\')';
const changeElement = (element: string, data: advertisementData, fyi: string = ''): string => {
  return `Advertisment's ${element} hase been formated to \`${data.name}\`.${fyi?`\n${fyi}`:''}`
};

class insertAdvert extends BaseCommand {
  constructor() {
    super('insertadvert', {
      description: 'Add a advertisment to your profile list',
      aliases: ['addasvert', 'addad'],
      usage: '<...advertData>',
    });
  }

  async run(message: Message) {
    // @ts-ignore
    const feach: memberShema = await message.member.adData();
    if (feach) {
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
          let data: advertisementData = {
            embeded: false,
            discription: '',
            name: '',
            adID: ''
          }
          const messagePlacer = await message.channel.send('What would you like to name your advertisment? e.g: \`name: <name-here>\`');
          messagePlacer;
          collector.on('collect', async (msg: Message) => {
            const commandArg = msg.content.split(new RegExp(REGEX.SPACING))[0].toLowerCase();
            const args = msg.content.split(new RegExp(REGEX.SPACING)).slice(1);

            switch (commandArg) {
              case 'name:': {
                data.name = args.join(':');
                await messagePlacer.edit(changeElement('name', data, separatorFyi));
                setTimeout(async() => await messagePlacer.edit('What conent would you like your advert to contan? e.g: \`discription: <..content>\`'), 3000)
                break;
              }

              case 'discription:': {
                if (args.length > 2048) 
                  return message.reply('Your discription is way to long!');
                const content = args.join(':');
                data.discription = content;
                await messagePlacer.edit(changeElement('discription', data, separatorFyi));
                break;
              }

              case 'done': {
                if (feach.advertisements.length <= 0) {
                  data.adID = '0';
                  feach.advertisements.push(data);
                  await feach.save();
                }
                console.log(feach.advertisements.length);
                // console.log(feach.advertisements.find(ad => ad.adID == '0'));
                await messagePlacer.edit('Content hase been saved to database.');
                collector.stop();
                break;
              }

              case 'cancel': {
                await messagePlacer.edit('Collection ended.');
                collector.stop();
                break;
              }

              default: {
                return message.channel.send('Invalid Resopnse!');
              }
            }
            if (msg.deletable) await msg.delete({ timeout: 1000 });
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