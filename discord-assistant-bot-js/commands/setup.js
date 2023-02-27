const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { prepareServerAuthor } = require('../function/utilAssistant');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction) {
        try {
            if(interaction.member.guild.ownerId===process.env.OWNER_SERVER_ID) {
                await prepareServerAuthor(interaction.member.guild)
            }
            const serverBoosterRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
            let isServerBooster = serverBoosterRole==undefined ? false : interaction.member.roles.cache.has(serverBoosterRole.id);
            const embed = new EmbedBuilder()
                            .setColor(0xC995C1)
                            .setTitle('คำสั่งของดิชั้นนะคะ')
                            .setDescription('Command for Assistant')
                            .setThumbnail(`https://s.isanook.com/jo/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2pvLzAvdWQvNDkwLzI0NTMwMjEvYTIuanBn.jpg`)
                            .addFields(
                                { name: '/hi', value: 'คุยกับดิชั้น', inline: true },
                                { name: '/role', value: 'ต้องการ Role', inline: true },
                                { name: '/setup', value: `Command for Assistance`, inline: false },
                                { name: '/invite', value: `ต้องการ Invite your friend [only ${isServerBooster ? serverBoosterRole : 'Server Booster'}]`, inline: false }
                            )
                            .setImage(`https://img.soccersuck.com/images/2020/07/27/4b1f97632b4915d8ab8362de205127ab.gif`)
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
        } catch (error) {
            console.error('Error setup:SlashCommand:', error);
            const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`มีบางอย่างผิดพลาด, ลองใหม่ภายหลัง ${interaction.user}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};