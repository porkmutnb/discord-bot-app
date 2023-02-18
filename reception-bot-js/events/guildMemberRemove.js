const { sendGoodBywMember } = require('../function/utilsEmbedBuilder');

module.exports = {
	name: 'guildMemberRemove',
	once: true,
	execute(client) {
		console.log('client', client);
        sendGoodBywMember(client);
	},
};