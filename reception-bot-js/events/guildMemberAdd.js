const { sendWelcomeMember } = require('../function/utilsEmbedBuilder');

module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(client) {
		console.log('client', client);
        sendWelcomeMember(client);
	},
};