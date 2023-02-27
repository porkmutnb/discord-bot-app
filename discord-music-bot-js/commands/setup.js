const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Command for me!'),
	async execute(interaction, bot) {
        const serverBoosterRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_SERVERBOOSTER_NAME);
        let isServerBooster = serverBoosterRole==undefined ? false : interaction.member.roles.cache.has(serverBoosterRole.id);
        const embed = new EmbedBuilder()
                .setColor(0xC995C1)
                .setTitle('ตู้เพลงโมบิล~~')
                .setDescription('Comeon comeon~ oh baby~~')
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahm5GFmrUM6TYVF4IDFFe7zVCg8rilXDopA&usqp=CAU')
                .addFields(
                    { name: '/hi', value: 'คุยกับหนู', inline: true  },
                    { name: '/play', value: 'หนูจะร้องเพลงให้ฟัง', inline: true },
                    { name: '/loop', value: 'เล่นเพลงตามคิว', inline: true },
                    { name: '/volume', value: 'เพิ่ม-ลดเสียงเพลง', inline: true },
                    { name: '/skip', value: 'ข้ามเพลง', inline: true },
                    { name: '/leave', value: 'let me go~~', inline: true },
                    { name: '/setup', value: `Command for me`, inline: false },
                    { name: '/playlists', value: `Add Song List`, inline: false },
                    { name: '/addplaylists', value: `Add Song List [only ${isServerBooster ? serverBoosterRole : 'Server Booster'}]`, inline: false },
                )
                .setImage('https://media.tenor.com/F614EKTYZngAAAAC/bnk48-mobile.gif')
                .setTimestamp()
                .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        let CH_MUSICBOT = interaction.guild.channels.cache.find(c => c.type === 0 &&  c.name === process.env.CH_MUSICBOT_NAME);
        if(CH_MUSICBOT) {
            await interaction.followUp({embeds: [embed]});
        }else {
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 6000);
        }
    },
};