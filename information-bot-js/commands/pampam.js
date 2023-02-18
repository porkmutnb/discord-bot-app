const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pampam')
		.setDescription('Replies with Hi!'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        await interaction.followUp(`แพมพาลาแพม แพม แพ่ม แพ้ม แพ่ม แพ้ม แพมมม~~~`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};