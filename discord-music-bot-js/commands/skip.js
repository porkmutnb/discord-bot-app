const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { skip } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Next song for music queue'),
	async execute(interaction, bot) {
    await skip(interaction)
  },
};