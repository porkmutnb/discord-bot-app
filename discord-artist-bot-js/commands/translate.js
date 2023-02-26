const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Englisg to Thai translate.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('text input')
                .setRequired(true))
        .addStringOption(option =>
                    option.setName('to')
                        .setDescription('to language')
                        .setRequired(true)),
	async execute(interaction, client) {
        const text = interaction.options.getString('text')
        const to = interaction.options.getString('to')
        if(text==null || to==null) {
            await interaction.followUp(`คุณพี่ลืมใส่ความต้องการให้หนูนะ ${interaction.user}`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            if(!['en','th'].includes(to)) {
                await interaction.followUp(`แปลเฉพาะ th หรือ en เท่านั้น ${interaction.user}`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }else {
                translate(`${text}`, {to: `${to}`}).then(async res => {
                    console.log('res =>', res);
                    const embed = new EmbedBuilder()
                                    .setColor(0xC995C1)
                                    .setTitle(`${text} คำนี้ในภาษา ${to}`)
                                    .setDescription(`แปลว่า ${res.text}`)
                                    .setTimestamp()
                                    .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });

                    let CH_INTRODUCTION = interaction.guild.channels.cache.find(c => c.type === 0 &&  c.name === process.env.CH_INTRODUCTION_NAME);
                    if(interaction.channelId==CH_INTRODUCTION.id) {
                        await interaction.followUp({ content: `${interaction.user}`, embeds: [embed] });
                        setTimeout(() => interaction.deleteReply(), 6000);
                    }else {
                        await interaction.followUp({ content: `${interaction.user}`, embeds: [embed] });
                    }
                }).catch(async error => {
                    console.error(`Error GoogleTranslateAPI:`, error);
                    await interaction.followUp({ content: `มีบางอย่างผิดพลาด, ลองใหม่ภายหลัง ${interaction.user}` });
                    setTimeout(() => interaction.deleteReply(), 6000);
                });
            }
        }
    },
};