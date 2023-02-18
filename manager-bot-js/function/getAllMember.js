const { Client, Collection, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const { config } = require('dotenv').config();

const SERVER_ID = process.env.SERVER_ID

const TOTAL_COUNT = process.env.TOTAL_COUNT;
const ONLINE_COUNT = process.env.ONLINE_COUNT;
const BOT_COUNT = process.env.BOT_COUNT;

module.exports.getAllMembers = async (interaction, client) => {
    console.log('client', client);
    console.log('interaction', interaction);
    let user = 0, verify = 0, bot = 0;
    var members;
    try {
        members = await client.guilds.cache.get(SERVER_ID).members.fetch();
    } catch (error) {
        members = await client.guild.members.fetch();
    }
    await members.map(async (member) => {
        if(!member.user.bot && member._roles.length==0) {
            user++;
        }
        if(!member.user.bot && member._roles.length>0) {
            verify++;
        }
        if(member.user.bot) {
            bot++;
        }
    })
    console.log(`user:${user}, verify:${verify}, bot:${bot}`);
    if(interaction==null) {
        client.guild.channels.cache.find(i => i.id === TOTAL_COUNT).setName(`Total Users: ${user}`)
        client.guild.channels.cache.find(i => i.id === ONLINE_COUNT).setName(`Total Members: ${verify}`)
        client.guild.channels.cache.find(i => i.id === BOT_COUNT).setName(`Bot: ${bot}`)
    }else {
        interaction.guild.channels.cache.find(i => i.id === TOTAL_COUNT).setName(`Total Users: ${user}`)
        interaction.guild.channels.cache.find(i => i.id === ONLINE_COUNT).setName(`Total Members: ${verify}`)
        interaction.guild.channels.cache.find(i => i.id === BOT_COUNT).setName(`Bot: ${bot}`)
    }
}