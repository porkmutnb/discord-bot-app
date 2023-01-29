const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Next song for music queue'),
	async execute(interaction, client) {
        if(interaction.channelId==CH_SINGER) {
            await interaction.deferReply().catch(err => {});
            const queue = client.distube.getQueue(interaction);
            console.log('queue.songs.length', queue.songs.length);
            if(queue.songs.length>1) {
                client.distube.skip(interaction);
                await interaction.followUp(`เล่นเพลงถัดไปสำเร็จ. ${interaction.user}`)
            }else {
                await interaction.followUp(`ไม่มีคิวเพลงแล้วน้าา~~. ${interaction.user}`)
            }
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.reply(`Mobile รับคำสั่งได้แค่ห้อง singer-bot เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};