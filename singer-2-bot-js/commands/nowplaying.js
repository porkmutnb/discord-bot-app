const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const SINGER_ID = process.env.SINGER_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('You get information about the song playing'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        const queue = client.distube.getQueue(interaction);
        if (!queue) {
            await interaction.followUp(`Stang ไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`).catch(err => {});
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            const singerBot = interaction.member.guild.members.cache.find(m => m.id===SINGER_ID);
            const username = queue.songs[0].user==undefined ? singerBot.user.username : queue.songs[0].user;
            const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 20);
            const embed = new EmbedBuilder()
                        .setColor('#C995C1')
                        .setImage(`${queue.songs[0].thumbnail}`)
                        .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .addFields({ name: 'Music Author:', value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true })
                        .addFields({ name: 'Member:', value: `${username}`, inline: true })
                        .addFields({ name: 'Voice:', value: `${queue.volume}%`, inline: true })
                        .addFields({ name: 'Views:', value: `${queue.songs[0].views}`, inline: true })
                        .addFields({ name: 'Like:', value: `${queue.songs[0].likes}`, inline: true })
                        .addFields({ name: 'Filtre:', value: `${queue.filters.names.join(', ') || "Normal"}`, inline: true })
                        .addFields({ name: `Video Time: **[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]**`, value: ` ${'<:circle:1033057941647016056>'.repeat(part) + '🎵' + '<:asd:1033046466438107158>'.repeat(20 - part)}`, inline: false })
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 10000);
        }
    },
};