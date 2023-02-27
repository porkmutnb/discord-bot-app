const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Permissions, PermissionsBitField } = require('discord.js')
const { roleList } = require('../asset/data.json')
require('dotenv').config();

module.exports.prepareServerAuthor = async (bot) => {
    let roleNotUseList = [];
    for (let index = 0; index < roleList.length; index++) {
        const element = roleList[index];
        const ROLE = await bot.roles.cache.find(r => r.name === element.name)
        if(!ROLE) {
            const newRole = await bot.roles.create({
                name: `${element.name}`,
                color: `${element.color}`,
                permissions: [
                    PermissionsBitField.Flags.AddReactions,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.Connect,
                    PermissionsBitField.Flags.CreatePublicThreads,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.MentionEveryone,
                    PermissionsBitField.Flags.ReadMessageHistory,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.SendMessagesInThreads,
                    PermissionsBitField.Flags.SendTTSMessages,
                    PermissionsBitField.Flags.Speak,
                    PermissionsBitField.Flags.Stream,
                    PermissionsBitField.Flags.UseApplicationCommands,
                    PermissionsBitField.Flags.UseEmbeddedActivities,
                    PermissionsBitField.Flags.UseExternalEmojis,
                    PermissionsBitField.Flags.UseExternalStickers,
                    PermissionsBitField.Flags.ViewChannel
                ],
                reason: `${element.reason}`
            })
            console.log('newRole', newRole.id, newRole.name);
        }
        if(['Owner', 'Admin'].includes(element.name)) {
            roleNotUseList.push(element.name)
        }
    }
    return roleNotUseList
}

module.exports.formRequestFunction = async (interaction) => {
    try {
        console.log('interaction', interaction);
        if(interaction.customId==`Friend`) {
            let ownerRole = interaction.member.guild.roles.cache.find(r => r.name.includes(process.env.ROLE_OWNER_NAME))
            if(ownerRole) {
                let category = interaction.member.guild.channels.cache.find(c => c.type === 4 && c.name.includes(process.env.CAT_OWNERZONE))
                if(category==undefined) {
                    category = await interaction.member.guild.channels.create({
                        name: `${process.env.CAT_OWNERZONE}`,
                        type: 4
                    });
                }
                let requestFriendCh = interaction.member.guild.channels.cache.find(c => c.type === 0 && c.name.includes(process.env.CH_REQUESTFRIEND_NAME))
                if(!requestFriendCh) {
                    requestFriendCh = await interaction.member.guild.channels.create({
                        name: `${process.env.CH_REQUESTFRIEND_NAME}`,
                        type: 0,
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: ownerRole.id,
                                allow: [
                                    PermissionsBitField.Flags.Administrator,
                                    PermissionsBitField.Flags.ViewChannel,
                                    PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.AddReactions,
                                    PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.CreatePrivateThreads,
                                    PermissionsBitField.Flags.CreatePublicThreads,
                                    PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageEmojisAndStickers,
                                    PermissionsBitField.Flags.ManageEvents,
                                    PermissionsBitField.Flags.ManageGuild,
                                    PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageThreads,
                                    PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone,
                                    PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendMessagesInThreads,
                                    PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseEmbeddedActivities,
                                    PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.UseVAD,
                                    PermissionsBitField.Flags.ViewAuditLog,
                                    PermissionsBitField.Flags.ViewGuildInsights
                                ],
                            },
                            {
                                id: interaction.member.guild.roles.everyone,
                                deny: [
                                    PermissionsBitField.Flags.Administrator,
                                    PermissionsBitField.Flags.ViewChannel,
                                    PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.AddReactions,
                                    PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.CreatePrivateThreads,
                                    PermissionsBitField.Flags.CreatePublicThreads,
                                    PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageEmojisAndStickers,
                                    PermissionsBitField.Flags.ManageEvents,
                                    PermissionsBitField.Flags.ManageGuild,
                                    PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageThreads,
                                    PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone,
                                    PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendMessagesInThreads,
                                    PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseEmbeddedActivities,
                                    PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.UseVAD,
                                    PermissionsBitField.Flags.ViewAuditLog,
                                    PermissionsBitField.Flags.ViewGuildInsights
                                ]
                            }
                        ]
                    });
                }
                const friendRole = interaction.member.guild.roles.cache.find(role => role.name === interaction.customId);
                const roleConfirmMsg = `มีสมาชิกท่านนี้ ${interaction.member.user} ต้องการ Role ${friendRole}, แจ้งว่ารู้จักคุณ โปรดพิจารณา.`;
                const acceptFriend = new ActionRowBuilder().addComponents(
                                        new ButtonBuilder()
                                            .setCustomId(`friendApprove|${interaction.member.user.id}`)
                                            .setLabel('Accept Friend')
                                            .setDisabled(false)
                                            .setStyle(ButtonStyle.Primary),
                );
                requestFriendCh.send({ content: roleConfirmMsg, components: [acceptFriend] });
                interaction.followUp(`${interaction.member.user} รอ Owner อนุมัติการเพิ่ม Role ${friendRole} ให้นายท่านสักครู่นะคะ`)
                setTimeout(() => interaction.deleteReply(), 7000);
            }else {
                throw new Error('Not found Owner Role');
            }
        }else {
            throw new Error(`${interaction.customId} is not complete.`);
        }
    } catch (error) {
        console.log('Error addRoleFunction:', error);
        await interaction.followUp(`มีบางอย่างผิดพลาด, ลองใหม่ภายหลัง ${interaction.user}`);
        setTimeout(() => interaction.deleteReply(), 7000);
    }
}

module.exports.addRoleFunction = async (interaction) => {
    try {
        if(interaction.customId.indexOf('friendApprove')>-1) {
            let category = interaction.member.guild.channels.cache.find(c => c.type === 4 && c.name.includes(process.env.CAT_INTRODUCTIONZONE))
            if(category==undefined) {
                category = await interaction.member.guild.channels.create({
                    name: `${process.env.CAT_INTRODUCTIONZONE}`,
                    type: 4
                });
            }
            let introductionCh = interaction.member.guild.channels.cache.find(c => c.type === 0 && c.name.includes(process.env.CH_INTRODUCTION_NAME))
            if(!introductionCh) {
                introductionCh = await interaction.member.guild.channels.create({
                    name: `${process.env.CH_INTRODUCTION_NAME}`,
                    type: 0,
                    parent: category.id,
                    permissionOverwrites: [{
                        id: interaction.member.guild.roles.everyone,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.AddReactions,
                            PermissionsBitField.Flags.AttachFiles,
                            PermissionsBitField.Flags.CreateInstantInvite,
                            PermissionsBitField.Flags.CreatePrivateThreads,
                            PermissionsBitField.Flags.CreatePublicThreads,
                            PermissionsBitField.Flags.EmbedLinks,
                            PermissionsBitField.Flags.ManageChannels,
                            PermissionsBitField.Flags.ManageEmojisAndStickers,
                            PermissionsBitField.Flags.ManageEvents,
                            PermissionsBitField.Flags.ManageGuild,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.ManageThreads,
                            PermissionsBitField.Flags.ManageWebhooks,
                            PermissionsBitField.Flags.MentionEveryone,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.SendMessagesInThreads,
                            PermissionsBitField.Flags.SendTTSMessages,
                            PermissionsBitField.Flags.UseApplicationCommands,
                            PermissionsBitField.Flags.UseEmbeddedActivities,
                            PermissionsBitField.Flags.UseExternalEmojis,
                            PermissionsBitField.Flags.UseExternalStickers,
                            PermissionsBitField.Flags.UseVAD,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ViewGuildInsights
                        ],
                    }]
                });
            }
            const friendRole = interaction.member.guild.roles.cache.find(role => role.name === `Friend`);
            let userId = interaction.customId.split('|')[1];
            const members = await interaction.member.guild.members.fetch();
            const member = members.find((m) => m.id === userId);
            member.roles.add(friendRole);
            introductionCh.send(`${member} เพิ่ม Role ${friendRole} ให้นายท่านเรียบร้อยแล้วค่ะ`).then(msg => setTimeout(() => msg.delete(), 7000))
            setTimeout(() => interaction.message.delete(), 6000);
            await interaction.followUp(`เพิ่ม Role ${friendRole} ให้ ${member} เรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }else {
            let ROLE = interaction.member.guild.roles.cache.find(role => role.name === interaction.customId);
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(ROLE);
            await interaction.followUp(`${interaction.member.user}เพิ่ม Role ${ROLE} ให้นายท่านเรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 7000);
        }
    } catch (error) {
        console.log('Error addRoleFunction:', error);
        await interaction.followUp(`มีบางอย่างผิดพลาด, ลองใหม่ภายหลัง ${interaction.user}`);
        setTimeout(() => interaction.deleteReply(), 7000);
    }
}