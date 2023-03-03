const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'messageCreate',
	async execute(bot) {
        if(bot.author.bot) return;
        const isLink = bot.content.includes('https://www.youtube.com') || bot.content.includes('https://open.spotify.com')
        let musicBotCh = bot.guild.channels.cache.find(c => c.type === 0 &&  c.name === process.env.CH_MUSICBOT_NAME);
        if(musicBotCh) {
            if(musicBotCh.id===bot.channelId) {
                if(isLink) {
                    const embed = new EmbedBuilder()
                                    .setColor("#C995C1")
                                    .setTitle(`อยากฟังเพลงใช่ไหมคะ`)
                                    .setDescription(`แนะนำไปใช้คำสั่ง /play นะคะ \n ${bot.content}`)
                                    .setTimestamp()
                                    .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${bot.guild.id}/${bot.guild.icon}.webp` });
                    await bot.reply({embeds: [embed]}).then(msg => {
                        setTimeout(() => { msg.delete() }, 3000);
                    })
                }
                bot.delete();
            }
        }
    },
};