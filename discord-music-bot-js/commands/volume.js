const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { volume } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set the music volume')
        .addIntegerOption(option => option.setName("number").setDescription("1-100").setRequired(true)),
	async execute(interaction, bot) {
        await volume(interaction)
    },
};