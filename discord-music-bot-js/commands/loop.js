const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('You loop the song')
        .addStringOption(option => option.setName("number").setDescription("0=No, 1=One song, 2=Queue song, default=2").setRequired(false)),
	async execute(interaction, bot) {
        const string = interaction.options.getString("number");
        let volume = parseInt(string);
        volume = (isNaN(volume)) ? 2 : volume;
        const queue = bot.distube.getQueue(interaction);
        let resMsg = ``;
        if (!queue) {
            resMsg = `หนูไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`
        }else {
            
            if(volume==1) {
                resMsg = `(เล่นซ้ำเพลงเดิม)`;
                bot.distube.setRepeatMode(interaction, 1);
            }else if(volume==2) {
                resMsg = `(เล่นซ้ำคิวเพลง)`;
                bot.distube.setRepeatMode(interaction, 2);
            }else {
                resMsg = `(เล่นจบคิว)`;
                bot.distube.setRepeatMode(interaction, 0);
            }
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