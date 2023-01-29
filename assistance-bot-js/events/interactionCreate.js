const { memberAnswer } = require('../function/addRole');
const { memberRequest } = require('../function/formAddRole');
const { config } = require('dotenv').config();

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commandsPath.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		try {
            if (!interaction.isModalSubmit()) {
                switch (interaction.customId) {
                    case 'memberReqeust':
                        await memberRequest(interaction);
                        break;
                    default:
                        await command.execute(interaction);
                }
            }else if (interaction.isModalSubmit()) {
                switch (interaction.customId) {
                    case 'memberAnswer':
                        await memberAnswer(interaction);
                        break;
                    default:
                        return;
                }
            }
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};