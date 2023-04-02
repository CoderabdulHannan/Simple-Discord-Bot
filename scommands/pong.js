module.exports = {
  name: 'pong',
  description: 'Pong the bot to check its latency',
  async execute(interaction) {
    await interaction.reply('Ponging...');
    const ping = Date.now() - interaction.createdTimestamp;
    await interaction.editReply(`Bot latency: ${ping}ms | <:angryping:1080133156142850118>`);
  },
};
