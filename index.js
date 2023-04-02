require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const { GatewayIntentBits } = require('discord.js');
const { ActivityType } = require("discord.js");
const botcommands = require('./commands.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();

const commands = [];
const commandFiles = readdirSync('./scommands').concat(readdirSync('./commandprefix')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./scommands/${file}`);
  client.commands.set(command.name, command);
  commands.push({
    name: command.name,
    description: command.description,
  });
}

const rest = new REST({ version: '9' }).setToken(process.env.botToken);

(async () => {
  try {
    for (const guild of client.guilds.cache) {
      await rest.put(
        Routes.applicationGuildCommands(process.env.clientID, guild[0]),
        { body: commands },
      );
    }
  

    client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("Discord JS 14", {
    type: ActivityType.Streaming,
  });
});

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (!client.commands.has(commandName)) return;

  try {
    await client.commands.get(commandName).execute(interaction, options);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
  }
});

client.login(process.env.botToken);