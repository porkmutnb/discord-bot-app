const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Want invite your friend'),
	async execute(interaction) {
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        const memberBooster = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_MEMBER_NAME);
        const serverBooster = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let = resMsg = ``
        let isOwner = interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = interaction.member.roles.cache.has(adminRole.id);
        let isMember = interaction.member.roles.cache.has(memberBooster.id);
        let isServerBooster = interaction.member.roles.cache.has(serverBooster.id);
        if(isOwner||isAdmin||isMember||isServerBooster) {
            await interaction.channel.createInvite(
                {
                    maxAge: 24 * 3600, // maximum time for the invite, in milliseconds
                    maxUses: 5 // maximum times it can be used
                },
                `Requested with command by ${interaction.user.tag}`
            ).then(invite => {
                let linkInvite = `https://discord.gg/${invite.code}`
                interaction.user.send(`คำชวนเข้าเซิฟของ ${interaction.member.guild.name} => ${linkInvite}`);
                resMsg = `ส่งคำเชิญเข้าเซิฟของ ${interaction.member.guild.name} เรียบร้อยแล้วค่ะ`
            });
        }else {
            resMsg = `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole} ${adminRole} ${memberBooster} ${serverBooster} เท่านั้นนะคะ ${interaction.user}`
        }
        const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};