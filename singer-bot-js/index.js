const { Client, GatewayIntentBits, ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();
const ytdl = require('ytdl-core');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ] 
});

const CH_SINGER = process.env.CH_SINGER;

client.on('ready', () => {
    client.user.setActivity('# Mobile is singing', { type: ActivityType.Streaming });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    if(context.author.bot) {
        return;
    }
    if(context.channelId === CH_SINGER) {
        if(context.content.startsWith('#')) {
            console.log('context', context);
            if(context.content.toLowerCase() === '#mobile') {
                context.reply('เรียกหนูทำไมคะ, คิดถึงหนูหรอ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }
        }
        if(context.content.startsWith('https://') && context.content.includes('youtube')) {

        }
        setTimeout(() => context.delete(), 2000 );
    }else {
        if(context.channelId === CH_SINGER) {
            context.delete(5000);
        }
    }
})

client.login(process.env.TOKEN);