import { Token } from './configs';
import Booster from './structures/Client';

const client = new Booster({
  defaultServerOwner: true
});

client.ready(Token);
