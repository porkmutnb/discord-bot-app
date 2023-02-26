const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Hi!'),
	async execute(interaction) {
        let resMsg = ``
        const introductionCh = interaction.guild.channels.cache.find(c => c.type === 0 && c.name === process.env.CH_INTRODUCTION_NAME)
        if(interaction.channelId==introductionCh.id) {
            resMsg = `เรียกอิชั้นทำไมคะนายท่าน, คิดถึงชั้นหรอ`
        }else {
            resMsg = `อิชั้นรับคำสั่งได้แค่ห้อง ${introductionCh} เท่านั้นนะคะ! ${interaction.user}.`
        }
        const embed = new EmbedBuilder()
                .setColor("#C995C1")
                .setTitle(`ยินดีต้อนรับนะคะ`)
                .setDescription(`${resMsg}`)
                .setTimestamp()
                .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
	},
};