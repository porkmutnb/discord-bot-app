const { SlashCommandBuilder } = require('discord.js');
const { leave } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('let Mobile go'),
	async execute(interaction, bot) {
        await leave(interaction)
    },
};