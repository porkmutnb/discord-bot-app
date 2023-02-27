const { PermissionsBitField } = require('discord.js');
require('dotenv').config();

module.exports.getOnlyUsers = async (interaction) => {
    try {
        let category = interaction.member.guild.channels.cache.find(c => c.type === 4 && c.name === process.env.CAT_SERVERSTAT)
        if(category==undefined) {
            category = await interaction.member.guild.channels.create({
                name: `${process.env.CAT_SERVERSTAT}`,
                type: 4
            });
        }
        const users = await interaction.member.guild.memberCount;
        const TotalUsers = await interaction.member.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALUSERS))
        if(!TotalUsers) {
            await interaction.member.guild.channels.create({
                name: `${process.env.CH_TOTALUSERS} ${users}`,
                type: 2,
                parent: category.id,
                permissionOverwrites: [
                {
                    id: interaction.member.guild.roles.everyone,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.Connect],
                }
                ]
            });
        }else {
            await TotalUsers.setName(`${process.env.CH_TOTALUSERS} ${users}`)
        }
    } catch (error) {
        console.error('Error getOnlyUsers:', error);
    }
    
}

module.exports.getAllUsers = async (client) => {
    try {
        let users = client.guild.memberCount, members = 0, bots = 0;
        const membersList = await client.guild.members.fetch();
        await membersList.map(async (member) => {
            if(!member.user.bot && member._roles.length>0) {
                members++;
            }
            if(member.user.bot) {
                bots++;
            }
        })
        console.log(`users:${users}, members:${members}, bots:${bots}`);
        let category = client.guild.channels.cache.find(c => c.type === 4 && c.name === process.env.CAT_SERVERSTAT)
        if(!category) {
            category = await client.guild.channels.create({
                name: `${process.env.CAT_SERVERSTAT}`,
                type: 4
            });
        }
        const TotalUsers = await client.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALUSERS))
        if(!TotalUsers) {
            await client.guild.channels.create({
                name: `${process.env.CH_TOTALUSERS} ${users}`,
                type: 2,
                parent: category.id,
                permissionOverwrites: [
                  {
                    id: client.guild.roles.everyone,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.Connect],
                  }
                ]
            });
        }else {
            await TotalUsers.setName(`${process.env.CH_TOTALUSERS} ${users}`)
        }
        const TotalMembers = await client.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALMEMBERS))
        if(!TotalMembers) {
            await client.guild.channels.create({
                name: `${process.env.CH_TOTALMEMBERS} ${members}`,
                type: 2,
                parent: category.id,
                permissionOverwrites: [
                  {
                    id: client.guild.roles.everyone,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.Connect],
                  }
                ]
            });
        }else {
            await TotalMembers.setName(`${process.env.CH_TOTALMEMBERS} ${members}`)
        }
        const TotalBots = await client.guild.channels.cache.find(c => c.type === 2 && c.name.includes(process.env.CH_TOTALBOT))
        if(!TotalBots) {
            await client.guild.channels.create({
                name: `${process.env.CH_TOTALBOT} ${bots}`,
                type: 2,
                parent: category.id,
                permissionOverwrites: [
                  {
                    id: client.guild.roles.everyone,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.Connect],
                  }
                ]
            });
        }else {
            await TotalBots.setName(`${process.env.CH_TOTALBOT} ${bots}`)
        }
    } catch (error) {
        console.error('Error getAllUsers:', error);
    }
}