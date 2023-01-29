const { Client, GatewayIntentBits, ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, 
        Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, StringSelectMenuBuilder
} = require('discord.js');
const { Modal, TextInputComponent, SelectMenuComponent } = require('discord-modals');
const { config } = require('dotenv').config();

const MEMBER_ID = process.env.MEMBER_ID
const GAMER_ID = process.env.GAMER_ID
const MC_GAMER_ID = process.env.MC_GAME_ID
const RDR_GAMER_ID = process.env.RDR_GAME_ID
const GTA_GAMER_ID = process.env.GTA_GAME_ID
const OTA_ID = process.env.OTA_ID
const FRIEND_ID = process.env.FRIEND_ID

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID
const CH_REQUEST_FRIEND_ID = process.env.CH_REQUEST_FRIEND_ID

const OWNER_ID = process.env.OWNER_ID
const ADMIN_ID = process.env.ADMIN_ID

const prefix = '!';

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
    client.user.setActivity(`${prefix} Pupe is watching`, { type: ActivityType.Watching });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (context) => {
    if(context.author.bot) {
        
    }else {
        if(context.channelId === CH_INTRODUCTION_ID) {
            if(context.content.startsWith(`${prefix}`)) {
                console.log('context', context);
                let isOwnerRole = context.member.roles.cache.has(OWNER_ID);
                let isAdminRole = context.member.roles.cache.has(ADMIN_ID);
                let isUserMemberRole = context.member.roles.cache.has(MEMBER_ID);
                if(context.content.toLowerCase() === `${prefix}ping`) {
                    context.reply('pong').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
                }else if(context.content.toLowerCase() === `${prefix}invite`) {
                    if(isUserMemberRole||isOwnerRole||isAdminRole) {
                        context.channel.createInvite(
                            {
                                maxAge: 24 * 3600, // maximum time for the invite, in milliseconds
                                maxUses: 5 // maximum times it can be used
                            },
                            `Requested with command by ${context.author.tag}`
                        ).then(invite => {
                            let linkInvite = `https://discord.gg/${invite.code}`
                            context.author.send(`คำชวนเข้าเซิฟของ ${context.guild.name} => ${linkInvite}`);
                        });
                    }else {
                        context.reply(`นายท่านไม่มีสิทธิใช้คำสั่งนี้นะคะ`).then(msg => { setTimeout(() => msg.delete(), 5000 ) });
                    }
                }else if(context.content.toLowerCase() === `${prefix}role`) {
                    const Member = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setCustomId('member')
                                            .setLabel('Member')
                                            .setDisabled(isUserMemberRole ? true : false)
                                            .setStyle(ButtonStyle.Primary),
                    );
                    let isUserGamerAllRole = context.member.roles.cache.has(GAMER_ID);
                    let isUserGamerMCRole = context.member.roles.cache.has(MC_GAMER_ID);
                    let isUserGamerRDRRole = context.member.roles.cache.has(RDR_GAMER_ID);
                    let isUserGamerGTARole = context.member.roles.cache.has(GTA_GAMER_ID);
                    let isUserGamerRole = isUserGamerAllRole && isUserGamerMCRole && isUserGamerRDRRole && isUserGamerGTARole;
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
                }else if(context.content.toLowerCase() === `${prefix}pupe`) {
                    context.reply('เรียกอิชั้นทำไมคะนายท่าน, คิดถึงชั้นหรอ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
                }else if(context.content.toLowerCase() === `${prefix}setup` && (isOwnerRole || isAdminRole)) {
                    const embed = new EmbedBuilder()
                            .setColor(0xC995C1)
                            .setTitle('คำสั่งของดิชั้นนะคะ')
                            .setDescription('Command for Assistance')
                            .addFields(
                                { name: '!role', value: 'ต้องการ Rold' },
                                { name: '!invite', value: 'ต้องการ Invite your friend [only 𝓜𝓔𝓜𝓑𝓔𝓡]' },
                                { name: '!pupe', value: 'คุยกับดิชั้น' },
                            )
                            .setTimestamp()
                            .setFooter({ text: `Powered by @cherMew` });
                    context.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send({ embeds: [embed] });
                }
                setTimeout(() => context.delete(), 3000 );
            }else if(context.content.startsWith('*')) {
            }else if(context.content.startsWith('>')) {
            }else if(context.content.startsWith('#')) {
            }else {
                context.reply('เพื่อรักษาความเรียบร้อย, อิชั้นขอลบโพสต์ที่ไม่เกี่ยวข้องนะคะ').then(msg => { setTimeout(() => msg.delete(), 5000 ) });
                setTimeout(() => context.delete(), 3000 );
            }
        }
    }
})

client.on(Events.InteractionCreate, async interaction => {
    console.log('interaction', interaction);
    if(interaction.customId === 'member') {
        const modal = new ModalBuilder()
                        .setCustomId('memberRequest')
                        .setTitle('แบบสอบถาม');
        const nameInput = new TextInputBuilder()
                        .setCustomId('nameInput')
                        .setLabel("อยากให้เรียกคุณว่า?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    }else if(interaction.customId === 'gamer') {
        const modal = new ModalBuilder()
                        .setCustomId('gameRequest')
                        .setTitle('แบบสอบถาม');
        const nameInput = new TextInputBuilder()
                        .setCustomId('nameInput')
                        .setLabel("อยากให้เรียกคุณว่า?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);
        const gameInput = new TextInputBuilder()
                        .setCustomId('gameInput')
                        .setLabel("คุณเล่นเกมอะไร?")
                        .setPlaceholder("Ex. [GTA, RDR, MINECRAFT, Other]")
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true);
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(gameInput);
        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);
    }else if(interaction.customId === 'friend') {
        const acceptFriend = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('acceptFriend')
                                .setLabel('Accept Friend')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Primary),
        );
        interaction.guild.channels.cache.find(i => i.id === CH_REQUEST_FRIEND_ID).send({ content: `มีสมาชิกท่านนี้ ${interaction.member.user}, แจ้งว่ารู้จักคุณ โปรดพิจารณา.`, components: [acceptFriend] });
        interaction.reply(`${interaction.member.user} รอ Owner อนุมัติการเพิ่ม Role FRIEND ให้นายท่านสักครู่นะคะ`);
    }else if(interaction.customId === 'ota') {
        const modal = new ModalBuilder()
			.setCustomId('otaRequest')
			.setTitle('แบบสอบถาม');
        const nameInput = new TextInputBuilder()
			.setCustomId('nameInput')
			.setLabel("อยากให้เรียกคุณว่า?")
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
        let friendRole = interaction.member.guild.roles.cache.find(role => role.id === FRIEND_ID);
        let isUserFriendRole = interaction.member.roles.cache.has(userId);
        if (friendRole && !isUserFriendRole) {
            console.log(client.users.cache.filter(u => u.id === userId));
            
            // interaction.guild.channels.cache.find(i => i.id === CH_INFORMATION_ID).send(`${client.users.cache.get(userId)} เพิ่ม Role FRIEND ให้นายท่านเรียบร้อยแล้วค่ะ`);
        }else {
            return;
        }
        console.log('userId =>', userId);
    }else if (interaction.isModalSubmit()) {
        if(interaction.customId === 'memberRequest') {
            let nameInput = interaction.fields.getTextInputValue('nameInput');
            let memberRole = interaction.member.guild.roles.cache.find(role => role.id === MEMBER_ID);
            let isUserMemberRole = interaction.member.roles.cache.has(memberRole.id);
            if (memberRole && !isUserMemberRole) {
                interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput);
                interaction.guild.members.cache.get(interaction.member.user.id).roles.add(memberRole);
                interaction.reply(`${interaction.member.user}เพิ่ม Role MEMBER ให้นายท่านเรียบร้อยแล้วค่ะ`);
            }
        }else if(interaction.customId === 'otaRequest') {
            let nameInput = interaction.fields.getTextInputValue('nameInput');
            let oshiInput = interaction.fields.getTextInputValue('oshiInput');
            oshiInput = oshiInput.length>10 ? oshiInput.substring(0,9)+`...` : oshiInput;
            let otaRole = interaction.member.guild.roles.cache.find(role => role.id === OTA_ID);
            let isUserOtaRole = interaction.member.roles.cache.has(otaRole.id);
            if (otaRole && !isUserOtaRole) {
                interaction.guild.members.cache.get(interaction.member.user.id).roles.add(otaRole);
                interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput+'|'+oshiInput);
                interaction.reply(`${interaction.member.user} เพิ่ม Role OTA ให้นายท่านเรียบร้อยแล้วค่ะ`);
            }
        }else if(interaction.customId === 'gameRequest') {
            let nameInput = interaction.fields.getTextInputValue('nameInput');
            let gameOption = interaction.fields.getTextInputValue('gameInput');
            let gameRole = "";
            switch (gameOption.toUpperCase()) {
                case "MINECRAFT":
                    gamerRole = interaction.member.guild.roles.cache.find(role => role.id === MC_GAMER_ID);
                    break;
                case "RDR":
                    gamerRole = interaction.member.guild.roles.cache.find(role => role.id === RDR_GAMER_ID);
                    break;
                case "GTA":
                    gamerRole = interaction.member.guild.roles.cache.find(role => role.id === GTA_GAMER_ID);
                    break;
                default:
                    gamerRole = interaction.member.guild.roles.cache.find(role => role.id === GAMER_ID);
                    break;
            }
            let isUserGamerRole = interaction.member.roles.cache.has(gameRole.id);
            if (gamerRole && !isUserGamerRole) {
                interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput);
                interaction.guild.members.cache.get(interaction.member.user.id).roles.add(gamerRole);
                interaction.reply(`${interaction.member.user} เพิ่ม Role ${gameOption} ให้นายท่านเรียบร้อยแล้วค่ะ`);
            }
        }
    }
})

client.login(process.env.TOKEN);