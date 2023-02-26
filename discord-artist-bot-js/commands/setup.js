const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction, client) {
        let resMsg = ``;
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        let isOwner = interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = interaction.member.roles.cache.has(adminRole.id);
        if(isOwner||isAdmin) {
            const embed = new EmbedBuilder()
						.setColor(0xC995C1)
						.setTitle('คำสั่งของหนูนะคะ')
						.setDescription('Command for Artist')
						.setThumbnail(`https://static.wikia.nocookie.net/thai_entertainment/images/f/f9/Pun_BNK48_Jiwaru_Days_promotional_image_%282%29.png/revision/latest?cb=20221120145113`)
						.addFields(
							{ name: '/hi', value: 'คุยกับหนู', inline: true },
							{ name: '/imagine', value: 'อยากได้ภาพอะไรบอกหนูสิ', inline: true },
							{ name: '/translate', value: `อยากได้ล่ามภาษามั้ยคะ`, inline: true },
							{ name: '/setup', value: `Command for me [only ${ownerRole}, ${adminRole}]`, inline: false }
						)
						.setImage(`https://i.pinimg.com/originals/89/80/aa/8980aad5866ff9d7d8c42280a0e58d52.gif`)
						.setTimestamp()
						.setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({ embeds: [embed] });
        }else {
            resMsg = `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole} ${adminRole} เท่านั้นนะคะ ${interaction.user}`
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