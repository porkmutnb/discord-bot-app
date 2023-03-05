const { EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, entersState, NoSubscriberBehavior , StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')
require('dotenv').config()

const audioPlayer = createAudioPlayer()
global.songcurrent = ``
global.songList = []
global.loop = 0

module.exports.play = async (interaction, songList) => {
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
        const voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`เข้าไปจองห้อง Voice ไว้เลย, เดี๋ยวหนูตามเข้าไป!`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            // เข้าร่วมช่องเสียง
            const connection = await joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            global.songList = global.songList.concat(songList)
            const song = global.songList.shift()
            global.songcurrent = `${song}`
            if(global.loop==2) {
                global.songList.push(song)
            }
            // สร้าง AudioResource จาก URL ของเพลงที่ต้องการเล่น
            const tracks = await ytdl.getInfo(song);
            const stream = await ytdl.downloadFromInfo(tracks, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            // เล่นเพลง
            audioPlayer.play(resource);
            connection.subscribe(audioPlayer);
            // เมื่อเพลงเล่นเสร็จสิ้น หรือมีปัญหาขึ้น
            audioPlayer.on(AudioPlayerStatus.Playing, () => {
                console.log('Playing...');
            });
            audioPlayer.on(AudioPlayerStatus.Idle, async () => {
                if(global.songList.length>0) {
                    console.log(`Idle...`);
                    const song = global.songList.shift();
                    global.songcurrent = `${song}`
                    if(global.loop==2) {
                        global.songList.push(song)
                    }
                    const tracks = await ytdl.getInfo(song);
                    const stream = await ytdl.downloadFromInfo(tracks, { filter: 'audioonly' });
                    const resource = global.loop==1 ? audioPlayer.state.resource : createAudioResource(stream, { inputType: StreamType.Arbitrary });
                    audioPlayer.play(resource);
                    connection.subscribe(audioPlayer);
                }else {
                    console.log('Disconnect...');
                    global.songcurrent = ``
                    connection.disconnect()
                }
            });
            audioPlayer.on('error', (error) => {
                console.error('Error Player:', error);
            });
            // เมื่อเชื่อมต่อกับช่องเสียงสำเร็จ
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
        }
    }else {
        global.songList = global.songList.concat(songList)
    }
}

module.exports.volume = async (interaction) => {
    let resMsg = ``;
    const connection = getVoiceConnection(interaction.member.guild.id)
    if(connection) {
        connection.subscribe(audioPlayer);
        // เมื่อเพลงเล่นเสร็จสิ้น หรือมีปัญหาขึ้น
        audioPlayer.on(AudioPlayerStatus.Playing, () => {
            console.log('Set Volume Playing...');
            const string = interaction.options.getString("number")
            const volume = parseInt(string)
            if(global.songList.length==0) {
                resMsg = `หนูไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`
            }else {
                if (isNaN(volume)) {
                    resMsg = `หนูไม่เข้าใจระดับเพลงของคุณค่ะ`
                }else if (volume < 1) { 
                    resMsg = `ปรับระดับเสียงต่ำกว่า 1 ไม่ได้นะคะ`
                }else if (volume > 100) {
                    resMsg = `ปรับระดับเสียงมากกว่า 100 ไม่ได้นะคะ`
                }else {
                    audioPlayer.setVolume(volume/100);
                    resMsg = `ปรับระดับเสียงเรียบร้อย ระดับเสียงที่คุณเลือกคือ **${volume}**`
                }
            }
        });
    }else {
        resMsg = `หนูไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`
    }
    const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
    await interaction.followUp({embeds: [embed]});
    setTimeout(() => interaction.deleteReply(), 3000);
}

module.exports.loop = async (interaction) => {
    const string = interaction.options.getString("number");
    let loop = parseInt(string);
    loop = (isNaN(loop)) ? 2 : loop;
    let resMsg = ``;
    if (global.songList.length==0) {
        resMsg = `หนูไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`
    }else {
        if(loop==1) {
            resMsg = `(เล่นซ้ำเพลงเดิม)`;
            global.loop = 1
        }else if(loop==2) {
            resMsg = `(เล่นซ้ำคิวเพลง)`;
            global.loop = 2
        }else {
            resMsg = `(เล่นจบคิว)`;
            global.loop = 0
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
}

module.exports.skip = async (interaction) => {
    let resMsg = ``;
    if(global.songList.length>1) {
        audioPlayer.
        audioPlayer.on(AudioPlayerStatus.Playing, async () => {
            console.log(`Playing...`);
            const song = global.songList.shift();
            if(global.loop==2) {
                global.songList.push(song)
            }
            const tracks = await ytdl.getInfo(song);
            const stream = await ytdl.downloadFromInfo(tracks, { filter: 'audioonly' });
            const resource = global.loop==1 ? audioPlayer.state.resource : createAudioResource(stream, { inputType: StreamType.Arbitrary });
            audioPlayer.play(resource);
            connection.subscribe(audioPlayer);
        })
        resMsg = `เล่นเพลงถัดไปสำเร็จ. ${interaction.user}`
    }else {
        resMsg = `ไม่มีคิวเพลงแล้วน้าา~~. ${interaction.user}`
    }
    const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
    await interaction.followUp({embeds: [embed]});
    setTimeout(() => interaction.deleteReply(), 3000);
}

module.exports.nowplaying = async (interaction) => {
    if(global.songList.length>0 && global.songcurrent!=``) {
        const tracks = await ytdl.getInfo(global.songcurrent);
        const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .addFields({name: "Title", value: `${tracks.videoDetails.title}`, inline: true})
                        .addFields({name: "Author", value: `${tracks.videoDetails.author.name}`, inline: true})
                        // .addFields({name: "Time", value: `${tracks.duration}`, inline: true})
                        // .addFields({name: "Views", value: `${tracks.views}`, inline: true})
                        // .addFields({name: "Thumbnail", value: "[Click]("+tracks.thumbnail+")", inline: true})
                        .addFields({name: "Video", value: "[Click]("+tracks.videoDetails.video_url+")", inline: true})
                        .setImage(`https://i.ytimg.com/vi/${tracks.videoDetails.videoId}/maxresdefault.jpg`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 10000);
    }else {
        const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`ไม่มีคิวเพลงแล้วน้าา~~. ${interaction.user}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
    }
}

module.exports.disconnect = async (interaction) => {
    const connection = getVoiceConnection(interaction.member.guild.id)
    if(connection) {
        const resMsg = `Sayonara craw, bye bye ${interaction.user}`
        const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`${resMsg}`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
        connection.destroy()
        global.songList = []
        global.songcurrent = ``
    }
}