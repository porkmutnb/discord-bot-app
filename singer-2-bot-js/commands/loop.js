const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('You loop the song'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        const queue = client.distube.getQueue(interaction);
        if (!queue) {
            await interaction.followUp(`Stang ไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`);
        }else {
            client.distube.setRepeatMode(interaction, 1);
            await interaction.followUp("Stang รับทราบค่ะ");
        }
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};