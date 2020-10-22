import { Message } from 'discord.js';
import BaseCommand from '../structures/baseCommand';

class Ping extends BaseCommand {
  constructor() {
    super('ping', {
      description: 'Bots server ping rate',
    });
  }

  async run(message: Message) {
    const startTime = Date.now();
    await message.channel.send('Pinging...').then(async (msg: Message) => {
      const endTime = Date.now();
      await msg.edit(`Pong \`${endTime - startTime}ms\``);
    });
  }
}

export default Ping;