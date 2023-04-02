module.exports = {
  name: 'ping',
  description: 'Ping the bot to check its latency',
  async execute(interaction) {
    await interaction.reply('Pinging...');
    const ping = Date.now() - interaction.createdTimestamp;
    await interaction.editReply(`Bot latency: ${ping}ms | <:Nezuko_ping:982822009224429588>`);
  },
};
