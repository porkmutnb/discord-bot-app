const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity(`🔎 Fond Look for the new member`, {
			type: ActivityType.Watching
		})
        console.log(`Logged in as ${client.user.tag}!`);
	},
};