const { Client, Collection, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const { config } = require('dotenv').config();

const SERVER_ID = process.env.SERVER_ID

const MEMBER_ID = process.env.MEMBER_ID
const GAMER_ID = process.env.GAMER_ID
const MC_GAMER_ID = process.env.MC_GAME_ID
const RDR_GAMER_ID = process.env.RDR_GAME_ID
const GTA_GAMER_ID = process.env.GTA_GAME_ID
const OTA_ID = process.env.OTA_ID
const FRIEND_ID = process.env.FRIEND_ID

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

module.exports.addRoleFunction = async (interaction, client) => {
    console.log('*'.repeat(50), '[START] addRole', '*'.repeat(50));
    console.log('interaction', interaction);
    console.log('client', client);
    await interaction.deferReply().catch(err => {});
    if(interaction.customId==='memberForm') {
        let nameInput = interaction.fields.getTextInputValue('nameInput');
        let memberRole = interaction.member.guild.roles.cache.find(role => role.id === MEMBER_ID);
        let isUserMemberRole = interaction.member.roles.cache.has(memberRole.id);
        if (memberRole && !isUserMemberRole) {
            interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput);
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(memberRole);
            await interaction.followUp(`${interaction.member.user}เพิ่ม Role ${memberRole} ให้นายท่านเรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }else {
            await interaction.followUp(`${interaction.member.user} นายท่านมี Role ${memberRole} อยู่แล้วนะคะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }
    }else if(interaction.customId==='gamerForm') {
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
            await interaction.followUp(`${interaction.member.user}เพิ่ม Role ${gamerRole} ให้นายท่านเรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }else {
            await interaction.followUp(`${interaction.member.user} นายท่านมี Role ${gamerRole} อยู่แล้วนะคะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }
    }else if(interaction.customId==='otaForm') {
        let nameInput = interaction.fields.getTextInputValue('nameInput');
        let oshiInput = interaction.fields.getTextInputValue('oshiInput');
        oshiInput = oshiInput.length>10 ? oshiInput.substring(0,9)+`...` : oshiInput;
        let otaRole = interaction.member.guild.roles.cache.find(role => role.id === OTA_ID);
        let isUserOtaRole = interaction.member.roles.cache.has(otaRole.id);
        if (otaRole && !isUserOtaRole) {
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(otaRole);
            interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput+'|'+oshiInput);
            await interaction.followUp(`${interaction.member.user}เพิ่ม Role ${otaRole} ให้นายท่านเรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }else {
            await interaction.followUp(`${interaction.member.user} นายท่านมี Role ${otaRole} อยู่แล้วนะคะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        }
    }else if(interaction.customId.indexOf('friendApprove')>-1) {
        const friendRole = interaction.member.guild.roles.cache.find(role => role.id === FRIEND_ID);
        let userId = interaction.customId.split('|')[1];
        console.log('userId', userId);
        const members = await client.guilds.cache.get(SERVER_ID).members.fetch();
        const member = members.find((m) => m.id === userId);
        console.log('member', member);
        member.roles.add(friendRole);
        interaction.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send(`${member} เพิ่ม Role ${friendRole} ให้นายท่านเรียบร้อยแล้วค่ะ`).then(msg => {
            setTimeout(() => msg.delete(), 5000);
        });
        setTimeout(() => {
            interaction.message.delete();
        }, 5000);
        await interaction.followUp(`เพิ่ม Role ${friendRole} ให้ ${member} เรียบร้อยแล้วค่ะ`);
        setTimeout(() => interaction.deleteReply(), 5000);
    }
    console.log('*'.repeat(50), '[END] addRole', '*'.repeat(50));
}