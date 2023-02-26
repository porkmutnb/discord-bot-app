const { sendWelcomeMember } = require('../function/utilsEmbedBuilder');

module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(bot) {
		console.log('bot', bot);
        sendWelcomeMember(bot);
	},
};