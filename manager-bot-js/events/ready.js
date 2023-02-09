const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity(`Cherprang is working`, { type: ActivityType.Listening });
	    console.log(`Logged in as ${client.user.tag}!`);
	},
};