import { model, Schema } from 'mongoose';

export default model('members', new Schema({
  id: {
    type: String,
    required: true,
  },
  advertisements: {
    type: Array,
    default: []
  },
  advertiser: {
    type: Boolean,
    default: false
  }
}));
