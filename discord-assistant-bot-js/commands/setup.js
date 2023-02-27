const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction) {
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        const memberRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_MEMBER_NAME);
        const serverBoosterRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let = resMsg = ``
        let isOwner = ownerRole==undefined ? true : interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = adminRole==undefined ? true : interaction.member.roles.cache.has(adminRole.id);
        let isMember = memberRole==undefined ? true : interaction.member.roles.cache.has(memberRole.id);
        let isServerBooster = serverBooster==undefined ? false : interaction.member.roles.cache.has(serverBoosterRole.id);
        if(isOwner||isAdmin||isMember||isServerBooster) {
            const embed = new EmbedBuilder()
                            .setColor(0xC995C1)
                            .setTitle('คำสั่งของดิชั้นนะคะ')
                            .setDescription('Command for Assistant')
                            .setThumbnail(`https://s.isanook.com/jo/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2pvLzAvdWQvNDkwLzI0NTMwMjEvYTIuanBn.jpg`)
                            .addFields(
                                { name: '/hi', value: 'คุยกับดิชั้น', inline: true },
                                { name: '/role', value: 'ต้องการ Role', inline: true },
                                { name: '/setup', value: `Command for Assistance [only ${ownerRole} ${adminRole}]`, inline: false },
                                { name: '/invite', value: `ต้องการ Invite your friend [only ${ownerRole==undefined ? 'Ownere' : ownerRole} ${adminRole==undefined ? 'Admin' : adminRole} ${memberRole==undefined ? 'Member' : memberRole} ${serverBoosterRole==undefined ? 'Server Booster' : serverBoosterRole}]`, inline: false }
                            )
                            .setImage(`https://img.soccersuck.com/images/2020/07/27/4b1f97632b4915d8ab8362de205127ab.gif`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
        }else {
            resMsg = `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole==undefined ? 'Ownere' : ownerRole} ${adminRole==undefined ? 'Admin' : adminRole} ${memberRole==undefined ? 'Member' : memberRole} ${serverBoosterRole==undefined ? 'Server Booster' : serverBoosterRole} เท่านั้นนะคะ ${interaction.user}`
            const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};