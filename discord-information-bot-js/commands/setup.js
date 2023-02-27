const { updateLatestVideoBNK, updateLatestVideoCGM, updateLatestVideoUp2Mew } = require('../function/utilNewswire');
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('update lasted data!')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('channel update')
                .setRequired(false)),
	async execute(interaction) {
        const keyword = interaction.options.getString('keyword') || 'all'.toUpperCase();
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        const serverBoosterRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let isOwner = ownerRole==undefined ? true : interaction.member.guild.roles.cache.has(ownerRole.id);
        let isAdmin = adminRole==undefined ? true : interaction.member.guild.roles.cache.has(adminRole.id);
        let isServerBoosterRole = serverBoosterRole==undefined ? false : interaction.member.guild.roles.cache.has(serverBoosterRole.id);
        if(isOwner||isAdmin||isServerBoosterRole) {
            switch (keyword.toUpperCase()) {
                case `BNK48`:
                    await updateLatestVideoBNK(interaction.member.guild);
                    break;
                case `CGM48`:
                    await updateLatestVideoCGM(interaction.member.guild);
                    break;
                case `UP2MEW`:
                    await updateLatestVideoUp2Mew(interaction.member.guild);
                    break;
                default:
                    await updateLatestVideoBNK(interaction.member.guild);
                    await updateLatestVideoCGM(interaction.member.guild);
                    await updateLatestVideoUp2Mew(interaction.member.guild);
                    break;
            }
            await interaction.followUp(`Fetch data Success: ${keyword}`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.followUp({content: `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole==undefined ? 'Owner' : ownerRole} ${adminRole==undefined ? 'Admin' : adminRole} เท่านั้นนะคะ`})
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};