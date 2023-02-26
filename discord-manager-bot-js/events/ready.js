const { ActivityType } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(bot) {
		bot.user.setActivity(`📋 ${bot.user.username} is listen to opinions`, {
			type: ActivityType.Listening
		})
	    console.log(`Logged in as ${bot.user.tag}!`);
    },
};