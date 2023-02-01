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
                    .setTitle('มาฟังเพลงกับสตางค์กันค่าา~~')
                    .setDescription('สุขใดไหนจะเท่า ล้วงกระเป๋าแล้วเจอสตางค์~~')
                    .setThumbnail('https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/301681576_611776160315756_869307281782684634_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHclVQQh3H1Dr3mL3Yf3yxejYWw4iDw3JuNhbDiIPDcm3GImPLQpYlinDRC9vi0eztkT52Gf3ROfD8Uy1uLqCap&_nc_ohc=kZRtYLUNlFgAX_2wqWD&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfCKh8G1gnqTAHPJrndLXDUYqJe-yR-QQT8MieeIjgYsRQ&oe=63DCCC10')
                    .addFields(
                        { name: '/stang', value: 'คุยกับ Stang', inline: true  },
                        { name: '/play', value: 'Stang จะร้องเพลงให้ฟัง', inline: true },
                        { name: '/setup', value: 'Command for Singer', inline: true },
                        { name: '/add', value: 'Add Song to Music Queue', inline: true },
                        { name: '/loop', value: 'You need to Repeat Music Queue', inline: true },
                        { name: '/volume', value: 'You need Loundness', inline: true },
                        { name: '/skip', value: 'Next Song from Music Queue', inline: true },
                        { name: '/leave', value: 'let Stang go~~', inline: true },
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