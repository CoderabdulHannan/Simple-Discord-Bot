const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
const { createAudioResource, StreamType, joinVoiceChannel, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  name: 'play',
  description: 'Play a song from YouTube',
  async execute(message, args) {
    if (!args.length) return message.reply('You need to provide a search query.');
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to play music.');
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    const searchQuery = args.join(' ');
    const results = await youtubeSearch(searchQuery, opts);
    const videoUrl = `https://www.youtube.com/watch?v=${results[0].id}`;
    const stream = ytdl(videoUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Opus });
    const player = connection?.subscribe(resource);
    player?.on(AudioPlayerStatus.Idle, () => {
      connection?.destroy();
    });
    message.reply(`Now playing: ${results[0].title}`);
  },
};
