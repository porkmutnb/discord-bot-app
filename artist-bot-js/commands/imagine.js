const { Discord, SlashCommandBuilder } = require('discord.js');
const DIG = require("discord-image-generation");
const { config } = require('dotenv').config();

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
            // Get the avatarUrl of the user
            let avatar = interaction.user.displayAvatarURL({
                dynamic: false,
                format: 'png'
            });
            // Make the image
            let img = await new DIG.Delete().getImage(avatar);
            // Add the image as an attachement
            let attach = new Discord.MessageAttachment(img, "delete.png");
            await interaction.followUp({
                files: [attach]
            });
            setTimeout(() => interaction.deleteReply(), 15000);
        }
	},
};