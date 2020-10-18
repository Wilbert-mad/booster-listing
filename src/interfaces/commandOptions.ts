export default interface CommandOptions {
  aliases?: string[];
  guildOnly?: boolean;
  ownerOnly?: boolean;
  usage?: string | 'This command has no usage.';
  description?: string | 'Found no description for this command.';
}
