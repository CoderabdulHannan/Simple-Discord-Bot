module.exports = {
  name: 'help',
  description: 'List all available commands',
  execute(interaction) {
    const commandList = interaction.client.commands.map(command => `/${command.name} - ${command.description}`).join('\n');
    interaction.reply(`Here are the available commands:\n${commandList}`);
  },
};
