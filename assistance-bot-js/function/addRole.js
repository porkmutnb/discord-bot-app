const {  } = require('discord.js');
const { config } = require('dotenv').config();

const MEMBER_ID = process.env.MEMBER_ID
const GAMER_ID = process.env.GAMER_ID
const MC_GAMER_ID = process.env.MC_GAME_ID
const RDR_GAMER_ID = process.env.RDR_GAME_ID
const GTA_GAMER_ID = process.env.GTA_GAME_ID
const OTA_ID = process.env.OTA_ID
const FRIEND_ID = process.env.FRIEND_ID

module.exports.memberAnswer = async (interaction) => {
    let nameInput = interaction.fields.getTextInputValue('nameInput');
    let memberRole = interaction.member.guild.roles.cache.find(role => role.id === MEMBER_ID);
    let isUserMemberRole = interaction.member.roles.cache.has(memberRole.id);
    if (memberRole && !isUserMemberRole) {
        interaction.guild.members.cache.get(interaction.member.user.id).setNickname(nameInput);
        interaction.guild.members.cache.get(interaction.member.user.id).roles.add(memberRole);
        interaction.reply(`${interaction.member.user}เพิ่ม Role MEMBER ให้นายท่านเรียบร้อยแล้วค่ะ`);
    }
}