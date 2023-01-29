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

const prefix = '*';

client.on('ready', () => {
    client.user.setActivity(`${prefix} Cherprang is working`, { type: ActivityType.Listening });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    if(context.author.bot) {
        return;
    }
    if(context.channelId === CH_INTRODUCTION_ID) {
        let isOwnerRole = context.member.roles.cache.has(OWNER_ID);
        let isAdminRole = context.member.roles.cache.has(ADMIN_ID);
        if(context.content.startsWith(`${prefix}`)) {
            console.log('context', context);
            if(context.content.toLowerCase() === `${prefix}cherprang`) {
                context.reply('สวัสดีค่ะ, ยินดีต้อนรับนะคะ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }
            if(context.content.toLowerCase() === `${prefix}setup` && (isOwnerRole||isAdminRole)) {
                this.myFunction(context)
            }
            context.delete();
        }
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
        member.map(me => {
            if(!me.user.bot && me._roles.length==0) {
                user++;
            }
            if(!me.user.bot && me._roles.length>0) {
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