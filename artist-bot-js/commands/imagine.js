const { Discord, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { config } = require('dotenv').config();

const configulation = new Configuration({
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configulation);

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('imagine')
		.setDescription('What your need a Image!')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('keyword image')
                .setRequired(true)),
	async execute(interaction, client) {
        console.log('interaction', interaction);
        await interaction.deferReply().catch(err => {});
        const keyword = interaction.options.getString('keyword')
        if(keyword===null) {
            await interaction.followUp(`คุณพี่ลืมใส่ความต้องการให้หนูนะ ${interaction.user}`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            try {
                const response = await openai.createImage({
                    prompt: `${keyword}`,
                    n: 1,
                    size: `1024x1024`
                })
                const image = response.data.data[0].url;

                const embed = new EmbedBuilder()
                                .setColor(0xC995C1)
                                .setTitle(`${keyword}`)
                                .setImage(image)
                                .setTimestamp()
                                .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                
                if(interaction.channelId==CH_INTRODUCTION_ID) {
                    await interaction.followUp({ content: `นี่นะคะรูปของคุณพี่ ${interaction.user}`, embeds: [embed] });
                    setTimeout(() => interaction.deleteReply(), 6000);
                }else {
                    await interaction.followUp({ content: `นี่นะคะรูปของคุณพี่ ${interaction.user}`, embeds: [embed] });
                }
            } catch (error) {
                console.error(`Error OpenAi:`, error);
                await interaction.followUp({ content: `มีบางอย่างผิดพลาด, ลองใหม่ภายหลัง ${interaction.user}` });
                setTimeout(() => interaction.deleteReply(), 6000);
            }
        }
	},
};