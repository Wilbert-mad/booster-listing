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

console.log(client.utils.createID(0));
console.log(client.utils.createID(9));
console.log(client.utils.ResolveName('Name:here:boy'));
