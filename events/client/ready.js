const { ActivityType } = require('discord.js');
const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client, message, args) {
        let CantMembers = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

        const activities = [
            'Docs about SA-OP:MP 📖',
            'My code and updating 📝',
            'Docs about Discord v14. 📖',
            'Repositories in Github. 📚',
        ]

        console.log("===================================================");
        console.log(`# The Bot ${client.user.username}, is now connected.             #`)
        console.log(`# ${client.user.username} - It has been executed satisfactorily! #`);
        console.log("===================================================");

        setInterval(() => {
            client.user.setPresence({
                status: 'dnd',
                activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: ActivityType.Watching }],
            })
        }, 7000)

    },
};