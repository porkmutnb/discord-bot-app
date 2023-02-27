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
                .setRequired(true)),
	async execute(interaction, client) {
        const keyword = interaction.options.getString('keyword') || 'all'.toUpperCase();
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        let isOwner = ownerRole==undefined ? true : interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = adminRole==undefined ? true : interaction.member.roles.cache.has(adminRole.id);
        if(isOwner||isAdmin) {
            switch (keyword.toUpperCase()) {
                case `BNK48`:
                    await updateLatestVideoBNK(client);
                    break;
                case `CGM48`:
                    await updateLatestVideoCGM(client);
                    break;
                case `UP2MEW`:
                    await updateLatestVideoUp2Mew(client);
                    break;
                default:
                    await updateLatestVideoBNK(client);
                    await updateLatestVideoCGM(client);
                    await updateLatestVideoUp2Mew(client);
                    break;
            }
            await interaction.followUp(`Fetch data Success: ${keyword} ${interaction.user}`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.followUp({content: `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole==undefined ? 'Owner' : ownerRole} ${adminRole==undefined ? 'Admin' : adminRole} เท่านั้นนะคะ ${interaction.user}`})
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};