const { Client, GatewayIntentBits, ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();
const check = require("./helper")

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ] 
});

const CH_SINGER = process.env.CH_SINGER;
const VO_SINGER = process.env.VO_SINGER;

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
            }else if(context.content.toLowerCase() === '#setup') {
                const embed = new EmbedBuilder()
                                .setColor(0xC995C1)
                                .setTitle('ตู้เพลงโมบิล~~')
                                .setDescription('Comeon comeon~ oh baby~~')
                                .setThumbnail('https://media.tenor.com/cxpE7X7d19gAAAAd/mobile-bnk48.gif')
                                .setTimestamp()
                                .setFooter({ text: 'Powerd be cherMew', iconURL: 'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/315098331_677649020385663_2297767996946301281_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGvYRfXF2GV9P8OLTTPrkaNwHT7aUjuJYTAdPtpSO4lhA1bq_5PxId5289Agxdmmsv4v7zVTMgKWfhhk6FCX5f1&_nc_ohc=8kMpgt9N_ecAX-hw26p&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfD6J6b2Z5oQjt74JHq7JtZHfkyXJ2IAgVn7piZkS6mxNg&oe=63A532C0' });
                const Disconnect = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId('Disconnect')
                                            .setLabel('Disconnect')
                                            .setStyle(ButtonStyle.Primary),
                                    );
                context.guild.channels.cache.find(i => i.id == CH_SINGER).send({ embeds: [embed], components: [Disconnect] });
            }
        }
        let isYoutubeLink = context.content.startsWith('https://') && context.content.includes('youtube');
        console.log('isYoutubeLink', isYoutubeLink);
        if(isYoutubeLink) {
            if (check.userOnVoiceChannel(context)) {
                check.playMusicWithUrl(context.content, context, false/*check.isWorking(client, context, false)*/);
            }
        }
        setTimeout(() => context.delete(), 2000 );
    }else {
        if(context.channelId === CH_SINGER) {
            context.delete(5000);
        }
    }
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'Disconnect') {
        check.disconnectFromChannel(interaction, true);
    }
})

client.login(process.env.TOKEN);
