const { getAllUsers } = require('../function/getAllMember');

module.exports = {
	name: 'guildMemberRemove',
	once: true,
	execute(bot) {
		console.log('bot', bot);
        getAllUsers(bot);
	},
};