const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'messageCreate',
	async execute(bot) {
        if(bot.author.bot)  return;
        const introductionCh = bot.guild.channels.cache.find(c => c.type===0 && c.name === process.env.CH_INTRODUCTION_NAME)
        if(introductionCh) {
            const message = bot.content
            if(introductionCh.id===bot.channelId) {
                const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`ยินดีต้อนรับนะคะ`)
                            .setDescription(`เพื่อรักษาความเรียบร้อย, อิชั้นขอลบโพสต์ที่ไม่เกี่ยวข้องนะคะ \n ${message}`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${bot.guild.id}/${bot.guild.icon}.webp` });
                await bot.reply({embeds: [embed]}).then(msg => {
                    setTimeout(() => { msg.delete() }, 3000);
                })
                bot.delete();
            }
        }
    },
};