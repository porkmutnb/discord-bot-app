const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getAllMembers } = require('../function/getAllMember');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction, client) {
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        let isOwner = interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = interaction.member.roles.cache.has(adminRole.id);
        let resMsg = ``;
        if(isOwner||isAdmin) {
            await getAllMembers(interaction, client);
            resMsg = `Commands is ready...`
        }else {
            resMsg = `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole} ${adminRole} เท่านั้นนะคะ ${interaction.user}`
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