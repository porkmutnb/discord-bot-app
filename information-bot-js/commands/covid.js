const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();
const { getCovidSummaryAll, getCovidSummaryByCountry } = require('../function/reportCovid19');

const SERVER_ID = process.env.SERVER_ID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('covid')
        .setDescription('Summary Covid19 daily')
        .addStringOption(option =>
            option.setName('country_code')
                .setDescription('countryCode in your need')
                .setRequired(true)),
    async execute(interaction, client) {
        const guild = client.guilds.cache.get(SERVER_ID);
        const countryCode = interaction.options.getString('country_code').toString().toUpperCase();
        await interaction.deferReply().catch(err => {});
        let data = await getCovidSummaryByCountry(countryCode);
        const exampleEmbed = {
            color: 0xC995C1,
            title: 'รายงานผล Covid19 รายวัน',
            description: `รวมผล Covid19 ของ ${countryCode}`,
            fields: data,
            timestamp: new Date().toISOString(),
            footer: {
                text: `Powerd be cherMew`,
                icon_url: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`,
            },
        };
        await interaction.followUp({ embeds: [exampleEmbed] });
        setTimeout(() => interaction.deleteReply(), 15000);
    },
}