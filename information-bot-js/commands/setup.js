const { SlashCommandBuilder } = require('discord.js');
const { config } = require('dotenv').config();
const { updateLatestVideoBNK, updateLatestVideoCGM, updateLatestVideoUp2Mew } = require('../function/handle');

const OWNER_ID = process.env.OWNER_ID;
const ADMIN_ID = process.env.ADMIN_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('update lasted data!')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('channel update')
                .setRequired(true)),
	async execute(interaction, client) {
        await interaction.deferReply().catch(err => {});
        const keyword = interaction.options.getString('keyword') || 'all'.toUpperCase();
        let isOwner = interaction.member.roles.cache.has(OWNER_ID);
        let isAdmin = interaction.member.roles.cache.has(ADMIN_ID);
        if(isOwner||isAdmin) {
            switch (keyword.toUpperCase()) {
                case `BNK48`:
                    await updateLatestVideoBNK(client);
                    break;
                case `CGM48`:
                    await updateLatestVideoCGM(client);
                    break;
                case `UP2MEW`:
                    await updateLatestVideoUp2Mew(client);
                    break;
                default:
                    await updateLatestVideoBNK(client);
                    await updateLatestVideoCGM(client);
                    await updateLatestVideoUp2Mew(client);
                    break;
            }
            await interaction.followUp(`Fetch data Success: ${keyword} ${interaction.user}`);
            setTimeout(() => interaction.deleteReply(), 3000);
        }else {
            await interaction.followUp({content: `ฐานันดร นายท่านไม่มากพอที่จะใช้คำสั่งนี้! ${interaction.user}.`})
            setTimeout(() => interaction.deleteReply(), 3000);
        }
	},
};