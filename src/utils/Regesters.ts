import Booster from '../structures/Client';
import BaseCommand from '../structures/baseCommand';
import { promises as fs } from 'fs';
import path from 'path';

async function CommandsRegester(client: Booster, dir: string = '') {
  const filePath = path.join(__dirname, dir);
  const files: string[] = await fs.readdir(filePath);
  files.forEach(async(file: string, i: number) => {
    if (file.endsWith('.js')) {
      const { default: cmd } = await import(path.join(dir, file));
      const command: BaseCommand = new cmd();
      if (command instanceof BaseCommand) {
        console.log(`${i+1}: ${file.split('.js').join('')} command loaded`);
        client.commands.set(command.name, command);
        command.aliases.forEach((aliase: string) => {
          client.aliases.set(aliase, command.name);
        })
      }
    }
  });
}

async function EventsRegester(client: Booster) {

}

export default {
  CommandsRegester, 
  EventsRegester
}