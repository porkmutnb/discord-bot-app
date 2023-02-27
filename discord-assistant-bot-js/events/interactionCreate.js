const { formRequestFunction, addRoleFunction } = require('../function/utilAssistant');
const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        await interaction.deferReply().catch(err => {});
        try {
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(interaction.commandName);
                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
                await command.execute(interaction);
            }else if (interaction.isModalSubmit()) {
                interaction.followUp({ content: `${interaction.customId} is not complete.`, ephemeral: true });
                setTimeout(() => interaction.deleteReply(), 3000);
            }else {
                const roleForm = await interaction.member.guild.roles.cache.find(r => r.name === interaction.customId )
                if(roleForm) {
                    if(interaction.customId==`Friend`) {
                        await formRequestFunction(interaction)
                    }else {
                        await addRoleFunction(interaction)
                    }
                }else if(interaction.customId.indexOf('friendApprove')>-1) {
                    await addRoleFunction(interaction)
                }else {
                    interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                    setTimeout(() => interaction.deleteReply(), 3000);
                }
            }
        } catch (error) {
            console.error(error);
            interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            setTimeout(() => interaction.deleteReply(), 3000);
        }
    },
};