const { Client, GatewayIntentBits, ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { config } = require('dotenv').config();
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ] 
});

const WELCOME_ID = process.env.WELCOME_ID;
const GOODBYE_ID = process.env.GOODBYE_ID;

client.on('ready', () => {
    client.user.setActivity('Fond is working', { type: ActivityType.Listening });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    console.log('context', context);
    if(context.author.bot) {
        return;
    }
    if(context.content.startsWith('>')) {
        if(context.content.toLowerCase() === '>fond') {
            context.reply('เรียกหนูทำไมคะ, คิดถึงหนูหรอ');
        }
    }
})

client.on('guildMemberAdd', (context) => {
    console.log('guildMemberAdd', context);
    context.guild.channels.cache.find(i => i.id === WELCOME_ID).send(`Welcome ${context.user} to server: ${context.guild.name}.`); 
})

client.on('guildMemberRemove', (context) => {
    console.log('guildMemberRemove', context);
    context.guild.channels.cache.find(i => i.id === GOODBYE_ID).send(`GoodBye ${context.user}, Good luck of your path.`); 
})

client.login(process.env.TOKEN);