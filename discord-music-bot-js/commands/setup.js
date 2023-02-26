const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction, bot) {
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        const memberRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_MEMBER_NAME);
        const serverBooster = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let isOwner = interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = interaction.member.roles.cache.has(adminRole.id);
        let resMsg = ``;
        if(isOwner||isAdmin) {
            const embed = new EmbedBuilder()
                    .setColor(0xC995C1)
                    .setTitle('ตู้เพลงโมบิล~~')
                    .setDescription('Comeon comeon~ oh baby~~')
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahm5GFmrUM6TYVF4IDFFe7zVCg8rilXDopA&usqp=CAU')
                    .addFields(
                        { name: '/hi', value: 'คุยกับหนู', inline: true  },
                        { name: '/play', value: 'หนูจะร้องเพลงให้ฟัง', inline: true },
                        { name: '/loop', value: 'เล่นเพลงตามคิว', inline: true },
                        { name: '/volume', value: 'เพิ่ม-ลดเสียงเพลง', inline: true },
                        { name: '/skip', value: 'ข้ามเพลง', inline: true },
                        { name: '/leave', value: 'let me go~~', inline: true },
                        { name: '/setup', value: `Command for me [only ${ownerRole}, ${adminRole}]`, inline: false },
                        { name: '/playlists', value: `Add Song List [only ${ownerRole}, ${adminRole}, ${memberRole}]`, inline: false },
                        { name: '/addplaylists', value: `Add Song List [only ${ownerRole}, ${adminRole}, ${serverBooster}]`, inline: false },
                    )
                    .setImage('https://media.tenor.com/F614EKTYZngAAAAC/bnk48-mobile.gif')
                    .setTimestamp()
                    .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
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