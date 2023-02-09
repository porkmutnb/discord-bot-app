const { Discord, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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

module.exports.formRequestFunction = async (interaction, client) => {
    if(interaction.customId==='memberRequest') {
        const modal = new ModalBuilder()
                    .setCustomId('memberForm')
                    .setTitle('แบบสอบถาม');
        const nameInput = new TextInputBuilder()
                        .setCustomId('nameInput')
                        .setLabel("อยากให้เรียกคุณว่า?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    }else if(interaction.customId==='gamerRequest') {
        const modal = new ModalBuilder()
                    .setCustomId('gamerForm')
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
    }else if(interaction.customId==='otaRequest') {
        const modal = new ModalBuilder()
            .setCustomId('otaForm')
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
    }else if(interaction.customId==='friendRequest') {
        const friendRole = interaction.member.guild.roles.cache.find(role => role.id === FRIEND_ID);
        const roleConfirmMsg = `มีสมาชิกท่านนี้ ${interaction.member.user} ต้องการ Role ${friendRole}, แจ้งว่ารู้จักคุณ โปรดพิจารณา.`;
        const acceptFriend = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`friendApprove|${interaction.member.user.id}`)
                                .setLabel('Accept Friend')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Primary),
        );
        const confirmMessage = await interaction.guild.channels.cache.find(i => i.id === CH_REQUEST_FRIEND_ID).send({ content: roleConfirmMsg, components: [acceptFriend] });
        await interaction.deferReply().catch(err => {});
        interaction.followUp(`${interaction.member.user} รอ Owner อนุมัติการเพิ่ม Role ${friendRole} ให้นายท่านสักครู่นะคะ`)
        setTimeout(() => interaction.deleteReply(), 3000);
    }
}