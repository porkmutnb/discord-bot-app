const { sendGoodBywMember } = require('../function/utilsEmbedBuilder');

module.exports = {
	name: 'guildMemberRemove',
	once: true,
	execute(bot) {
        sendGoodBywMember(bot);
	},
};