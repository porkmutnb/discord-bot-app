const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity(`🖌 ${client.user.username} doing precious works`, {
			type: ActivityType.Listening
		})
	    console.log(`Logged in as ${client.user.tag}!`);
    },
};