import { Token, Mongo_URL } from './configs';
import Booster from './structures/Client';

const client = new Booster({
  defaultServerOwner: true
});

client.connect(Mongo_URL);
client.ready(Token);

client.on('dbConnected', () => {
  console.log('DB ready')
});
