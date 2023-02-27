const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Hi!'),
	async execute(interaction) {
                let resMsg = `สวัสดีค่ะ! มีอะไรให้รับใช้ไหมคะ ${interaction.user}.`
                const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`ยินดีต้อนรับนะคะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                await interaction.followUp({embeds: [embed]});
                setTimeout(() => interaction.deleteReply(), 3000);
	},
};