const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction) {
        let resMsg = ``;
        const embed = new EmbedBuilder()
					.setColor(0xC995C1)
					.setTitle('คำสั่งของหนูนะคะ')
					.setDescription('Command for Artist')
					.setThumbnail(`https://static.wikia.nocookie.net/thai_entertainment/images/f/f9/Pun_BNK48_Jiwaru_Days_promotional_image_%282%29.png/revision/latest?cb=20221120145113`)
					.addFields(
						{ name: '/hi', value: 'คุยกับหนู', inline: true },
						{ name: '/imagine', value: 'อยากได้ภาพอะไรบอกหนูสิ', inline: true },
						{ name: '/translate', value: `อยากได้ล่ามภาษามั้ยคะ`, inline: true },
						{ name: '/setup', value: `Command for me`, inline: false }
					)
					.setImage(`https://i.pinimg.com/originals/89/80/aa/8980aad5866ff9d7d8c42280a0e58d52.gif`)
					.setTimestamp()
					.setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        let CH_INTRODUCTION = interaction.guild.channels.cache.find(c => c.type === 0 &&  c.name === process.env.CH_INTRODUCTION_NAME);
        if(CH_INTRODUCTION) {
            if(interaction.channelId==CH_INTRODUCTION.id) {
                await interaction.followUp({ embeds: [embed] });
            }else {
                await interaction.followUp({ embeds: [embed] });
                setTimeout(() => interaction.deleteReply(), 6000);
            }
        }else {
            await interaction.followUp({ embeds: [embed] });
        }
    },
};