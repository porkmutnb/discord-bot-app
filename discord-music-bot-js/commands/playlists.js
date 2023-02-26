const { getDataSongList } = require('../function/retriveDataGoogleSheet');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
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
        const name = interaction.options.getString('name') || `cherMew`;
        let voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            resMsg = `เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยวหนูตามเข้าไป!`
        }else {
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
                const songList = await getDataSongList(name);
                if(songList.length>0) {
                    bot.distube.voices.join(voiceChannel);
                    await songList.forEach(async element => {
                        let link = element;
                        setTimeout(async () => {
                            await bot.distube.play(interaction.member.voice.channel, link);
                        }, 3000);
                    });
                    resMsg = `Add Song ${songList.length} Queue Successfully`
                }else {
                    resMsg = `ไม่พบเพลงใน template name ${name}`
                }
            }else {
                resMsg = `ตอนนี้หนูยังไม่สะดวก, โปรดลองใหม่ภายหลัง! ${interaction.user}.`
            }
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