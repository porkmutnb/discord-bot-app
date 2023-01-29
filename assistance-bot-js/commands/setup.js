const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Replies with Manual!'),
	async execute(interaction) {
        if(interaction.channelId==CH_INTRODUCTION_ID) {
            let isOwner = interaction.member.roles.cache.has(OWNER_ID);
            let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
            if(isOwner||isAdmin) {
                const embed = new EmbedBuilder()
                            .setColor(0xC995C1)
                            .setTitle('คำสั่งของดิชั้นนะคะ')
                            .setDescription('Command for Assistance')
                            .addFields(
                                { name: '/pupe', value: 'คุยกับดิชั้น', inline: true },
                                { name: '/role', value: 'ต้องการ Role', inline: true },
                                { name: '/invite', value: 'ต้องการ Invite your friend [only 𝓜𝓔𝓜𝓑𝓔𝓡]', inline: false },
                                { name: '/setup', value: 'Command for Assistance [only 𝓞𝓦𝓝𝓔𝓡, 𝓐𝓓𝓜𝓘𝓝]', inline: false }
                            )
                            .setTimestamp()
                            .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                interaction.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send({ embeds: [embed] });
                await interaction.reply(`Commands is ready...`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }else {
                await interaction.followUp({content: `ฐานันดร นายท่านไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`})
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }else {
            await interaction.followUp({content: `Pupe รับคำสั่งได้แค่ห้อง introduction เท่านั้นนะคะ! ${interaction.user}.`})
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};