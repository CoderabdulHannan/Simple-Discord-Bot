const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'resume',
  description: 'Resume the music',
  execute(message, args) {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) return message.reply('I am not playing any music.');
    connection.unpause();
    message.reply('Music resumed.');
  },
};
