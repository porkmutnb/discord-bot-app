const { getCovidSummaryByCountry} = require('./reportCovid19');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
require('dotenv').config();

global.videoId_lasted_bnk48 = ``;
global.videoId_lasted_cgm48 = ``;
global.videoId_lasted_up2mew = ``;

const URL_GET_LASTED_VIDEO_BNK48 = `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.BNK_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`;
const URL_GET_LASTED_VIDEO_CGM48 = `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.CGM_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`;
const URL_GET_LASTED_VIDEO_UP2MEW = `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.UP2MEW_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`;

module.exports.updateLatestVideoBNK = async (client) => {
    const channel = client.channels.cache.find(c => c.type === 0 && c.name === process.env.CH_NEWSWIREBNK_NAME)
    if(channel) {
        // delete all
        let isNormal = true;  
        // await channel.messages.fetch().then(messages => {
        //     messages.forEach(message => {
        //         console.log(`DELETE ${message.content.split('?v=')[1]}`);
        //         message.delete();
        //     })
        //     isNormal = false;
        //     console.log(`DELETE ${messages.length}`);
        // });
        if(isNormal) {
            const messageHistory = await channel.messages.fetch()
            const messageHistoryLength = await channel.messages.fetch().then(messages => {
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
                        let timesUp = 60000;
                        for(var i=data.items.length-1; i>=0; i--) {
                            const item = data.items[i];
                            console.log(`item:`, item);

                            const videoId = data.items[i].id.videoId;
                            const title = data.items[i].snippet.title;
                            const description = data.items[i].snippet.description
                            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                            const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก BNK48 Official => ${videoUrl}`;
                            let isMsgDuplicate = JSON.stringify(messageHistory.find(msg => msg.content.split('?v=')[1]===videoId ))==undefined ? false : true;
                            if(!isMsgDuplicate) {
                                setTimeout(() => {
                                    channel.send({ content: `${message}` });
                                }, timesUp);
                                timesUp = timesUp+60000; // 1 minute
                            }
                            if(i==0) {
                                global.videoId_lasted_bnk48 = videoId;
                            }
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
                                channel.send({ content: `${message}` });

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
    }else {
        console.log(`Not found text channel ${process.env.CH_NEWSWIREBNK_NAME} for update lasted video from BNK48 Official`);
    }
}

module.exports.updateLatestVideoCGM = async (client) => {
    const channel = client.channels.cache.find(c => c.type === 0 && c.name === process.env.CH_NEWSWIRECGM_NAME)
    if(channel) {
        // delete all
        let isNormal = true;  
        // await channel.messages.fetch().then(messages => {
        //     messages.forEach(message => {
        //         console.log(`DELETE ${message.content.split('?v=')[1]}`);
        //         message.delete();
        //     })
        //     isNormal = false;
        //     console.log(`DELETE ${messages.length}`);
        // });
        if(isNormal) {
            const messageHistory = await channel.messages.fetch()
            const messageHistoryLength = await channel.messages.fetch().then(messages => {
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
                        let timesUp = 60000;
                        for(var i=data.items.length-1; i>=0; i--) {
                            const item = data.items[i];
                            console.log(`item:`, item);

                            const videoId = data.items[i].id.videoId;
                            const title = data.items[i].snippet.title;
                            const description = data.items[i].snippet.description
                            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                            const message = `${title} \n ${description} \n คลิปใหม่ๆสดๆ จาก CGM48 Official => ${videoUrl}`;
                            let isMsgDuplicate = JSON.stringify(messageHistory.find(msg => msg.content.split('?v=')[1]===videoId ))==undefined ? false : true;
                            if(!isMsgDuplicate) {
                                setTimeout(() => {
                                    channel.send({ content: `${message}` });
                                }, timesUp);
                                timesUp = timesUp+60000; // 1 minute
                            }
                            if(i==0) {
                                global.videoId_lasted_cgm48 = videoId;
                            }
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
                                channel.send({ content: `${message}` });

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
    }else {
        console.log(`Not found text channel ${process.env.CH_NEWSWIRECGM_NAME} for update lasted video from CGM48 Official`);
    }
}

module.exports.updateLatestVideoUp2Mew = async (client) => {
    const channel = client.channels.cache.find(c => c.type === 0 && c.name === process.env.CH_NEWSWIREUP2MEW_NAME)
    if(channel) {
        // delete all
        let isNormal = true;  
        // await channel.messages.fetch().then(messages => {
        //     messages.forEach(message => {
        //         console.log(`DELETE ${message.content.split('?v=')[1]}`);
        //         message.delete();
        //     })
        //     isNormal = false;
        //     console.log(`DELETE ${messages.length}`);
        // });
        if(isNormal) {
            const messageHistory = await channel.messages.fetch()
            const messageHistoryLength = await channel.messages.fetch().then(messages => {
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
                                    channel.send({ content: `${message}` });
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
                        channel.send({ content: `${message}` });

                        global.videoId_lasted_up2mew = videoId;
                    }else {
                        console.log(`Video lasted of Up2Mew is ${global.videoId_lasted_up2mew}`);
                    }
                }
            }).catch( error => {
                console.error(`updateLatestVideoUp2Mew Error:`, error);
            }) 
        }
    }else {
        console.log(`Not found text channel ${process.env.CH_NEWSWIREUP2MEW_NAME} for update lasted video from UP2MEW Channel`);
    }
}

module.exports.updateReportCovid19 = async (client) => {
    const channel = client.channels.cache.find(c => c.type === 0 && c.name === process.env.CH_NEWSWIRECOVID19_NAME)
    if(channel) {
        let timestampLasted = ``;
        await channel.messages.fetch().then(async messages => {
            //Iterate through the messages here with the variable "messages".
            await messages.forEach(message => {
                timestampLasted = timestampLasted==`` ? message.createdTimestamp : timestampLasted;
            });
        });
        let dateLasted = timestampLasted==`` ? null : new Date(timestampLasted);
        let dateNow = new Date();
        if((timestampLasted!=`` && dateNow.getMonth()!=dateLasted.getMonth()) || dateLasted==null) {
            let guildId = ``, guildIcon = ``
            client.guilds.cache.find(g => guildId = g.id)
            client.guilds.cache.find(g => guildIcon = g.icon)
            const data = await getCovidSummaryByCountry(`TH`);
            const exampleEmbed = {
                color: 0xC995C1,
                title: 'รายงานผล Covid19',
                description: `รวมผล Covid19 ภายในประเทศ`,
                fields: data,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `Powerd be cherMew`,
                    icon_url: `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.webp`,
                },
            };
            if(data[0].value==`ระบบขัดข้องจาก api.covid19api.com`) {
                channel.send({ embeds: [exampleEmbed] }).then(msg => {
                    setTimeout(() => { msg.delete();}, 10000);
                });
            }else {
                channel.send({ embeds: [exampleEmbed] })
            }
        }else {
            console.log(`update report covid19 lasted is ${dateLasted}`);
        }
    }else {
        console.log(`Not found text channel ${process.env.CH_NEWSWIRECOVID19_NAME} for update report covid19 from api.covid19api`);
    }
}