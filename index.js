const { Client, Collection } = require('discord.js');
const client = new Client({ intents: [131071] });
const { readdirSync } = require("fs")
const moment = require("moment");

const path = require('path');
client.pathbot = require('./config.json');
client.pathbot.rootDir = __dirname;

client.commands = new Collection()
client.slashcommands = new Collection()
client.commandaliases = new Collection()

const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`) };

//command-handler
const commands = []
readdirSync('./commands/handler').forEach(async file => {
  const command = await require(`./commands/handler/${file}`);
  if (command) {
    client.commands.set(command.name, command)
    commands.push(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach(alias => {
        client.commandaliases.set(alias, command.name)
      })
    }
  }
})

//slash-command-handler
const slashcommands = [];
readdirSync('./commands/slash').forEach(async file => {
  const command = await require(`./commands/slash/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
})

//event-handler
let EventsFiles = readdirSync(path.join(__dirname, 'EventGuilds'));
for (let folders of EventsFiles) {
  let folder = readdirSync(path.join(__dirname, 'EventGuilds', folders));
  for (let file of folder) {
    let flagEvent = require(path.join(__dirname, 'EventGuilds', folders, file));
    client.on(flagEvent.name, (...args) => flagEvent.execute(client, ...args));
  }
}

//nodejs-listeners
process.on("unhandledRejection", e => { console.log(e) })
process.on("uncaughtException", e => { console.log(e) })
process.on("uncaughtExceptionMonitor", e => { console.log(e) })

client.login(client.pathbot.token).catch((err) => {
  log(`Dont possible connect with discord - Reason: "${err.message}"`);
});