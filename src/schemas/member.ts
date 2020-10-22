import { model, Schema, Types } from 'mongoose';

export default model('members', new Schema({
  id: {
    type: String,
    required: true,
  },
  advertisements: {
    type: [{
      type: Types.ObjectId,
      ref: 'advert',
    }],
    default: []
  },
  advertiser: {
    type: Boolean,
    default: false
  }
}));
// adID: string,
//     embeded: boolean,
//     discription: string,
//     link: string,
//     img: string