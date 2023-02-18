const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fond')
		.setDescription('Replies with Hi!'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        await interaction.followUp(`เรียกหนูทำไมคะ, คิดถึงหนูหรอ`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};