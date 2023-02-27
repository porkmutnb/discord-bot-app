const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addplaylists')
		.setDescription('formPlaylist Song for you'),
	async execute(interaction, bot) {
        let resMsg = ``;
        const serverBoosterRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let isServerBooster = serverBoosterRole==undefined ? false : interaction.member.roles.cache.has(serverBoosterRole.id);
        if(isServerBooster) {
            interaction.user.send(`แบบฟอร์มสำหรับทำลิสต์เพลงสำหรับเซิฟเวอร์ ${interaction.member.guild.name} => ${process.env.GOOGLE_SHEET_URL}`);
            resMsg = `ส่งแบบฟอร์มทำลิสต์เพลงของเซิฟเวอร์ ${interaction.member.guild.name} เรียบร้อยแล้วค่ะ`
        }else {
            resMsg = `${serverBooster} Boost Server ให้เราหน่อยสิ! ${interaction.user}.`
        }
        const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`${resMsg}`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 6000);
    },
};