const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        await interaction.deferReply().catch(err => {});
        try {
            if (!interaction.isChatInputCommand()) return;
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};