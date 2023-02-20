const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();
const { getAllMembers } = require('../function/getAllMember');

const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for Manager!'),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        let isOwner = interaction.member.roles.cache.has(OWNER_ID);
        let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
        if(isOwner||isAdmin) {
            await getAllMembers(interaction, client);
            await interaction.followUp(`Commands is ready...`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.followUp({content: `ฐานันดร ไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`})
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};