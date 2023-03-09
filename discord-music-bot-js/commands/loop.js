const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { loop } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('You loop the song')
        .addIntegerOption(option => option.setName("number").setDescription("0=No, 1=One song, 2=Queue song, default=2").setRequired(false)),
	async execute(interaction, bot) {
        await loop(interaction)
    },
};