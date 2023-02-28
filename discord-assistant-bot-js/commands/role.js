const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { prepareServerAuthor } = require('../function/utilAssistant');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Are you need Role?'),
	async execute(interaction) {
        try {
            // console.log('interaction', interaction);
            let resMsg = ``
            let roleNotUseList = []
            if(interaction.member.guild.ownerId===process.env.OWNER_SERVER_ID) {
                roleNotUseList = await prepareServerAuthor(interaction.member.guild)
            }
            let ButtonRole = []
            await interaction.member.guild.roles.cache.find(r => {
                if(!['@everyone','Owner'.toLowerCase(),'Admin'.toLowerCase(),'Server Booster'.toLowerCase()].includes(r.name.toLowerCase()) && r.tags.botId==null && !roleNotUseList.includes(r.name)) {
                    let BtnStyle
                    if(r.name==`Member`) {
                        BtnStyle = ButtonStyle.Primary
                    }else if(r.name==`OTA`) {
                        BtnStyle = ButtonStyle.Success
                    }else if(r.name==`Friend`) {
                        BtnStyle = ButtonStyle.Danger
                    }else if(['GAMER','MINECRAFT','RDR','GTA'].includes(r.name)) {
                        BtnStyle = ButtonStyle.Secondary
                    }else {
                        BtnStyle = ButtonStyle.Success
                    }
                    const isUserRole = interaction.member.roles.cache.has(r.id);
                    const ROLE = new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`${r.name}`)
                                        .setLabel(`${r.name}`)
                                        .setDisabled(isUserRole ? true : false)
                                        .setStyle(BtnStyle),
                    );
                    ButtonRole.push(ROLE)
                }
            })
            if(ButtonRole.length>0) {
                for (let index = 0; index < ButtonRole.length; index++) {
                    const element = ButtonRole[index];
                    await interaction.member.guild.channels.cache.find(i => i.id == interaction.channelId).send({ components: [element] }).then(msg => setTimeout(() => msg.delete(), 10000));
                }
                resMsg =`ต้องการ Role หรือคะ นายท่าน,`
                await interaction.followUp({content: `${resMsg}`});
            }else {
                resMsg =`ไม่พบ Role ใน Server นี้, โปรดติดต่อแอดมิน`
                const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`${resMsg}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
                await interaction.followUp({embeds: [embed]});
            }
            setTimeout(() => interaction.deleteReply(), 3000);
        } catch (error) {
            console.error('Error role:SlashCommand:', error);
            const embed = new EmbedBuilder()
                        .setColor("#C995C1")
                        .setTitle(`หนูรับทราบค่ะ`)
                        .setDescription(`มีบางอย่างผิดพลาด, ลองใหม่ภายหลัง ${interaction.user}`)
                        .setTimestamp()
                        .setFooter({ text: 'Powerd be cherMew', iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp` });
            await interaction.followUp({embeds: [embed]});
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};