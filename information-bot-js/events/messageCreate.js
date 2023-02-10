const { config } = require('dotenv').config();

module.exports = {
    name: 'messageCreate',
	async execute(interaction) {
        if(interaction.author.bot) return;
        console.log('interaction', interaction);
        
    },
};