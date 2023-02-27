const { EmbedBuilder, PermissionsBitField } = require('discord.js');
require('dotenv').config();

module.exports.sendWelcomeMember = async (bot) => {
    try {
        let category = bot.guild.channels.cache.find(c => c.type === 4 && c.name === process.env.CAT_JOINANDLEAVE)
        if(category==undefined) {
            category = await bot.guild.channels.create({
                name: `${process.env.CAT_JOINANDLEAVE}`,
                type: 4
            });
        }
        let welcomeCh = bot.guild.channels.cache.find(c => c.type === 0 && c.name.includes(process.env.CH_WELCOME_NAME))
        if(!welcomeCh) {
            welcomeCh = await bot.guild.channels.create({
                name: `${process.env.CH_WELCOME_NAME}`,
                type: 0,
                parent: category.id,
                permissionOverwrites: [
                {
                    id: bot.guild.roles.everyone,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                    deny: [
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
                }
                ]
            });
        }
        if(!bot.user.bot) {
            const embed = new EmbedBuilder()
                    .setColor(0xC995C1)
                    .setTitle(`${bot.guild.name}`)
                    .setDescription(`Welcome ${bot.user} to server: ${bot.guild.name}.`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png`)
                    .setTimestamp()
                    .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${bot.guild.id}/${bot.guild.icon}.webp` });
            welcomeCh.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error('Error: sendWelcomeMember', error);
    }
}

module.exports.sendGoodBywMember = async (bot) => {
    try {
        let category = bot.guild.channels.cache.find(c => c.type === 4 && c.name === process.env.CAT_JOINANDLEAVE)
        if(category==undefined) {
            category = await bot.guild.channels.create({
                name: `${process.env.CAT_JOINANDLEAVE}`,
                type: 4
            });
        }
        let goodbyeCh = bot.guild.channels.cache.find(c => c.type === 0 && c.name.includes(process.env.CH_GOODBYE_NAME))
        if(!goodbyeCh) {
            goodbyeCh = await bot.guild.channels.create({
                name: `${process.env.CH_GOODBYE_NAME}`,
                type: 0,
                parent: category.id,
                permissionOverwrites: [
                {
                    id: bot.guild.roles.everyone,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                    deny: [
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
                }
                ]
            });
        }
        if(!bot.user.bot) {
            const embed = new EmbedBuilder()
                            .setColor(0x3AC1B0)
                            .setTitle(`${bot.guild.name}`)
                            .setDescription(`GoodBye ${bot.user}, Good luck of your path.`)
                            .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png`)
                            .setTimestamp()
                            .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${bot.guild.id}/${bot.guild.icon}.webp` });
            goodbyeCh.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error('Error: sendGoodBywMember', error);
    }
    
}