const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('You loop the song')
        .addStringOption(option => option.setName("number").setDescription("0=No, 1=One song, 2=Queue song, default=2").setRequired(false)),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        const string = interaction.options.getString("number");
        let volume = parseInt(string);
        volume = (isNaN(volume)) ? 2 : volume;
        const queue = client.distube.getQueue(interaction);
        if (!queue) {
            await interaction.followUp(`Stang ไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`);
        }else {
            let choice = ``;
            if(volume==1) {
                choice = `(เล่นซ้ำเพลงเดิม)`;
                client.distube.setRepeatMode(interaction, 1);
            }else if(volume==2) {
                choice = `(เล่นซ้ำคิวเพลง)`;
                client.distube.setRepeatMode(interaction, 2);
            }else {
                choice = `(เล่นจบคิว)`;
                client.distube.setRepeatMode(interaction, 0);
            }
            await interaction.followUp(`Stang รับทราบค่ะ ${choice}`);
        }
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};