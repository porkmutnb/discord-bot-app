const { updateLatestVideoBNK, updateLatestVideoCGM, updateLatestVideoUp2Mew, updateReportCovid19 } = require('../function/utilNewswire');
const { ActivityType } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(bot) {
		bot.user.setActivity(`✒ ${bot.user.username} is freedom myself`, {
			type: ActivityType.Listening
		})
	    console.log(`Logged in as ${bot.user.tag}!`);
        // Get the latest video
        updateLatestVideoBNK(bot);
        updateLatestVideoCGM(bot);
        updateLatestVideoUp2Mew(bot);
        updateReportCovid19(bot);
        // Schedule an interval to check for new videos
        /***** Every hour *****/
        setInterval(async () => {
            updateLatestVideoBNK(bot);
            updateLatestVideoCGM(bot);
            updateLatestVideoUp2Mew(bot);
            updateReportCovid19(bot);
        }, 60 * 60 * 1000);
    },
};