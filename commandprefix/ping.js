module.exports = {
  name: 'ping',
  description: 'Ping!',
  async execute(interaction, options) {
    await interaction.reply('Pong!');
  },
};
