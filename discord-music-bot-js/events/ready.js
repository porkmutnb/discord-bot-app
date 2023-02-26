const { ActivityType } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(bot) {
		bot.user.setActivity(`🎤 ${bot.user.username} need to sing a song `, {
			type: ActivityType.Listening
		})
	    console.log(`Logged in as ${bot.user.tag}!`);
    },
};