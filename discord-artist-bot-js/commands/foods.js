const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('foods')
		.setDescription('Englisg to Thai translate.')
        .addStringOption(option =>
            option.setName('food')
                .setDescription('text input')
                .setRequired(true)),
	async execute(interaction) {
        const food = interaction.options.getString('food')

    },
};