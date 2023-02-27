const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dlt')
		.setDescription('Remove all text channel!')
        .addStringOption(option =>
            option.setName('chnd')
                .setDescription('channelId in your need')
                .setRequired(true)),
	async execute(interaction) {
        const ownerRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_OWNER_NAME);
        const adminRole = interaction.member.guild.roles.cache.find(role => role.name === process.env.ROLE_ADMIN_NAME);
        let isOwner = ownerRole==undefined ? false : interaction.member.roles.cache.has(ownerRole.id);
        let isAdmin = adminRole==undefined ? false : interaction.member.roles.cache.has(adminRole.id);
        let resMsg = ``;
        if(isOwner||isAdmin) {
            let channelId = interaction.options.getString('chnd')
            if(parseInt(channelId)) {

                // console.log('interaction', interaction);
                const channelObj = await interaction.member.guild.channels.cache.find(i => i.id == channelId);
                // console.log('channelObj', channelObj);
                if(channelObj!=undefined) {
                    await interaction.member.guild.channels.cache.find(i => i.id == channelId).messages.fetch().then(async messages => {
                        //Iterate through the messages here with the variable "messages".
                        await messages.forEach(async message => {
                            message.delete();
                        })
                    });
                }
            }else {
                resMsg =`channelId: ${channelId} is incorrect.`
            }
        }else {
            resMsg = `คำสั่งนี้สงวนไว้เฉพาะ ${ownerRole==undefined ? 'Owner' : ownerRole} ${adminRole==undefined ? 'Admin' : adminRole} เท่านั้นนะคะ ${interaction.user}`
        }
        if(resMsg!=``) {
            const embed = new EmbedBuilder()
                                .setColor("#C995C1")
                                .setTitle(`สวัสดีค่ะ`)
                                .setDescription(`${resMsg}`)
                                .setTimestamp()
                                .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};