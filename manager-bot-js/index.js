const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { config } = require('dotenv').config();
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
    disableEveryone: true
});

const SERVER_ID = process.env.SERVER_ID;
const BOT_ID = process.env.BOT_ID;
const TOTAL_COUNT = process.env.TOTAL_COUNT;
const ONLINE_COUNT = process.env.ONLINE_COUNT;
const BOT_COUNT = process.env.BOT_COUNT;

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID;

client.on('ready', (context) => {
    client.user.setActivity('* Cherprang is working', { type: ActivityType.Listening });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    if(context.author.bot) {
        return;
    }
    if(context.content.startsWith('*')) {
        console.log('context', context);
        if(context.content.toLowerCase() === '*cherprang') {
            context.reply('สวัสดีค่ะ, ยินดีต้อนรับนะคะ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
        }
        if(context.content.toLowerCase() === '*setup') {
            this.myFunction(context)
        }
        context.delete();
    }
})

client.on('guildMemberAdd', (context) => {
    this.myFunction(context)
})

client.on('guildMemberRemove', (context) => {
    this.myFunction(context)
})

client.login(process.env.TOKEN);

exports.myFunction = (context) => {
    let user = 0, verify = 0, bot = 0;
    const Guilds = client.guilds.cache.map((guild) => guild);
    Guilds[0].members.fetch().then(member => {
        user = member.size;
        member.map(me => {
            if(me._roles.length>0) {
                verify++;
            }
            if(me.user.bot) {
                bot++;
            }
        })
        console.log(`user:${user}, verify:${verify}, bot:${bot}`);
        context.guild.channels.cache.find(ch => ch.id === TOTAL_COUNT).setName(`Total Users: ${user}`)
        context.guild.channels.cache.find(ch => ch.id === ONLINE_COUNT).setName(`Total Members: ${verify}`)
        context.guild.channels.cache.find(ch => ch.id === BOT_COUNT).setName(`Bot: ${bot}`)
    })
}