const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID

const MEMBER_ID = process.env.MEMBER_ID
const GAMER_ID = process.env.GAMER_ID
const MC_GAMER_ID = process.env.MC_GAME_ID
const RDR_GAMER_ID = process.env.RDR_GAME_ID
const GTA_GAMER_ID = process.env.GTA_GAME_ID
const OTA_ID = process.env.OTA_ID
const FRIEND_ID = process.env.FRIEND_ID

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Want your Role'),
	async execute(interaction) {
        if(interaction.channelId==CH_INTRODUCTION_ID) {
            await interaction.deferReply().catch(err => {})
            let isUserMemberRole = interaction.member.roles.cache.has(MEMBER_ID);
            const Member = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('memberRequest')
                                    .setLabel('Member')
                                    .setDisabled(isUserMemberRole ? true : false)
                                    .setStyle(ButtonStyle.Primary),
            );
            let isUserGamerAllRole = interaction.member.roles.cache.has(GAMER_ID);
            let isUserGamerMCRole = interaction.member.roles.cache.has(MC_GAMER_ID);
            let isUserGamerRDRRole = interaction.member.roles.cache.has(RDR_GAMER_ID);
            let isUserGamerGTARole = interaction.member.roles.cache.has(GTA_GAMER_ID);
            let isUserGamerRole = isUserGamerAllRole && isUserGamerMCRole && isUserGamerRDRRole && isUserGamerGTARole;
            const Gamer = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('gamerRequest')
                                    .setLabel('Gamer')
                                    .setDisabled(isUserGamerRole ? true : false)
                                    .setStyle(ButtonStyle.Secondary),
            );
            let isUserOtaRole = interaction.member.roles.cache.has(OTA_ID);
            const Ota = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('otaRequest')
                                    .setLabel('OTA')
                                    .setDisabled(isUserOtaRole ? true : false)
                                    .setStyle(ButtonStyle.Success),
            );
            let isUserFriendRole = interaction.member.roles.cache.has(FRIEND_ID);
            const Friend = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('friendRequest')
                                    .setLabel('Friend')
                                    .setDisabled(isUserFriendRole ? true : false)
                                    .setStyle(ButtonStyle.Danger),
            );
            interaction.followUp({ content: 'ต้องการ Role หรือคะ นายท่าน,', components: [Member,Gamer,Ota, Friend] }).then(msg => { setTimeout(() => msg.delete(), 10000 ) });
        }else {
            await interaction.reply(`Pupe รับคำสั่งได้แค่ห้อง introduction เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};