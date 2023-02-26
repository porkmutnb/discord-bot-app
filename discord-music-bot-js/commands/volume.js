const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set the music volume')
        .addStringOption(option => option.setName("number").setDescription("1-100").setRequired(true)),
	async execute(interaction, bot) {
        const string = interaction.options.getString("number")
        const volume = parseInt(string)
        const queue = bot.distube.getQueue(interaction);
        let resMsg = ``;
        if (!queue) {
            await interaction.followUp(`Mobile ไม่พบเพลงใน Queue เพิ่มเพลงก่อนนะคะ`);
        }else {
            if (isNaN(volume)) {
                resMsg = `Mobile ไม่เข้าใจระดับเพลงของคุณค่ะ`
            }else if (volume < 1) { 
                resMsg = `ปรับระดับเสียงต่ำกว่า 1 ไม่ได้นะคะ`
            }else if (volume > 100) {
                resMsg = `ปรับระดับเสียงมากกว่า 100 ไม่ได้นะคะ`
            }else {
                bot.distube.setVolume(interaction, volume);
                resMsg = `ปรับระดับเสียงเรียบร้อย ระดับเสียงที่คุณเลือกคือ **${volume}**`
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