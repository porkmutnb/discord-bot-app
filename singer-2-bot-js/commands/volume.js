const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set the music volume')
        .addStringOption(option => option.setName("number").setDescription("1-100").setRequired(true)),
	async execute(interaction, client) {
        await interaction.deferReply()
        const string = interaction.options.getString("number")
        const volume = parseInt(string)
        const queue = client.distube.getQueue(interaction);
        if (!queue) {
            await interaction.followUp(`Stang ไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`);
        }else {
            if (isNaN(volume)) {
                await interaction.followUp("Stang ไม่เข้าใจระดับเพลงของคุณค่ะ");
            }else if (volume < 1) { 
                await interaction.followUp("ปรับระดับเสียงต่ำกว่า 1 ไม่ได้นะคะ");
            }else if (volume > 100) {
                await interaction.followUp("ปรับระดับเสียงมากกว่า 100 ไม่ได้นะคะ");
            }else {
                client.distube.setVolume(interaction, volume);
                await interaction.followUp("ปรับระดับเสียงเรียบร้อย ระดับเสียงที่คุณเลือกคือ **"+volume+"**");
            }
        }
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};