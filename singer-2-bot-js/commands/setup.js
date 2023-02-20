const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const MEMBER_ID = process.env.MEMBER_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for Singer-2!'),
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
                    .setTitle('มาฟังเพลงกับสตางค์กันค่าา~~')
                    .setDescription('สุขใดไหนจะเท่า ล้วงกระเป๋าแล้วเจอสตางค์~~')
                    .setThumbnail('https://static.wikia.nocookie.net/thai_entertainment/images/7/79/Stang_BNK48_Believers_promotional_image.png/revision/latest?cb=20220828195855')
                    .addFields(
                        { name: '/stang', value: 'คุยกับ Stang', inline: true  },
                        { name: '/play', value: 'Stang จะร้องเพลงให้ฟัง', inline: true },
                        { name: '/loop', value: 'เล่นเพลงตามคิว', inline: true },
                        { name: '/volume', value: 'เพิ่ม-ลดเสียงเพลง', inline: true },
                        { name: '/skip', value: 'ข้ามเพลง', inline: true },
                        { name: '/leave', value: 'let Stang go~~', inline: true },
                        { name: '/setup', value: `Command for Singer-2 [only ${ownerRole}, ${adminRole}]`, inline: false },
                        { name: '/playlists', value: `Add Song List [only ${ownerRole}, ${adminRole}, ${memberRole}]`, inline: false },
                        { name: '/formplaylists', value: `Add Song List [only ${ownerRole}, ${adminRole}, ${memberRole}]`, inline: false },
                    )
                    .setImage('https://media.tenor.com/bsUd_oflNsgAAAAC/stangbnk48-stang.gif')
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
            await interaction.reply(`Stang รับคำสั่งได้แค่ห้อง singer-2-bot เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};