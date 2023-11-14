const { REST, Routes } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];
// Tome todos los archivos de comando del directorio de comandos que creó anteriormente
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Tome todos los archivos de comando del directorio de comandos que creó anteriormente
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Obtenga la salida SlashCommandBuilder#toJSON() de los datos de cada comando para su implementación
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// El método put se usa para actualizar completamente todos los comandos en el gremio con el conjunto actual
		const data = await rest.put(
			Routes.applicationGuildCommands('947426056074309663', '947320049557966888'),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();