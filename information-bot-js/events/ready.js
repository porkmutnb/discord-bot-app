const { Discord, Client, GatewayIntentBits } = require('discord.js');
const { getChannel } = require('simple-youtube-api');
const { ActivityType } = require('discord.js');
const { config } = require('dotenv').config();
const { updateLatestVideoBNK, updateLatestVideoCGM } = require('../function/handle');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent,
    ] 
});

const CH_INFORMATION_ID = process.env.CH_INFORMATION_ID;

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity(`Pampam is watching`, { type: ActivityType.Competing });
	    console.log(`Logged in as ${client.user.tag}!`);

        // Get the latest video
        updateLatestVideoBNK(client);
        updateLatestVideoCGM(client);

        // Schedule an interval to check for new videos
        /***** Every 1 Day *****/
        // setInterval(async () => {
        //     updateLatestVideoBNK(client);
        //     updateLatestVideoCGM(client);
        // }, 24 * 60 * 60 * 1000);
        /***** Every 12 hours *****/
        // setInterval(async () => {
        //     updateLatestVideoBNK(client);
        //     updateLatestVideoCGM(client);
        // }, 12 * 60 * 60 * 1000);
        /***** Every hour *****/
        setInterval(async () => {
            updateLatestVideoBNK(client);
            updateLatestVideoCGM(client);
        }, 60 * 60 * 1000);
        /***** Every minute *****/
        // setInterval(async () => {
        //     updateLatestVideoBNK(client);
        //     updateLatestVideoCGM(client);
        // }, 60 * 1000); 
        /***** Every 30 second *****/
        // setInterval(async () => {
        //     updateLatestVideoBNK(client);
        //     updateLatestVideoCGM(client);
        // }, 30 * 1000);
        /***** Every 5 second *****/
        // setInterval(async () => {
        //     updateLatestVideoBNK(client);
        //     updateLatestVideoCGM(client);
        // }, 5 * 1000);

	},
};