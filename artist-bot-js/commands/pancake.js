const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pancake')
		.setDescription('Replies with Hi!'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        await interaction.followUp(`แพนเค้กต้องคู่กับฮันนี่ ถ้าอยากได้เราเป็นเบบี้ ต้องพูดว่า รักแพนเค้ก~~`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};