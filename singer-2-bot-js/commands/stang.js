const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stang')
		.setDescription('Replies with Hi!'),
	async execute(interaction) {
        let CH_SINGER_TEXT = interaction.guild.channels.cache.find(ch => ch.id === CH_SINGER);
        await interaction.reply(`อยากฟังเพลงอะไร! ${interaction.user}, บอก Stang ที่ ${CH_SINGER_TEXT} ได้นะคะ.`);
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};