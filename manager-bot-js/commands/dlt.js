const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dlt')
		.setDescription('Remove all text channel!')
        .addStringOption(option =>
            option.setName('chnd')
                .setDescription('channelId in your need')
                .setRequired(true)),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        let isOwner = interaction.member.roles.cache.has(OWNER_ID);
        let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
        if(isOwner||isAdmin) {
            let channelId = interaction.options.getString('chnd')
            if(parseInt(channelId)) {

                // console.log('interaction', interaction);
                const channelObj = await interaction.member.guild.channels.cache.find(i => i.id == channelId);
                // console.log('channelObj', channelObj);
                if(channelObj!=undefined) {
                    await client.channels.cache.find(i => i.id == channelId).messages.fetch().then(messages => {
                        //Iterate through the messages here with the variable "messages".
                        messages.forEach(message => {
                            message.delete();
                        })
                    });
                }
                await interaction.followUp(`Deleted is completed. Qty. `);
            }else {
                await interaction.followUp(`channelId: ${channelId} is incorrect.`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }else {
            await interaction.followUp({content: `ฐานันดร ไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`})
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};