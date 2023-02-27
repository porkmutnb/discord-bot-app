const { config } = require('dotenv').config();
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports.sendWelcomeMember = async (bot) => {
    const embed = new EmbedBuilder()
                    .setColor(0xC995C1)
                    .setTitle(`${bot.guild.name}`)
                    .setDescription(`Welcome ${bot.user} to server: ${bot.guild.name}.`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png`)
                    .setTimestamp()
                    .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${bot.guild.id}/${bot.guild.icon}.webp` });
    try {
        bot.guild.channels.cache.find(i => i.name === process.env.CH_WELCOME_NAME).send({ embeds: [embed] });
    } catch (error) {
        console.error('Error: sendWelcomeMember', error);
        bot.guild.channels.cache.find(i => i.type === 0).send({ embeds: [embed] });
    }
}

module.exports.sendGoodBywMember = async (bot) => {
    const embed = new EmbedBuilder()
                    .setColor(0x3AC1B0)
                    .setTitle(`${bot.guild.name}`)
                    .setDescription(`GoodBye ${bot.user}, Good luck of your path.`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png`)
                    .setTimestamp()
                    .setFooter({ text: `Powered by @cherMew`, iconURL: `https://cdn.discordapp.com/icons/${bot.guild.id}/${bot.guild.icon}.webp` });
    try {
        bot.guild.channels.cache.find(i => i.name === process.env.CH_GOODBYE_NAME).send({ embeds: [embed] });
    } catch (error) {
        console.error('Error: sendGoodBywMember', error);
        bot.guild.channels.cache.find(i => i.type === 0).send({ embeds: [embed] });
    }
    
}