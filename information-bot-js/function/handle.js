const { EmbedBuilder } = require("discord.js");
const { config } = require('dotenv').config();
const axios = require('axios');

global.videoId_lasted_bnk48 = ``;
global.videoId_lasted_cgm48 = ``;
global.videoId_lasted_up2mew = ``;

const SERVER_ID = process.env.SERVER_ID;
const API_KEY = process.env.API_KEY;
const BNK_YOUTUBE_CHANNEL_ID = process.env.BNK_YOUTUBE_CHANNEL_ID;
const CGM_YOUTUBE_CHANNEL_ID = process.env.CGM_YOUTUBE_CHANNEL_ID;
const UP2MEW_YOUTUBE_CHANNEL_ID = process.env.UP2MEW_YOUTUBE_CHANNEL_ID;
const CH_NEWSWIREBNK_ID = process.env.CH_NEWSWIREBNK_ID;
const CH_NEWSWIRECGM_ID = process.env.CH_NEWSWIRECGM_ID;
const CH_NEWSWIREUP2MEW_ID = process.env.CH_NEWSWIREUP2MEW_ID;
const URL_GET_LASTED_VIDEO_BNK48 = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${BNK_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=100`;
const URL_GET_LASTED_VIDEO_CGM48 = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CGM_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=100`;
const URL_GET_LASTED_VIDEO_UP2MEW = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${UP2MEW_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=100`

module.exports.updateLatestVideoBNK = async (client) => {
    // delete all
    let isNormal = true;  
    // await client.channels.cache.find(i => i.id == CH_NEWSWIREBNK_ID).messages.fetch().then(messages => {
    //     messages.forEach(message => {
    //         console.log(`DELETE ${message.content.split('?v=')[1]}`);
    //         message.delete();
    //     })
    //     isNormal = false;
    //     console.log(`DELETE ${messages.length}`);
    // });
    if(isNormal) {
        const messageHistory = await client.channels.cache.find(i => i.id == CH_NEWSWIREBNK_ID).messages.fetch()
        const messageHistoryLength = await client.channels.cache.find(i => i.id == CH_NEWSWIREBNK_ID).messages.fetch().then(messages => {
            //console.log(`BNK Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => {
                global.videoId_lasted_bnk48 = global.videoId_lasted_bnk48=='' ? message.content.split('?v=')[1] : global.videoId_lasted_bnk48;
            })
            return messages.size;
        });
        console.log(`BNK messageHistoryLength: ${messageHistoryLength}`);

        await axios.get(URL_GET_LASTED_VIDEO_BNK48).then( response => {
            const data = response.data;
            if(data.items.length>0) {
                if(global.videoId_lasted_bnk48==``) { 
                    for(var i=data.items.length-1; i>=0; i--) {
                        const item = data.items[i];
                        console.log(`item:`, item);

                        const videoId = data.items[i].id.videoId;
                        const title = data.items[i].snippet.title;
                        const description = data.items[i].snippet.description
                        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                        const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก BNK48 Official => ${videoUrl}`;
                        client.channels.cache.find(i => i.id == CH_NEWSWIREBNK_ID).send({ content: `${message}` });

                        global.videoId_lasted_bnk48 = videoId;
                    }
                }else if(global.videoId_lasted_bnk48!=data.items[0].id.videoId) {
                    console.log(`data:`, data);

                    for(var i=data.items.length-1; i>=0; i--) {
                        let isMsgDuplicate = JSON.stringify(messageHistory.find(msg => msg.content.split('?v=')[1]===data.items[i].id.videoId ))==undefined ? false : true;
                        if(!isMsgDuplicate) {
                            const videoId = data.items[i].id.videoId;
                            const title = data.items[i].snippet.title;
                            const description = data.items[i].snippet.description
                            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                            const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก BNK48 Official => ${videoUrl}`;
                            client.channels.cache.find(i => i.id == CH_NEWSWIREBNK_ID).send({ content: `${message}` });

                            global.videoId_lasted_bnk48 = videoId;
                        }
                    }
                }else {
                    console.log(`Video lasted of BNK48 is ${global.videoId_lasted_bnk48}`);
                }
            }
        }).catch( error => {
            console.error(`updateLatestVideoBNK Error:`, error);
        })
    }
}

module.exports.updateLatestVideoCGM = async (client) => {
    // delete all
    let isNormal = true;  
    // await client.channels.cache.find(i => i.id == CH_NEWSWIRECGM_ID).messages.fetch().then(messages => {
    //     messages.forEach(message => {
    //         console.log(`DELETE ${message.content.split('?v=')[1]}`);
    //         message.delete();
    //     })
    //     isNormal = false;
    //     console.log(`DELETE ${messages.length}`);
    // });
    if(isNormal) {
        const messageHistory = await client.channels.cache.find(i => i.id == CH_NEWSWIRECGM_ID).messages.fetch()
        const messageHistoryLength = await client.channels.cache.find(i => i.id == CH_NEWSWIRECGM_ID).messages.fetch().then(messages => {
            //console.log(`CGM Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => {
                global.videoId_lasted_cgm48 = global.videoId_lasted_cgm48=='' ? message.content.split('?v=')[1] : global.videoId_lasted_cgm48;
            })
            return messages.size;
        });
        console.log(`CGM messageHistoryLength: ${messageHistoryLength}`);

        await axios.get(URL_GET_LASTED_VIDEO_CGM48).then( response => {
            const data = response.data;
            if(data.items.length>0) {
                if(global.videoId_lasted_cgm48==``) { 
                    for(var i=data.items.length-1; i>=0; i--) {
                        const item = data.items[i];
                        console.log(`item:`, item);

                        const videoId = data.items[i].id.videoId;
                        const title = data.items[i].snippet.title;
                        const description = data.items[i].snippet.description
                        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                        const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก CGM48 Official => ${videoUrl}`;
                        client.channels.cache.find(i => i.id == CH_NEWSWIRECGM_ID).send({ content: `${message}` });

                        global.videoId_lasted_cgm48 = videoId;
                    }
                }else if(global.videoId_lasted_cgm48!=data.items[0].id.videoId) {
                    console.log(`data:`, data);

                    for(var i=data.items.length-1; i>=0; i--) {
                        let isMsgDuplicate = JSON.stringify(messageHistory.find(msg => msg.content.split('?v=')[1]===data.items[i].id.videoId ))==undefined ? false : true;
                        if(!isMsgDuplicate) {
                            const videoId = data.items[i].id.videoId;
                            const title = data.items[i].snippet.title;
                            const description = data.items[i].snippet.description
                            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                            const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก BNK48 Official => ${videoUrl}`;
                            client.channels.cache.find(i => i.id == CH_NEWSWIRECGM_ID).send({ content: `${message}` });

                            global.videoId_lasted_cgm48 = videoId;
                        }
                    }
                }else {
                    console.log(`Video lasted of CGM48 is ${global.videoId_lasted_cgm48}`);
                }
            }
        }).catch( error => {
            console.error(`updateLatestVideoCGM Error:`, error);
        })
    }
}

module.exports.updateLatestVideoUp2Mew = async (client) => {
    // delete all
    let isNormal = true;  
    // await client.channels.cache.find(i => i.id == CH_NEWSWIREUP2MEW_ID).messages.fetch().then(messages => {
    //     messages.forEach(message => {
    //         console.log(`DELETE ${message.content.split('?v=')[1]}`);
    //         message.delete();
    //     })
    //     isNormal = false;
    //     console.log(`DELETE ${messages.length}`);
    // });
    if(isNormal) {
        const messageHistory = await client.channels.cache.find(i => i.id == CH_NEWSWIREUP2MEW_ID).messages.fetch()
        const messageHistoryLength = await client.channels.cache.find(i => i.id == CH_NEWSWIREUP2MEW_ID).messages.fetch().then(messages => {
            //console.log(`UP2MEW Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => {
                global.videoId_lasted_up2mew = global.videoId_lasted_up2mew=='' ? message.content.split('?v=')[1] : global.videoId_lasted_up2mew;
            })
            return messages.size;
        });
        console.log(`UP2MEW messageHistoryLength: ${messageHistoryLength}`);
        await axios.get(URL_GET_LASTED_VIDEO_UP2MEW).then(async response => {
            const data = response.data;
            if(messageHistoryLength<=data.length) {
                global.videoId_lasted_up2mew = messageHistory[0].content.split('?v=')[1]
            }
            if(data.items.length>0) {
                if(global.videoId_lasted_up2mew==``) { 
                    let timesUp = 60000;
                    for(var i=data.items.length-1; i>=0; i--) {
                        const item = data.items[i];
                        console.log(`item:`, item);

                        const videoId = data.items[i].id.videoId;
                        const title = data.items[i].snippet.title;
                        const description = data.items[i].snippet.description
                        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                        const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก Up to Mew => ${videoUrl}`;
                        let isMsgDuplicate = JSON.stringify(messageHistory.find(msg => msg.content.split('?v=')[1]===videoId ))==undefined ? false : true;
                        if(!isMsgDuplicate) {
                            setTimeout(() => {
                                client.channels.cache.find(i => i.id == CH_NEWSWIREUP2MEW_ID).send({ content: `${message}` });
                            }, timesUp);
                            timesUp = timesUp+60000; // 1 minute
                        }
                        if(i==0) {
                            global.videoId_lasted_up2mew = videoId;
                        }
                    }
                }else if(global.videoId_lasted_up2mew!=data.items[0].id.videoId) {
                    const videoId = data.items[0].id.videoId;
                    const title = data.items[0].snippet.title;
                    const description = data.items[0].snippet.description
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                    const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก Up to Mew => ${videoUrl}`;
                    client.channels.cache.find(i => i.id == CH_NEWSWIREUP2MEW_ID).send({ content: `${message}` });

                    global.videoId_lasted_up2mew = videoId;
                }else {
                    console.log(`Video lasted of Up2Mew is ${global.videoId_lasted_up2mew}`);
                }
            }
        }).catch( error => {
            console.error(`updateLatestVideoUp2Mew Error:`, error);
        }) 
    }
}