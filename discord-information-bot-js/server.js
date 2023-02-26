const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require("discord.js");
const { readdirSync } = require("fs");
const path = require('node:path');
require('dotenv').config();

const bot = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
]
});

const commands = [];
bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
	try {
		// console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
		// console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    const command = bot.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
        await interaction.deferReply().catch(err => {});
		await command.execute(interaction, bot);
	} catch (error) {
		console.error(error);
        await interaction.deferReply().catch(err => {});
		interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

bot.login(process.env.TOKEN);