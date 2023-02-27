const { sendWelcomeMember } = require('../function/utilsEmbedBuilder');

module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(bot) {
        sendWelcomeMember(bot);
	},
};