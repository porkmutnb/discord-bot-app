const { Client, GatewayIntentBits, ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, 
        Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder
} = require('discord.js');
const { config } = require('dotenv').config();

const MEMBER_ID = process.env.MEMBER_ID
const GAMER_ID = process.env.GAMER_ID
const OTA_ID = process.env.OTA_ID
const FRIEND_ID = process.env.FRIEND_ID

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID
const CH_REQUEST_FRIEND_ID = process.env.CH_REQUEST_FRIEND_ID

const OWNER_ID = process.env.OWNER_ID

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('ready', () => {
    client.user.setActivity('! Pupe is working', { type: ActivityType.Listening });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    if(context.author.bot) {
        return;
    }
    if(context.channelId === CH_INTRODUCTION_ID) {
        console.log('context', context);
        if(context.content.startsWith('!') || context.content.startsWith('>')) {
            if(context.content.toLowerCase() === '!ping') {
                context.reply('pong').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }else if(context.content.toLowerCase() === '!invite') {
                let invite = context.channel.createInvite(
                    {
                        maxAge: 24 * 3600, // maximum time for the invite, in milliseconds
                        maxUses: 5 // maximum times it can be used
                    },
                    `Requested with command by ${context.author.tag}`
                ).then(invite => {
                    let linkInvite = `https://discord.gg/${invite.code}`
                    context.author.send(`คำชวนเข้าเซิฟของ ${context.guild.name} => ${linkInvite}`);
                });
            }else if(context.content.toLowerCase() === '!role') {
                let isUserMemberRole = context.member.roles.cache.has(MEMBER_ID);
                const Member = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('member')
                                        .setLabel('Member')
                                        .setDisabled(isUserMemberRole ? true : false)
                                        .setStyle(ButtonStyle.Primary),
                );
                let isUserGamerRole = context.member.roles.cache.has(GAMER_ID);
                const Gamer = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('gamer')
                                        .setLabel('Gamer')
                                        .setDisabled(isUserGamerRole ? true : false)
                                        .setStyle(ButtonStyle.Secondary),
                );
                let isUserOtaRole = context.member.roles.cache.has(OTA_ID);
                const Ota = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('ota')
                                        .setLabel('OTA')
                                        .setDisabled(isUserOtaRole ? true : false)
                                        .setStyle(ButtonStyle.Success),
                );
                let isUserFriendRole = context.member.roles.cache.has(FRIEND_ID);
                const Friend = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('friend')
                                        .setLabel('Friend')
                                        .setDisabled(isUserFriendRole ? true : false)
                                        .setStyle(ButtonStyle.Danger),
                );
                context.reply({ content: 'ต้องการ Role หรือคะ นายท่าน,', components: [Member,Gamer,Ota, Friend] }).then(msg => { setTimeout(() => msg.delete(), 10000 ) });
            }else if(context.content.toLowerCase() === '!pupe') {
                context.reply('เรียกอิชั้นทำไมคะนายท่าน, คิดถึงชั้นหรอ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }else if(context.content.toLowerCase() === '!setup' && context.author.id == OWNER_ID) {
                const embed = new EmbedBuilder()
                        .setColor(0xC995C1)
                        .setTitle('คำสั่งของดิชั้นนะคะ')
                        .setDescription('Command for Assistance')
                        .addFields(
                            { name: '!role', value: 'ต้องการ Rold' },
                            { name: '!invite', value: 'ต้องการ Invite your friend' },
                            { name: '!pupe', value: 'คุยกับดิชั้น' },
                        )
                        .setTimestamp()
                        .setFooter({ text: `Powered by @cherMew` });
                context.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send({ embeds: [embed] });
            }
        }else {
            context.reply('อิชั้นขอลบ, โพสต์ที่อิชั้นไม่เข้าใจนะคะนายท่าน').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
        }
        if(context.content.toLowerCase() === '!setup' || context.author.id != OWNER_ID) {
            setTimeout(() => context.delete(), 2000 );
        }
    }else {
        if(context.channelId === CH_INTRODUCTION_ID) {
            context.delete(5000);
        }
        
    }
})

client.on(Events.InteractionCreate, async interaction => {
    console.log('interaction', interaction);
    if(interaction.customId === 'member') {
        let memberRole = interaction.member.guild.roles.cache.find(role => role.name === "MEMBER");
        let isUserMemberRole = interaction.member.roles.cache.has(memberRole.id);
        if (memberRole && !isUserMemberRole) {
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(memberRole);
            interaction.reply(`${interaction.member.user}เพิ่ม Role MEMBER ให้นายท่านเรียบร้อยแล้วค่ะ`).then(msg => { setTimeout(() => msg.delete(), 5000 ) });
        }else {
            return;
        }
    }else if(interaction.customId === 'gamer') {
        let gamerRole = interaction.member.guild.roles.cache.find(role => role.name === "GAMER");
        let isUserGamerRole = interaction.member.roles.cache.has(gamerRole.id);
        if (gamerRole && !isUserGamerRole) {
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(gamerRole);
            interaction.reply(`${interaction.member.user} เพิ่ม Role GAMER ให้นายท่านเรียบร้อยแล้วค่ะ`).then(msg => { setTimeout(() => msg.delete(), 5000 ) });
        }else {
            return;
        }
    }else if(interaction.customId === 'friend') {
        const acceptFriend = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('acceptFriend')
                                .setLabel('Accept Friend')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Primary),
        );
        interaction.guild.channels.cache.find(i => i.id === CH_REQUEST_FRIEND_ID).send({ content: `มีสมาชิกท่านนี้ ${interaction.member.user}, แจ้งว่ารู้จักคุณ โปรดพิจารณา.`, components: [acceptFriend] });
        interaction.reply(`${interaction.member.user} รอ Owner อนุมัติการเพิ่ม Role FRIEND ให้นายท่านสักครู่นะคะ`).then(msg => { setTimeout(() => msg.delete(), 5000 ) });
    }else if(interaction.customId === 'ota') {
        const modal = new ModalBuilder()
			.setCustomId('otaRequest')
			.setTitle('แบบสอบถาม');
        const nameInput = new TextInputBuilder()
			.setCustomId('nameInput')
			.setLabel("ชื่อคุณ?")
			.setStyle(TextInputStyle.Short)
            .setRequired(true);
        const oshiInput = new TextInputBuilder()
			.setCustomId('oshiInput')
			.setLabel("โอชิของคุณ?")
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(oshiInput);
        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);
    } else if(interaction.customId === 'acceptFriend') {
        console.log('acceptFriend', interaction.member.user);
        let userId = interaction.message.content.substring(interaction.message.content.indexOf('@')+1, interaction.message.content.indexOf('>'))
        let friendRole = interaction.member.guild.roles.cache.find(role => role.name === "FRIEND");
        let isUserFriendRole = interaction.member.roles.cache.has(userId);
        if (friendRole && !isUserFriendRole) {
            console.log(client.users.cache.filter(u => u.id === userId));
            
            // interaction.guild.channels.cache.find(i => i.id === CH_INFORMATION_ID).send(`${client.users.cache.get(userId)} เพิ่ม Role FRIEND ให้นายท่านเรียบร้อยแล้วค่ะ`);
        }else {
            return;
        }
        console.log('userId =>', userId);
    }else if (interaction.isModalSubmit()) {
        if(interaction.customId === 'otaRequest') {
            let nameInput = interaction.fields.getTextInputValue('nameInput');
            let oshiInput = interaction.fields.getTextInputValue('oshiInput');
            oshiInput = oshiInput.length>10 ? oshiInput.substring(0,9)+`...` : oshiInput;
            let otaRole = interaction.member.guild.roles.cache.find(role => role.name === "OTA");
            let isUserOtaRole = interaction.member.roles.cache.has(otaRole.id);
            if (otaRole && !isUserOtaRole) {
                interaction.guild.members.cache.get(interaction.member.user.id).roles.add(otaRole);
                interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput+'|'+oshiInput);
                interaction.reply(`${interaction.member.user} เพิ่ม Role OTA ให้นายท่านเรียบร้อยแล้วค่ะ`).then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }else {
                interaction.reply(`${interaction.member.user} นายท่านคะ, พอดีระบบมีปัญหา รบกวนนายท่านกดอีกรอบนะเจ้าคะ`).then(msg => { setTimeout(() => msg.delete(), 5000 ) });
            }
        }
    }
})

client.login(process.env.TOKEN);