const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("returns a modal."),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId(`fav-color`)
      .setTitle(`Fav color?`);

    const textInput = new TextInputBuilder()
      .setCustomId("favcolorinput")
      .setLabel(`What is your favorite color?`)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);

    const color = interaction.values["favcolorinput"];
    await interaction.reply(`Your favorite color is ${color}!`);
  },
};
