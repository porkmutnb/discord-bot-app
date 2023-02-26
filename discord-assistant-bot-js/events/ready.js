const { ActivityType } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(bot) {
		bot.user.setActivity(`👓 ${bot.user.username} is watching you`, {
			type: ActivityType.Watching
		})
	    console.log(`Logged in as ${bot.user.tag}!`);
    },
};