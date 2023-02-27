const { getCovidSummaryByCountry } = require('../function/reportCovid19');
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const SERVER_ID = process.env.SERVER_ID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('covid')
        .setDescription('Summary Covid19 daily')
        .addStringOption(option =>
            option.setName('country_code')
                .setDescription('countryCode in your need')
                .setRequired(true)),
    async execute(interaction) {
        const countryCode = interaction.options.getString('country_code').toString().toUpperCase();
        let data = await getCovidSummaryByCountry(countryCode);
        const exampleEmbed = {
            color: 0xC995C1,
            title: 'รายงานผล Covid19 รายวัน',
            description: `รวมผล Covid19 ของ ${countryCode}`,
            fields: data,
            timestamp: new Date().toISOString(),
            footer: {
                text: `Powerd be cherMew`,
                icon_url: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp`,
            },
        };
        await interaction.followUp({ embeds: [exampleEmbed] });
        setTimeout(() => interaction.deleteReply(), 15000);
    },
}