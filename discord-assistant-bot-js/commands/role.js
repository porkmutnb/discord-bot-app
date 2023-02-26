const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Want your Role')
        .addStringOption(option =>
            option.setName('role')
                .setDescription('What your need Role?')
                .setRequired(true)
                .addChoices(
                    { name: 'Fanclub 48 Group', value: 'OTA' },
                    { name: 'Member', value: 'Member' },
                    { name: 'Grand Theft Auto', value: 'GTA' },
                    { name: 'Red Dead Redemtion', value: 'RDR' },
                    { name: 'Minecraft', value: 'MINECRAFT' },
                    { name: 'Game All', value: 'GAMER' },
                ))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('What is your name?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('oshi')
                .setDescription('What is your oshi name [สำหรับคนที่เลือก Role: OTA]?')
                .setRequired(false)),
	async execute(interaction) {
        try {
            let name = interaction.options.getString('name');
            let role = interaction.options.getString('role');
            let oshi = interaction.options.getString('oshi');
            role = ['OTA', 'Member', 'GTA', 'RDR', 'MINECRAFT', 'GAMER'].includes(role) ? role : `Member`;
            console.log('=>', name, role);
            const ROLE_ADD = interaction.member.guild.roles.cache.find(r => r.name === role);
            if(role===`OTA`) {
                let yourOshi = (oshi==null) ? `` : (oshi.length>10) ? oshi.substring(0, 10)+`...` : oshi.substring(0, oshi.length);
                let username = (yourOshi===``) ? name : name+`|`+yourOshi;
                interaction.guild.members.cache.get(interaction.member.user.id).setNickname(username);
            }else {
                interaction.guild.members.cache.get(interaction.member.user.id).setNickname(name);
            }
            interaction.guild.members.cache.get(interaction.member.user.id).roles.add(ROLE_ADD);
            await interaction.followUp(`${interaction.member.user}เพิ่ม Role ${ROLE_ADD} ให้นายท่านเรียบร้อยแล้วค่ะ`);
            setTimeout(() => interaction.deleteReply(), 5000);
        } catch (error) {
            console.error('Error AddRole:SlashCommand:', error);
        }
    },
};