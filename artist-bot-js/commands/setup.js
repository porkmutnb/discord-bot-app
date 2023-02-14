const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Replies with Hi!'),
	async execute(interaction, client) {
        console.log('interaction', interaction);
        await interaction.deferReply().catch(err => {});

        await interaction.followUp(`In construction`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};