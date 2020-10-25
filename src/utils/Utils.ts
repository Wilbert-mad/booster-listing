import { MessageEmbed } from 'discord.js';
import advertisementData from '../interfaces/advertisementData';
import Booster from '../structures/Client';
import { REGEX } from '../utils/Constants';

class Utils {
  constructor(private client: Booster) {
    this.client = client;
  }

  async ResolveAdvertisement(data: advertisementData): Promise<Object> {
    return new MessageEmbed()
      .setAuthor(this.ResolveName(data.name), data.img ? data.img : '')
      .setDescription(data.discription || 'This hase no discription available!')
      .addField('Invite', `**[${this.ResolveName(data.name)}](${data.link})**`, true)
      .setThumbnail(data.img ? data.img : '')
      .setTimestamp()
      .toJSON();
  }

  ResolveName(str: string): string {
    return str.replace(REGEX.SEPARATOR, ' ');
  }

  createID(cerrentID: number): string {
    cerrentID++
    return cerrentID.toString().padStart(3, '0');
  }
}

export default Utils;