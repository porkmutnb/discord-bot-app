const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const SINGER_ID = process.env.SINGER_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Join and Singer for everyone on call')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('song Youtube link')
                .setRequired(true)),
	async execute(interaction, client) {
        if(interaction.channelId==CH_SINGER) {
            let voiceChannel = interaction.member.voice.channel
            if (!voiceChannel) {
                await interaction.reply({content: "เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยว Stang ตามเข้าไป!"})
                setTimeout(() => interaction.deleteReply(), 3000);
            }else {
                let isBotAvailable = true;
                await interaction.member.guild.channels.cache.filter(async ch => {
                    if(ch.type===2) {
                        await ch.members.forEach(m => {
                            if(m.user.bot && m.user.id==SINGER_ID) {
                                isBotAvailable = false
                            }
                        })
                    }
                })
                let url = interaction.options.getString('url');
                if(url.includes('https://www.youtube.com') || url.includes('https://open.spotify.com/')) {
                    if(isBotAvailable) {
                        client.distube.voices.join(voiceChannel);   
                    }
                    let queue = client.distube.getQueue(interaction);
                    await interaction.deferReply().catch(err => {})
                    await client.distube.play(interaction.member.voice.channel, url);
                    try {
                        const tracks = await client.player.search(url, {
                            requestedBy: interaction.user
                        }).then(x => x.tracks[0]);
                        const embed = new EmbedBuilder()
                            .addFields({name: "Title", value: `${tracks.title}`, inline: true})
                            .addFields({name: "Author", value: `${tracks.author}`, inline: true})
                            .addFields({name: "Time", value: `${tracks.duration}`, inline: true})
                            .addFields({name: "Views", value: `${tracks.views}`, inline: true})
                            .addFields({name: "Thumbnail", value: "[Click]("+tracks.thumbnail+")", inline: true})
                            .addFields({name: "Video", value: "[Click]("+tracks.url+")", inline: true})
                            .setColor("#C995C1")
                            .setImage(`${tracks.thumbnail}`);
                        await interaction.followUp({embeds: [embed]});
                        setTimeout(() => interaction.deleteReply(), 10000);
                    } catch (error) {
                        queue = client.distube.getQueue(interaction);
                        const embed = new EmbedBuilder()
                                    .addFields({name: "Title", value: `${queue.songs[0].name}`, inline: true})
                                    .addFields({name: "Author", value: `${queue.songs[0].uploader.name}`, inline: true})
                                    .addFields({name: "Time", value: `${queue.songs[0].formattedDuration}`, inline: true})
                                    .addFields({name: "Views", value: `${queue.songs[0].views}`, inline: true})
                                    .addFields({name: "Thumbnail", value: "[Click]("+queue.songs[0].thumbnail+")", inline: true})
                                    .addFields({name: "Video", value: "[Click]("+queue.songs[0].url+")", inline: true})
                                    .setColor("#C995C1")
                                    .setImage(`${queue.songs[0].thumbnail}`);
                        await interaction.followUp({embeds: [embed]});
                        setTimeout(() => interaction.deleteReply(), 10000);
                    }
                }else {
                    await interaction.reply(`ใส่เพลงที่มีบน Youtube หรือ Spotify! ${interaction.user}.`);
                    setTimeout(() => interaction.deleteReply(), 3000);
                }
            }
        }else {
            let CH_SINGER_TEXT = interaction.guild.channels.cache.find(ch => ch.id === CH_SINGER);
            await interaction.reply(`อยากฟังเพลงอะไร! ${interaction.user}, บอก Stang ที่ ${CH_SINGER_TEXT} ได้นะคะ.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};