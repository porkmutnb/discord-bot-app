const { sendGoodBywMember } = require('../function/utilsEmbedBuilder');

module.exports = {
	name: 'guildMemberRemove',
	once: true,
	execute(bot) {
		console.log('bot', bot);
        sendGoodBywMember(bot);
	},
};