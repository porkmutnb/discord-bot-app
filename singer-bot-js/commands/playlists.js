const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const { config } = require('dotenv').config();
const { getDataSongList } = require('../function/retriveDataGoogleSheet');

const SINGER_ID = process.env.SINGER_ID;
const CH_SINGER = process.env.CH_SINGER;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const MEMBER_ID = process.env.MEMBER_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlists')
		.setDescription('Playlist for you')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('template name')
                .setRequired(false)),
	async execute(interaction, client) {
        if(interaction.channelId==CH_SINGER) {
            const name = interaction.options.getString('name') || `cherMew`;
            let isOwner = interaction.member.roles.cache.has(OWNER_ID);
            let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
            let isMember = interaction.member.roles.cache.has(MEMBER_ID);
            if(isOwner||isAdmin||isMember) {
                let voiceChannel = interaction.member.voice.channel
                if (!voiceChannel) {
                    await interaction.reply({content: "เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยว Mobile ตามเข้าไป!"})
                    setTimeout(() => interaction.deleteReply(), 3000);
                }else {
                    await interaction.deferReply().catch(err => {})
                    let isBotAvailable = true;
                    await interaction.member.guild.channels.cache.filter(async ch => {
                        if(ch.type===2) {
                            await ch.members.forEach(m => {
                                if(m.user.bot && m.user.id==SINGER_ID) {
                                    isBotAvailable = false
                                }
                            })
                        }
                    })
                    if(isBotAvailable) {
                        const songList = await getDataSongList(name);
                        if(songList.length>0) {
                            client.distube.voices.join(voiceChannel);
                            await songList.forEach(async element => {
                                let url = element;
                                setTimeout(async () => {
                                    await client.distube.play(interaction.member.voice.channel, url);
                                }, 3000);
                            });
                            await interaction.followUp({content: `Add Song ${songList.length} Queue Successfully`});
                            setTimeout(() => interaction.deleteReply(), 3000);
                        }else {
                            await interaction.followUp({content: `ไม่พบเพลงใน template name ${name}`});
                            setTimeout(() => interaction.deleteReply(), 3000);
                        }
                    }else {
                        await interaction.followUp(`ตอนนี้ Mobile ยังไม่สะดวก, โปรดลองใหม่ภายหลัง! ${interaction.user}.`);
                        setTimeout(() => interaction.deleteReply(), 3000);
                    }
                }
            }else {
                await interaction.reply(`ฐานันดร ไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }else {
            let CH_SINGER_TEXT = interaction.guild.channels.cache.find(ch => ch.id === CH_SINGER);
            await interaction.reply(`อยากฟังเพลงอะไร! ${interaction.user}, บอก Mobile ที่ ${CH_SINGER_TEXT} ได้นะคะ.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};