const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { disconnect } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('let Mobile go'),
	async execute(interaction, bot) {
        await disconnect(interaction)
    },
};