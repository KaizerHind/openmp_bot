const { Client } = require("discord.js");
require('dotenv').config();
const client = new Client({ intents: [512] }); //GUILD_MESSAGES
require("./handlers/loadDocs")(client);
require("./handlers/loadEvents")(client);
require("./handlers/loadSlashCommands")(client);

//nodejs-listeners
process.on("unhandledRejection", (e) => console.log(e));
process.on("uncaughtException", (e) => console.log(e));
process.on("uncaughtExceptionMonitor", (e) => console.log(e));
client.login(process.env.TOKEN).catch((err) => {
    console.log(`Dont possible connect with discord - Reason: "${err.message}"`);
});