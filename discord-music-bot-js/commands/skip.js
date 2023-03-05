const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { skip } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Next song for music queue'),
	async execute(interaction, bot) {
        // await skip(interaction)
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