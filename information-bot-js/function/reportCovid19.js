const { EmbedBuilder } = require("discord.js");
const { config } = require('dotenv').config();
const axios = require('axios');

const URL_COVID19_SUMMARY = `https://api.covid19api.com/summary`;

const SERVER_ID = process.env.SERVER_ID;
const CH_NEWSWIRECOVID19_ID = process.env.CH_NEWSWIRECOVID19_ID;

module.exports.summary = async () => {
    return await axios.get(URL_COVID19_SUMMARY).then( response => {
        return response.data;
    }).catch( error => {
        console.error(`Error:`, error);
    })
}

module.exports.getCovidSummaryAll = async (isDev) => {
    let data;
    if(isDev) {
        data = require('../asset/demo_result.json');
    }else {
        data = await this.summary();
    }
    let responseList = [];
    if(data.Countries==undefined) {
        let response = {
            name: `${data.Message}`,
            value: `ระบบขัดข้องจาก api.covid19api.com`,
            inline: false
        };
        responseList.push(response);
    }else {
        await data.Countries.forEach(element => {
            let response = {
                name: `${element.CountryCode}: ${element.Country}`,
                value: `ผู้ติดเชื้อ: ${element.TotalConfirmed} \n ผู้เสียชีวิต: ${element.TotalDeaths} \n หายป่วย: ${element.TotalRecovered} \n`,
                inline: false
            };
            responseList.push(response);
        });
    }
    return responseList;
}

module.exports.getCovidSummaryByCountry = async (contryCode) => {
    const data = await this.summary();
    let responseList = [];
    if(data.Countries==undefined) {
        let response = {
            name: `${data.Message}`,
            value: `ระบบขัดข้องจาก api.covid19api.com`,
            inline: false
        };
        responseList.push(response);
    }else {
        await data.Countries.forEach(element => {
            if(element.CountryCode===contryCode) {
                let response = {
                    name: `${element.CountryCode}: ${element.Country}`,
                    value: `ผู้ติดเชื้อ: ${element.TotalConfirmed} \n ผู้เสียชีวิต: ${element.TotalDeaths} \n หายป่วย: ${element.TotalRecovered} \n`,
                    inline: false
                };
                responseList.push(response);
            }
        });
    }
    if(responseList.length==0) {
        let response = {
            name: `ไม่พบคำค้นหา`,
            value: `${contryCode}`,
            inline: false
        };
        responseList.push(response);
    }
    return responseList;
}

module.exports.renderSummaryCovid19 = async (client) => {
    let timestampLasted = ``;
    const guild = client.guilds.cache.get(SERVER_ID);
    await client.channels.cache.find(i => i.id == CH_NEWSWIRECOVID19_ID).messages.fetch().then(async messages => {
        //Iterate through the messages here with the variable "messages".
        await messages.forEach(message => {
            timestampLasted = timestampLasted==`` ? message.createdTimestamp : timestampLasted;
        });
    });
    let dateLasted = timestampLasted==`` ? null : new Date(timestampLasted);
    let dateNow = new Date();
    if((timestampLasted!=`` && dateNow.getDate()!=dateLasted.getDate()) || dateLasted==null) {
        const data = await this.getCovidSummaryAll(false);
        if(data.length<=1) {
            const exampleEmbed = {
                color: 0xC995C1,
                title: 'รายงานผล Covid19',
                description: `รวมผล Covid19 ทั้งโลก`,
                fields: data,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `Powerd be cherMew`,
                    icon_url: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`,
                },
            };
            client.channels.cache.find(i => i.id == CH_NEWSWIRECOVID19_ID).send({ embeds: [exampleEmbed] }).then(msg => {
                setTimeout(() => { msg.delete();}, 10000);
            });
        }else {
            let index = 0;
            while (index<data.length) {
                let responseList = [];
                let last = (index+50)>data.length ? data.length : index+50;
                for (let i=index; index<last; i++) {
                    responseList.push(data[i]);
                    index++;
                }
                const exampleEmbed = {
                    color: 0xC995C1,
                    title: 'รายงานผล Covid19',
                    description: `รวมผล Covid19 ทั้งโลก`,
                    fields: responseList,
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: `Powerd be cherMew`,
                        icon_url: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`,
                    },
                };
                client.channels.cache.find(i => i.id == CH_NEWSWIRECOVID19_ID).send({ embeds: [exampleEmbed] });
                console.log('responseList.length', responseList.length);
            }
        }
    }
}