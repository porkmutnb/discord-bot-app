const { Client, GatewayIntentBits, ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ] 
});

const CH_WELCOME_ID = process.env.CH_WELCOME_ID;
const CH_GOODBYE_ID = process.env.CH_GOODBYE_ID;

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

client.on('ready', () => {
    client.user.setActivity('> Fond is working', { type: ActivityType.Listening });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    if(context.author.bot) {
        return;
    }
    if(context.channelId === CH_INTRODUCTION_ID) {
        console.log('context', context);
        if(context.content.startsWith('>')) {
            console.log('context', context);
            if(context.content.toLowerCase() === '>fond') {
                context.reply('เรียกหนูทำไมคะ, คิดถึงหนูหรอ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }
            setTimeout(() => context.delete(), 3000)
        }
    }
})

client.on('guildMemberAdd', (context) => {
    if(context.user.bot) {
        return;
    }
    console.log('guildMemberAdd', context);
    const embed = new EmbedBuilder()
                        .setColor(0xC995C1)
                        .setTitle(`${context.guild.name}`)
                        .setDescription(`Welcome ${context.user} to server: ${context.guild.name}.`)
                        .setThumbnail(`https://cdn.discordapp.com/avatars/${context.user.id}/${context.user.avatar}.png`)
                        .setTimestamp()
                        .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${context.guild.id}/${context.guild.icon}.webp` });
    context.guild.channels.cache.find(i => i.id == CH_WELCOME_ID).send({ embeds: [embed] });
})

client.on('guildMemberRemove', (context) => {
    if(context.user.bot) {
        return;
    }
    console.log('guildMemberRemove', context);
    const embed = new EmbedBuilder()
                        .setColor(0x3AC1B0)
                        .setTitle(`${context.guild.name}`)
                        .setDescription(`GoodBye ${context.user}, Good luck of your path.`)
                        .setThumbnail(`https://cdn.discordapp.com/avatars/${context.user.id}/${context.user.avatar}.png`)
                        .setTimestamp()
                        .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${context.guild.id}/${context.guild.icon}.webp` });
    context.guild.channels.cache.find(i => i.id == CH_GOODBYE_ID).send({ embeds: [embed] });
})

client.login(process.env.TOKEN);