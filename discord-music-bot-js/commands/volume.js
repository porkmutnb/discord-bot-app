const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { volume } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set the music volume')
        .addStringOption(option => option.setName("number").setDescription("1-100").setRequired(true)),
	async execute(interaction, bot) {
        // await volume(interaction)
		const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`In Develop`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
		await interaction.followUp({embeds: [embed]});
		setTimeout(() => interaction.deleteReply(), 3000);
    },
};