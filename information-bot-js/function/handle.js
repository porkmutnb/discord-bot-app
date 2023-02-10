const { EmbedBuilder } = require("discord.js");
const { config } = require('dotenv').config();
const axios = require('axios');

global.videoId_lasted_bnk48 = ``;

const SERVER_ID = process.env.SERVER_ID;
const API_KEY = process.env.API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const CH_INFORMATION_ID = process.env.CH_INFORMATION_ID;
const URL_GET_LASTED_VIDEO_BNK48 = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;

module.exports.updateLatestVideo = async (client) => {
    //console.log('client', client);
    //console.log('===>', client.guilds.cache.get(SERVER_ID));
    //console.log('client.user', client.user);
    const guild = client.guilds.cache.get(SERVER_ID);
    await axios.get(URL_GET_LASTED_VIDEO_BNK48).then( response => {
        const data = response.data;
        if(data.items.length>0) {
            if(global.videoId_lasted_bnk48==`` || global.videoId_lasted_bnk48!=data.items[0].id.videoId) {
                console.log(`data:`, data);
                
                const videoId = data.items[0].id.videoId;
                const title = data.items[0].snippet.title;
                const description = data.items[0].snippet.description
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก BNK48 Official => ${videoUrl}`;
                client.channels.cache.find(i => i.id == CH_INFORMATION_ID).send({ content: `${message}` });

                // const embed = new EmbedBuilder()
                //         .setColor("#C995C1")
                //         .setTitle('Newswire from BNK48 Official')
                //         .setURL('https://www.youtube.com/@BNK48OfficialYouTube')
                //         .setAuthor({ name: `${client.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png` })
                //         .setDescription(`${description}`)
                //         //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
                //         //.setImage('https://i.imgur.com/AfFp7pu.png')
                //         .setTimestamp()
                //         .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp` });
                // client.channels.cache.find(i => i.id == CH_INFORMATION_ID).send({ content: `คลิปใหม่ๆสดๆ จาก BNK48 Official => ${videoUrl}`, embeds: [embed]});

                global.videoId_lasted_bnk48 = videoId;
            }else {
                console.log(`Video lasted of BNK48 is ${global.videoId_lasted_bnk48}`);
            }
        }
    }).catch( error => {
        console.error(`Error:`, error);
    })
}