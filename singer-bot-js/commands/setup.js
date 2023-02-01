const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Replies with Manual!'),
	async execute(interaction) {
        if(interaction.channelId==CH_SINGER) {
            let isOwner = interaction.member.roles.cache.has(OWNER_ID);
            let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
            if(isOwner||isAdmin) {
                const embed = new EmbedBuilder()
                    .setColor(0xC995C1)
                    .setTitle('ตู้เพลงโมบิล~~')
                    .setDescription('Comeon comeon~ oh baby~~')
                    .setThumbnail('https://f.ptcdn.info/311/078/000/rhexx21dvhVprZrXoIrp-o.jpg')
                    .addFields(
                        { name: '/mobile', value: 'คุยกับ Mobile', inline: true  },
                        { name: '/play', value: 'Mobile จะร้องเพลงให้ฟัง', inline: true },
                        { name: '/setup', value: 'Command for Singer', inline: true },
                        { name: '/add', value: 'Add Song to Music Queue', inline: true },
                        { name: '/loop', value: 'You need to Repeat Music Queue', inline: true },
                        { name: '/volume', value: 'You need Loundness', inline: true },
                        { name: '/skip', value: 'Next Song from Music Queue', inline: true },
                        { name: '/leave', value: 'let Mobile go~~', inline: true },
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