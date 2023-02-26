const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Hi!'),
	async execute(interaction, bot) {
        let CH_MUSICBOT_TEXT = interaction.guild.channels.cache.find(c => c.type === 0 &&  c.name === process.env.CH_MUSICBOT_NAME);
	const embed = new EmbedBuilder()
                .setColor("#C995C1")
                .setTitle(`ยินดีต้อนรับนะคะ`)
                .setDescription(`อยากฟังเพลงอะไร! ${interaction.user}, บอกหนูได้ ที่ ${CH_MUSICBOT_TEXT} ได้นะคะ.`)
                .setTimestamp()
                .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};