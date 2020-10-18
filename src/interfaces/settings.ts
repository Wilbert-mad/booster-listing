import { Snowflake } from 'discord.js';

interface Settings {
  // will the server owner automatically be bot admin/owner
  defaultServerOwner?: boolean,
  // bot owners
  BotOwners?: Snowflake[] | Snowflake;
}

export default Settings;
