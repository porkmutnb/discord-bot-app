const { ActivityType } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(bot) {
		bot.user.setActivity(`🔎 ${bot.user.username} Look for the new member`, {
			type: ActivityType.Watching
		})
	    console.log(`Logged in as ${bot.user.tag}!`);
    },
};