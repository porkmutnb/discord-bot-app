const { SlashCommandBuilder, EmbedBuilder, ChannelTypes } = require('discord.js');
const { getOnlyUsers } = require('../function/getAllMember');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction) {
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        const serverBoosterRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let isOwner = ownerRole==undefined ? true : interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = adminRole==undefined ? true : interaction.member.roles.cache.has(adminRole.id);
        let isServerBooster = adminRole==undefined ? false : interaction.member.roles.cache.has(serverBoosterRole.id);
        let resMsg = ``;
        if(isOwner||isAdmin||isServerBooster) {
            await getOnlyUsers(interaction);
            resMsg = `Commands is ready...`
        }else {
            resMsg = `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole==undefined ? 'Ownere' : ownerRole} ${adminRole==undefined ? 'Admin' : adminRole} เท่านั้นนะคะ ${interaction.user}`
        }
        const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`สวัสดีค่ะ`)
                            .setDescription(`${resMsg}`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};