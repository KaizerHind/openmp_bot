const {
    EmbedBuilder,
    SlashCommandBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");
const { EMBED_COLOR } = require("../../config.json");
const client = require("../../handlers/loadDocs");
const { callbacks } = client.docs;
const MAX_EMBED_LENGTH = 4096;
module.exports = {
    data: new SlashCommandBuilder()
        .setName("callbacks")
        .setDescription("Setup functions when a in-game event executes")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("Phrase to search for")
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options
            .getFocused()
            .toLowerCase()
            .trim();
        const choices = Array.from(client.docs.callbacks.keys());

        //query filtered
        const regex = new RegExp(focusedValue, "gi");
        const filtered = choices
            .filter((choice) => choice.match(regex))
            .slice(0, 25);
        //it Shows the choices
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },
    guildOnly: true,
    async execute(interaction) {
        const query = interaction.options.getString("query");
        sendDoc(interaction, query);
    },
};

async function sendDoc(interaction, query) {
    if (!callbacks.get(query))
        return interaction.reply({
            content: `No hubo coincidencia con ${query.slice(0, 32)}`,
            ephemeral: true,
        });

    let { name, description, returns, table, code, notes } =
        callbacks.get(query);
    code = "## Example\n" + code;
    let comillas = "";
    let tabla;
    if (table) {
        tabla = table
            .map(
                (row) =>
                    `- **\`\`${Object.keys(
                        row
                    )}:\`\`** ${comillas}${Object.values(row)}${comillas}\n`
            )
            .join("")
            .trim();
        tabla = "## Parameters\n" + tabla;
    }

    let dataName = `# ${name}`;
    let content = [dataName, description, returns, tabla, code, notes]
        .filter((data) => data)
        .join("\n");

    let embeds = [];
    let embed2, button, row;

    //link button to openmp docs website
    button = new ButtonBuilder()
        .setLabel("See more")
        .setURL("https://www.open.mp/docs/scripting/callbacks")
        .setStyle(ButtonStyle.Link);
    row = new ActionRowBuilder().addComponents(button);
    components = [row];

    if (content.length >= MAX_EMBED_LENGTH) {
        content = [dataName, description, returns, tabla, notes]
            .filter((data) => data)
            .join("\n");
        if (code.length <= MAX_EMBED_LENGTH) {
            embed2 = new EmbedBuilder()
                .setColor(`#${EMBED_COLOR}`)
                .setDescription(code)
                .setFooter({
                    text: `Callbacks - OPEN:MP`,
                    iconURL:
                        "https://assets.open.mp/assets/images/assets/logo-dark-trans.png",
                });
            embeds.push(embed2);
        }
    }

    const embed = new EmbedBuilder()
        .setColor(`#${EMBED_COLOR}`)
        .setDescription(content)
        .setFooter({
            text: `Callbacks - SA-OP:MP`,
            iconURL:
                "https://assets.open.mp/assets/images/assets/logo-dark-trans.png",
        });
    embeds.unshift(embed);
    await interaction.reply({ embeds, components });
}
