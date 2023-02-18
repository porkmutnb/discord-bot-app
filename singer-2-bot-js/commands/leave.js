const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('let Stang go'),
	async execute(interaction, client) {
        if(interaction.channelId==CH_SINGER) {
            await interaction.deferReply().catch(err => {})
            const queue = client.distube.getQueue(interaction);
            if (queue) {
                await interaction.followUp(`Sayonara craw, bye bye ${interaction.user}`)
                setTimeout(() => interaction.deleteReply(), 3000);
            }
            client.distube.voices.leave(interaction);
        }else {
            await interaction.reply(`Stang รับคำสั่งได้แค่ห้อง singer-2-bot เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};