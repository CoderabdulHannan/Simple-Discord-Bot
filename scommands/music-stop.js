const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'stop',
  description: 'Stop playing music',
  execute(message, args) {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) return message.reply('I am not playing any music.');
    connection.destroy();
    message.reply('Music stopped.');
  },
};
