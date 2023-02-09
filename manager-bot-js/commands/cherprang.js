const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cherprang')
		.setDescription('Replies with Hi!'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        await interaction.followUp(`สวัสดีค่ะ, ยินดีต้อนรับนะคะ`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};