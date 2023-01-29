const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mobile')
		.setDescription('Replies with Hi!'),
	async execute(interaction) {
        if(interaction.channelId==CH_SINGER) {
            await interaction.reply(`อยากฟังเพลงอะไร! ${interaction.user}, บอก Mobile ได้นะคะ.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.reply(`Mobile รับคำสั่งได้แค่ห้อง singer-bot เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};