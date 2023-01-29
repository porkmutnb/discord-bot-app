const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity(`Pupe is watching`, { type: ActivityType.Watching });
	    console.log(`Logged in as ${client.user.tag}!`);
	},
};