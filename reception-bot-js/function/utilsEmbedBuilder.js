const { config } = require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

const CH_WELCOME_ID = process.env.CH_WELCOME_ID;
const CH_GOODBYE_ID = process.env.CH_GOODBYE_ID;

module.exports.sendWelcomeMember = async (client) => {
    const embed = new EmbedBuilder()
    .setColor(0xC995C1)
    .setTitle(`${client.guild.name}`)
    .setDescription(`Welcome ${client.user} to server: ${client.guild.name}.`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`)
    .setTimestamp()
    .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${client.guild.id}/${client.guild.icon}.webp` });
    client.guild.channels.cache.find(i => i.id == CH_WELCOME_ID).send({ embeds: [embed] });
}

module.exports.sendGoodBywMember = async (client) => {
    const embed = new EmbedBuilder()
                        .setColor(0x3AC1B0)
                        .setTitle(`${client.guild.name}`)
                        .setDescription(`GoodBye ${client.user}, Good luck of your path.`)
                        .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`)
                        .setTimestamp()
                        .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${client.guild.id}/${client.guild.icon}.webp` });
    client.guild.channels.cache.find(i => i.id == CH_GOODBYE_ID).send({ embeds: [embed] });
}