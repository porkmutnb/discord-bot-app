const { getAllUsers } = require('../function/getAllMember');

module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(bot) {
		console.log('bot', bot);
        getAllUsers(bot);
	},
};