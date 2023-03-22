const { getDataSongList } = require('../function/retriveDataGoogleSheet');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { play } = require('../function/player');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlists')
		.setDescription('Playlist for you')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('template name')
                .setRequired(false)),
	async execute(interaction, bot) {
        let resMsg = ``;
        let isBotAvailable = true;
        await interaction.member.guild.channels.cache.filter(async ch => {
            if(ch.type===2) {
                await ch.members.forEach(m => {
                    if(m.user.bot && m.user.id==process.env.CLIENT_ID) {
                        isBotAvailable = false
                    }
                })
            }
        })
        if(isBotAvailable) {
            const name = interaction.options.getString('name') || `cherMew`;
            const songList = await getDataSongList(name);
            if(songList.length>0) {
                const isSuccess = await play(interaction, songList)
                if(isSuccess) {
                    resMsg = `Add Song ${songList.length} Queue Successfully`
                }else {
                    return;
                }
            }else {
                resMsg = `ไม่พบเพลงใน template name ${name}`
            }
        }else {
            resMsg = `หนูยังไม่ว่าง, ลองใหม่ภายหลังนะคะ`
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