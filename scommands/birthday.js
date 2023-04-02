const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Ping someone on their birthday')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the person celebrating their birthday')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('date')
        .setDescription('The date of the person\'s birthday in YYYY-MM-DD format')
        .setRequired(true)),
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const date = interaction.options.getString('date');
    const now = new Date();
    const birthday = new Date(date);
    birthday.setFullYear(now.getFullYear());

    if (birthday < now) {
      // The birthday has already passed this year, so set it for next year
      birthday.setFullYear(now.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.round((birthday - now) / (1000 * 60 * 60 * 24));

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`🎉 ${name}'s Birthday 🎉`)
      .setDescription(`${name}'s birthday is in ${daysUntilBirthday} days!`)
      .setThumbnail('https://i.imgur.com/6Uzdd6X.png')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
