const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Replies with Hi!'),
	async execute(interaction, client) {
        console.log('interaction', interaction);
        await interaction.deferReply().catch(err => {});
		let isOwner = interaction.member.roles.cache.has(OWNER_ID);
        let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
        let ownerRole = interaction.member.guild.roles.cache.find(role => role.id === OWNER_ID);
        let adminRole = interaction.member.guild.roles.cache.find(role => role.id === ADMIN_ID);
		if(isOwner||isAdmin) {
			const embed = new EmbedBuilder()
						.setColor(0xC995C1)
						.setTitle('คำสั่งของหนูนะคะ')
						.setDescription('Command for Artist')
						.setThumbnail(`https://scontent.fbkk13-3.fna.fbcdn.net/v/t39.30808-6/301386302_1051016035591594_86774068059096853_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bU3EerzMARsAX_zHige&_nc_ht=scontent.fbkk13-3.fna&oh=00_AfBFpQeB0tBJDJ3pxacRTBZq_zylWF4szIy0QeJi866Rgg&oe=63F37B15`)
						.addFields(
							{ name: '/pancake', value: 'คุยกับหนู', inline: true },
							{ name: '/imagine', value: 'อยากได้ภาพอะไรบอกหนูสิ', inline: true },
							{ name: '/translate', value: `อยากได้ล่ามภาษามั้ยคะ`, inline: true },
							{ name: '/setup', value: `Command for Artist [only ${ownerRole}, ${adminRole}]`, inline: false }
						)
						.setImage(`https://thumbs.gfycat.com/CrispMelodicDoctorfish-size_restricted.gif`)
						.setTimestamp()
						.setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
			interaction.guild.channels.cache.find(i => i.id === CH_INTRODUCTION_ID).send({ embeds: [embed] });
			await interaction.followUp(`Commands is ready...`);
			setTimeout(() => interaction.deleteReply(), 3000);
		}else {
			await interaction.followUp({content: `ฐานันดร คุณพี่มีไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`})
			setTimeout(() => interaction.deleteReply(), 3000);
		}
	},
};