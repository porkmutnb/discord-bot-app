const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pupe')
		.setDescription('Replies with Hi!'),
	async execute(interaction) {
        await interaction.deferReply().catch(err => {});
        if(interaction.channelId==CH_INTRODUCTION_ID) {
            await interaction.followUp(`เรียกอิชั้นทำไมคะนายท่าน, คิดถึงชั้นหรอ`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.followUp(`Pupe รับคำสั่งได้แค่ห้อง introduction เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};