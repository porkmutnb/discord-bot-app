const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const MEMBER_ID = process.env.MEMBER_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for Singer!'),
	async execute(interaction) {
        if(interaction.channelId==CH_SINGER) {
            let isOwner = interaction.member.roles.cache.has(OWNER_ID);
            let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
            let ownerRole = interaction.member.guild.roles.cache.find(role => role.id === OWNER_ID);
            let adminRole = interaction.member.guild.roles.cache.find(role => role.id === ADMIN_ID);
            let memberRole = interaction.member.guild.roles.cache.find(role => role.id === MEMBER_ID);
            if(isOwner||isAdmin) {
                const embed = new EmbedBuilder()
                    .setColor(0xC995C1)
                    .setTitle('ตู้เพลงโมบิล~~')
                    .setDescription('Comeon comeon~ oh baby~~')
                    .setThumbnail('https://f.ptcdn.info/311/078/000/rhexx21dvhVprZrXoIrp-o.jpg')
                    .addFields(
                        { name: '/mobile', value: 'คุยกับ Mobile', inline: true  },
                        { name: '/play', value: 'Mobile จะร้องเพลงให้ฟัง', inline: true },
                        { name: '/loop', value: 'เล่นเพลงตามคิว', inline: true },
                        { name: '/volume', value: 'เพิ่ม-ลดเสียงเพลง', inline: true },
                        { name: '/skip', value: 'ข้ามเพลง', inline: true },
                        { name: '/leave', value: 'let Mobile go~~', inline: true },
                        { name: '/setup', value: `Command for Singer [only ${ownerRole}, ${adminRole}]`, inline: false },
                        { name: '/playlists', value: `Add Song List [only ${ownerRole}, ${adminRole}, ${memberRole}]`, inline: false },
                        { name: '/formplaylists', value: `Add Song List [only ${ownerRole}, ${adminRole}, ${memberRole}]`, inline: false },
                    )
                    .setImage('https://media.tenor.com/cxpE7X7d19gAAAAd/mobile-bnk48.gif')
                    .setTimestamp()
                    .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                await interaction.guild.channels.cache.find(i => i.id == CH_SINGER).send({ embeds: [embed] });
                await interaction.reply(`Commands is ready...`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }else {
                await interaction.reply(`ฐานันดร ไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }else {
            await interaction.reply(`Mobile รับคำสั่งได้แค่ห้อง singer-bot เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};