const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();

const SINGER_ID = process.env.SINGER_ID;
const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const MEMBER_ID = process.env.MEMBER_ID;
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('formsplaylists')
		.setDescription('formPlaylist Song for you'),
	async execute(interaction, client) {
        let isUserMemberRole = interaction.member.roles.cache.has(MEMBER_ID);
        let isOwnerRole = interaction.member.roles.cache.has(OWNER_ID);
        let isAdminRole = interaction.member.roles.cache.has(ADMIN_ID);
        if(isUserMemberRole||isOwnerRole||isAdminRole) {
            interaction.user.send(`แบบฟอร์มสำหรับทำลิสต์เพลงสำหรับเซิฟเวอร์ ${interaction.member.guild.name} => ${GOOGLE_SHEET_URL}`);
            interaction.reply(`ส่งแบบฟอร์มทำลิสต์เพลงของเซิฟเวอร์ ${interaction.member.guild.name} เรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.reply(`ฐานันดร ไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};