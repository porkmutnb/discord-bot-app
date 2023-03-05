const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { loop } = require('../function/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('You loop the song')
        .addStringOption(option => option.setName("number").setDescription("0=No, 1=One song, 2=Queue song, default=2").setRequired(false)),
	async execute(interaction, bot) {
        // await loop(interaction)
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