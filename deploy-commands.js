const { REST, Routes, Client } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");
const client = new Client({ intents: [17] }); //GUILD_INTEGRATIONS, GUILDS
require("./handlers/loadDocs")(client);
const commands = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
const commandFolders = fs.readdirSync(path.join(__dirname, "./commands"));
for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(path.join(__dirname, `./commands/${folder}`))
        .filter((file) => file.endsWith("js"));

    for (const file of commandFiles) {
        let filePath = path.join(__dirname, `./commands/${folder}/${file}`);
        const command = require(filePath);
        if (command.data == undefined) continue;
        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
            console.log(
                chalk.bgGreenBright.black(
                    `[COMMAND LOADED] ${command.data.name}.`
                )
            );
        } else {
            console.warn(
                chalk.bgYellowBright.black(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
                )
            );
        }
    }
}
// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Deploy commands
client.on("ready", () => {
    client.guilds.cache.forEach(guild => console.log(guild))
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        client.guilds.cache.forEach(async (guild) => {
            console.log(`Loading slash commands in ${guild.name}`);
            const data = await rest.put(
                Routes.applicationGuildCommands(client.user.id, guild.id),
                { body: commands }
            );
            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`
            );
        });
    } catch (error) {
        console.error(error);
    }
});

client
    .login(process.env.TOKEN)
    .catch((err) =>
        console.log(
            `Dont possible connect with discord - Reason: "${err.message}"`
        )
    );
