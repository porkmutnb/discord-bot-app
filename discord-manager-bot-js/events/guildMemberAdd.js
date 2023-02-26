const { getAllMembers } = require('../function/getAllMember');

module.exports = {
	name: 'guildMemberAdd',
	once: true,
	execute(client) {
		console.log('client', client);
        getAllMembers(null, client);
	},
};