const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'pause',
  description: 'Pause the music',
  execute(message, args) {
    const connection = getVoiceConnection(message.guild.id);
    if (!connection) return message.reply('I am not playing any music.');
    connection.pause();
    message.reply('Music paused.');
  },
};
