const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');
const { config } = require('dotenv').config();

module.exports.memberRequest = async (interaction) => {
    const modal = new ModalBuilder()
                    .setCustomId('memberAnswer')
                    .setTitle('แบบสอบถาม');
    const nameInput = new TextInputBuilder()
                    .setCustomId('nameInput')
                    .setLabel("อยากให้เรียกคุณว่า?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
    const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);
};