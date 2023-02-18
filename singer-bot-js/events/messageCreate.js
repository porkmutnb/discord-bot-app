const { config } = require('dotenv').config();

const CH_SINGER = process.env.CH_SINGER;

module.exports = {
    name: 'messageCreate',
	async execute(interaction) {
        if(interaction.author.bot) return;
        if(interaction.channelId==CH_SINGER) {
            context.delete();
        }
    },
};