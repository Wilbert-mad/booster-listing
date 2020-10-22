import { Structures } from 'discord.js';
import MembersSchema from '../schemas/member';

export default Structures.extend('GuildMember', (Member) => {

  class BooserMember extends Member {
    async adData() {
      const data = await MembersSchema.findOne({ id: this.user.id });
      if (!data) {
        const NewMember = await MembersSchema.create({
          id: this.user.id,
        });
        NewMember.save();
        return null;
      } else {
        return data;
      }
    }
  };

  return BooserMember;
});