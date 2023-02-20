const fs = require('node:fs');
const path = require('node:path');
const { Discord, Client, Collection, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const { config } = require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const SERVER_ID = process.env.SERVER_ID;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ] 
});

client.commandsPath = new Collection();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commandPrompt = ['cherprang', 'setup', 'dlt'];
const commandsPath = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commandsPath.push(command.data.toJSON());
    client.commandsPath.set(command.data.name, command);
}
(async () => {
	try {
		console.log(`Started refreshing ${commandsPath.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID),
			{ body: commandsPath },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
console.log(`Started refreshing ${eventFiles.length} application (/) events.`);
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = client.commandsPath.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			setTimeout(() => interaction.deleteReply(), 5000);
		}
	}
});

client.login(process.env.TOKEN);
