const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Next song for music queue'),
	async execute(interaction, bot) {
        const queue = bot.distube.getQueue(interaction);
        let resMsg = ``;
        if(queue.songs.length>1) {
            bot.distube.skip(interaction);
            resMsg = `เล่นเพลงถัดไปสำเร็จ. ${interaction.user}`
        }else {
            resMsg = `ไม่มีคิวเพลงแล้วน้าา~~. ${interaction.user}`
        }
        const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`${resMsg}`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};