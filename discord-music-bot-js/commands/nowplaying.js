const { SlashCommandBuilder } = require("discord.js");
const { nowplaying } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('You get information about the song playing'),
	async execute(interaction, bot) {
        await nowplaying(interaction)
    },
};