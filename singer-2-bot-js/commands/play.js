const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;

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
            let url = interaction.options.getString('url');
            if(url.includes('https://www.youtube.com')) {
                await interaction.deferReply().catch(err => {})
                let voiceChannel = interaction.member.voice.channel
                if (!voiceChannel) {
                    await interaction.followUp({content: "เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยว Stang ตามเข้าไป!"})
                    setTimeout(() => interaction.deleteReply(), 3000);
                }else {
                    const queue = client.distube.getQueue(interaction);
                    if(!queue) {
                        client.distube.voices.join(voiceChannel);
                        await client.distube.play(interaction.member.voice.channel, url);
                        const tracks = await client.player.search(url, {
                            requestedBy: interaction.user
                        }).then(x => x.tracks[0]);
                        if(tracks) { 
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
                        }else {
                            await interaction.followUp(`ไม่พบเพลงนี้บน Youtube! ${interaction.user}.`);
                            setTimeout(() => interaction.deleteReply(), 3000);
                        }
                    }else {
                        await interaction.followUp(`ตอนนี้ Stang ยังไม่สะดวก, โปรดลองใหม่ภายหลัง! ${interaction.user}.`);
                        setTimeout(() => interaction.deleteReply(), 3000);
                    }
                }
            }else {
                await interaction.reply(`ใส่เพลงที่มีบน Youtube! ${interaction.user}.`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }else {
            await interaction.reply(`Stang รับคำสั่งได้แค่ห้อง singer-2-bot เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};