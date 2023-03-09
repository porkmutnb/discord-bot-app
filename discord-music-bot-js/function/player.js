const { EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, entersState, NoSubscriberBehavior , StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg')
require('dotenv').config()
const fs = require('fs')

global.filename = 'video.mp4'
global.connection = null
global.audioPlayer = createAudioPlayer()
global.songcurrent = ``
global.songList = []
global.volume = 50
global.loop = 0

module.exports.play = async (interaction, songList) => {
    let isSuccess = false
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
            global.connection = await joinVoiceChannel({
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
            await sendMusic(song, interaction);
            isSuccess = true
        }
    }else {
        global.songList = global.songList.concat(songList)
    }
    return isSuccess;
}

module.exports.volume = async (interaction) => {
    let resMsg = '';
    const connection = getVoiceConnection(interaction.guildId);
    if(connection) {
        const string = interaction.options.getInteger("number")
        const volume = parseInt(string)
        if(global.songcurrent==``) {
            resMsg = `หนูไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`
        }else {
            if (isNaN(volume)) {
                resMsg = `หนูไม่เข้าใจระดับเพลงของคุณค่ะ`
            }else if (volume < 1) { 
                resMsg = `ปรับระดับเสียงต่ำกว่า 1 ไม่ได้นะคะ`
            }else if (volume > 100) {
                resMsg = `ปรับระดับเสียงมากกว่า 100 ไม่ได้นะคะ`
            }else {
                resMsg = `ปรับระดับเสียงเรียบร้อย ระดับเสียงที่คุณเลือกคือ **${volume}**`
                global.volume = volume
                global.connection.state.subscription.player.state.resource.volume.setVolume(volume / 100);
            }
        }
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
    const string = interaction.options.getInteger("number");
    let loop = parseInt(string);
    loop = (isNaN(loop)) ? 2 : loop;
    let resMsg = ``;
    if (global.songcurrent==``) {
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
    const connection = getVoiceConnection(interaction.guildId);
    if(global.songList.length>1 && connection) {
        const song = global.songList.shift()
        global.songcurrent = `${song}`
        if(global.loop==2) {
            global.songList.push(song)
        }
        global.connection.state.subscription.player.stop();
        await sendMusic(song, interaction);
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
    if(global.songcurrent!=``) {
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

module.exports.leave = async (interaction) => {
    const resMsg = await disconnect(interaction)
    const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
    await interaction.followUp({embeds: [embed]});
    setTimeout(() => interaction.deleteReply(), 3000);
}

function disconnect(interaction) {
    if(global.connection!=null) {
        // fs.unlink(global.filename)
        global.connection.destroy()
        global.loop = 0
        global.volume = 50
        global.songList = []
        global.songcurrent = ``
        global.connection = null
        console.log('Disconnect...');
        return `Sayonara craw, bye bye ${interaction.user}`
    }else {
        return `หนูไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ ${interaction.user}`
    }
}

async function sendMusic(song, interaction) {
    // กำหนดไฟล์ที่จะเป็นไฟล์เสียงประเภท MP4 ที่จะสร้างขึ้น
    await downloadFile(song);
    // สร้าง AudioResource จาก URL ของเพลงที่ต้องการเล่น
    // const tracks = await ytdl.getInfo(song);
    // const stream = await ytdl.downloadFromInfo(tracks, { filter: 'audioonly' });
    // let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
    let resource = createAudioResource(global.filename, { inputType: StreamType.Arbitrary, inlineVolume: true });
    resource.volume.setVolume(global.volume / 100);
    // เล่นเพลง
    global.audioPlayer.play(resource);
    global.connection.subscribe(audioPlayer);
    // เมื่อเพลงเล่นเสร็จสิ้น หรือมีปัญหาขึ้น
    global.audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('Playing...');
    });
    global.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
        if(global.songList.length>0) {
            console.log(`Idle...`);
            const song = global.songList.shift();
            global.songcurrent = `${song}`
            if(global.loop==2) {
                global.songList.push(song)
            }
            await downloadFile(song);
            // const tracks = await ytdl.getInfo(song);
            // const stream = await ytdl.downloadFromInfo(tracks, { filter: 'audioonly' });
            // let resource = global.loop==1 ? global.audioPlayer.state.resource : createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
            let resource = global.loop==1 ? global.audioPlayer.state.resource : createAudioResource(global.filename, { inputType: StreamType.Arbitrary, inlineVolume: true });
            resource.volume.setVolume(global.volume / 100);
            global.audioPlayer.play(resource);
            global.connection.subscribe(global.audioPlayer);
        }else {
            await disconnect(interaction)
        }
    });
    global.audioPlayer.on('error', (error) => {
        console.error('Error Player:', error);
    });
    // เมื่อเชื่อมต่อกับช่องเสียงสำเร็จ
    await entersState(global.connection, VoiceConnectionStatus.Ready, 20e3);
}

async function downloadFile(song) {
    // if (fs.existsSync(global.filename)) {
    //     fs.unlink(global.filename)
    // }
    const info = await ytdl.getInfo(song)
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    const options = {
        format: videoFormat,
    };
    const videoStream = await ytdl.downloadFromInfo(info, options);
    const fileStream = await fs.createWriteStream(global.filename);
    await videoStream.pipe(fileStream);
    await fileStream.on('finish', async () => {
        console.log(`Video downloaded successfully as ${global.filename}`);
    })
}