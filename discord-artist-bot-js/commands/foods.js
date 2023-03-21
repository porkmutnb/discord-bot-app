const { getDataFoodsList } = require('../function/retriveDataGoogleSheet');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('foods')
		.setDescription('what to eat'),
	async execute(interaction) {
        const foodsList = await getDataFoodsList();
        let resMsg = `กระเพราหมูสับไข่ดาว`
        if(foodsList.length>0) {
            let indexRan = Math.floor(Math.random() * foodsList.length);
            resMsg = `${foodsList[indexRan]}`
        }
        const embed = new EmbedBuilder()
                            .setColor("#C995C1")
                            .setTitle(`หนูรับทราบค่ะ`)
                            .setDescription(`ลองเมนูนี้ดูสิ ${resMsg}`)
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
        await interaction.followUp({embeds: [embed]});
        setTimeout(() => interaction.deleteReply(), 3000);
    },
};