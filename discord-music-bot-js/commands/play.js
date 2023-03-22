const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { play } = require('../function/player');
const ytdl = require('ytdl-core')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Join and Singer for everyone on call')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('link song Youtube or Spotify')
                .setRequired(true)),
	async execute(interaction, bot) {
        const link = interaction.options.getString('link')
        const validLink = await ytdl.validateURL(link)
        if(validLink) {
            const isSuccess = await play(interaction, [link])
            if(isSuccess) { 
                const tracks = await ytdl.getInfo(link);
                const embed = new EmbedBuilder()
                                .setColor("#C995C1")
                                .setTitle(`หนูรับทราบค่ะ`)
                                .addFields({name: "Title", value: `${tracks.videoDetails.title}`, inline: true})
                                .addFields({name: "Author", value: `${tracks.videoDetails.author.name}`, inline: true})
                                // .addFields({name: "Time", value: `${tracks.duration}`, inline: true})
                                // .addFields({name: "Views", value: `${tracks.views}`, inline: true})
                                // .addFields({name: "Thumbnail", value: "[Click]("+tracks.thumbnail+")", inline: true})
                                .addFields({name: "Video", value: "[Click]("+tracks.videoDetails.video_url+")", inline: true})
                                .setImage(`https://i.ytimg.com/vi/${tracks.videoDetails.videoId}/maxresdefault.jpg`)
                                .setTimestamp()
                                .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                await interaction.followUp({embeds: [embed]});
                setTimeout(() => interaction.deleteReply(), 10000);
            }else {
                
            }
        }else {
            const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`ไม่พบเพลงนี้นะคะ! ${interaction.user}.`)
                        .addFields({name: "Link", value: `${link}`, inline: true})
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};