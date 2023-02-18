const { Discord, Client, GatewayIntentBits } = require('discord.js');
const { ActivityType } = require('discord.js');
const { config } = require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity(`🎤 Stang need to sing a song `, {
			type: ActivityType.Streaming
		})
	    console.log(`Logged in as ${client.user.tag}!`);
    },
};