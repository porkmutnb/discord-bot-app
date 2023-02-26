const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Hi!'),
	async execute(interaction, bot) {
		const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`ยินดีต้อนรับนะคะ`)
                        .setDescription(`สวัสดีค่ะ เรียกหนูทำไมคะ! ${interaction.user}.`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                await interaction.followUp({embeds: [embed]});
                setTimeout(() => interaction.deleteReply(), 3000);
	},
};