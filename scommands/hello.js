module.exports = {
    data: {
        name: 'hello',
        description: 'Say hi to the user!',
    },
    async execute(interaction) {
        await interaction.reply('Hello!');
    },
};
