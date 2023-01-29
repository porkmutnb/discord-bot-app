const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();

const CH_INTRODUCTION_ID = process.env.CH_INTRODUCTION_ID;

const MEMBER_ID = process.env.MEMBER_ID;
const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Want invite your friend'),
	async execute(interaction) {
        if(interaction.channelId==CH_INTRODUCTION_ID) {
            console.log('interaction', interaction);
            let isUserMemberRole = interaction.member.roles.cache.has(MEMBER_ID);
            let isOwnerRole = interaction.member.roles.cache.has(OWNER_ID);
            let isAdminRole = interaction.member.roles.cache.has(ADMIN_ID);
            if(isUserMemberRole||isOwnerRole||isAdminRole) {
                interaction.channel.createInvite(
                    {
                        maxAge: 24 * 3600, // maximum time for the invite, in milliseconds
                        maxUses: 5 // maximum times it can be used
                    },
                    `Requested with command by ${interaction.user.tag}`
                ).then(invite => {
                    let linkInvite = `https://discord.gg/${invite.code}`
                    interaction.user.send(`คำชวนเข้าเซิฟของ ${interaction.member.guild.name} => ${linkInvite}`);
                    interaction.reply(`ส่งคำเชิญเข้าเซิฟของ ${interaction.member.guild.name} เรียบร้อยแล้วค่ะ`);
                    setTimeout(() => interaction.deleteReply(), 3000);
                });
            }else {
                interaction.reply(`นายท่านไม่มีสิทธิใช้คำสั่งนี้นะคะ`);
                setTimeout(() => interaction.deleteReply(), 3000);
            }
        }else {
            await interaction.reply(`Pupe รับคำสั่งได้แค่ห้อง introduction เท่านั้นนะคะ! ${interaction.user}.`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};