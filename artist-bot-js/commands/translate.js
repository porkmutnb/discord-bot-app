const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Englisg to Thai translate.')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('English input')
                .setRequired(true)),
	async execute(interaction, client) {
        console.log('interaction', interaction);
        await interaction.deferReply().catch(err => {});
        const keyword = interaction.options.getString('keyword')

        await interaction.followUp(`${interaction.user} is selected ${keyword} but process in construction`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};