const { Client, Collection, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const { config } = require('dotenv').config();

const MEMBER_ID = process.env.MEMBER_ID
const GAMER_ID = process.env.GAMER_ID
const MC_GAMER_ID = process.env.MC_GAME_ID
const RDR_GAMER_ID = process.env.RDR_GAME_ID
const GTA_GAMER_ID = process.env.GTA_GAME_ID
const OTA_ID = process.env.OTA_ID

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

module.exports.addRoleFunction = async (interaction, client) => {
    console.log('interaction', interaction);
    console.log('client', client);
    if(interaction.customId==='memberForm') {
        let nameInput = interaction.fields.getTextInputValue('nameInput');
        let memberRole = interaction.member.guild.roles.cache.find(role => role.id === MEMBER_ID);
        let isUserMemberRole = interaction.member.roles.cache.has(memberRole.id);
        if (memberRole && !isUserMemberRole) {
            interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput);
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(memberRole);
            await interaction.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send(`${interaction.member.user}เพิ่ม Role ${memberRole} ให้นายท่านเรียบร้อยแล้วค่ะ`)
            setTimeout(() => interaction.deleteReply(), 3000);
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
            await interaction.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send(`${interaction.member.user}เพิ่ม Role ${gamerRole} ให้นายท่านเรียบร้อยแล้วค่ะ`)
            setTimeout(() => interaction.deleteReply(), 3000);
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
            await interaction.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send(`${interaction.member.user}เพิ่ม Role ${otaRole} ให้นายท่านเรียบร้อยแล้วค่ะ`)
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    }
    return;
}