const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName("script")
		.setDescription("Show info about of differents sa-mp client commands."),
	guildOnly: true,

	async execute(client, interaction) {
		console.log(`${interaction.user.username}, ha solicitado informacion acerca de /testcmd\n`)

		const EBContent = new EmbedBuilder()
			.setColor('#df740f')
			.setTitle('Scripting[Callbacks] Information - Pawn')
			.setDescription('## :flag_es: - Español\n\nA Continuacion encontraras informacion acerca de los Callbacks nativos en la\nprogramacion Pawn. Puedes seleccionar diferentes opciones, las cuales te mostraran informacion\nacerca de esteos.\n\n## :flag_us: - English.\n\nBelow you will find information about the Callbacks integrated into the\nprogramming Pawn. Uou can select different options, which will show you information\nabout this.')
			.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' })

		const MainOpts = new StringSelectMenuBuilder()
			.setCustomId('scripting')
			.setPlaceholder('Select Any Option')
			.setMinValues(1)
			.setMaxValues(1)
			.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('OnActorStreamIn')
                    .setDescription('Info about of the Callback OnActorStreamIn.')
                    .setEmoji('🎙')
                    .setValue(`OASI`),

                new StringSelectMenuOptionBuilder()
                    .setLabel('OnActorStreamOut')
                    .setDescription('Info about of the Callback OnActorStreamOut.')
                    .setEmoji('🎙')
                    .setValue(`OASO`),

                new StringSelectMenuOptionBuilder()
                    .setLabel('OnClientCheckResponse')
                    .setDescription('Info about of the Callback OnClientCheckResponse.')
                    .setEmoji('💻')
                    .setValue(`OCCR`),

                new StringSelectMenuOptionBuilder()
                    .setLabel('OnClientMessage')
                    .setDescription('Info about of the Callback OnClientMessage.')
                    .setEmoji('💻')
                    .setValue(`OCM`),

                new StringSelectMenuOptionBuilder()
                    .setLabel('OnDialogResponse')
                    .setDescription('Info about of the Callback OnClientCheckResponse.')
                    .setEmoji('💻')
                    .setValue(`ODR`),

                new StringSelectMenuOptionBuilder()
                    .setLabel('OnEnterExitModShop')
                    .setDescription('Info about of the Callback OnClientCheckResponse.')
                    .setEmoji('💻')
                    .setValue(`OEEMS`),

                new StringSelectMenuOptionBuilder()
                    .setLabel('OnIncomingConnection')
                    .setDescription('Info about of the Callback OnIncomingConnection.')
                    .setEmoji('💻')
                    .setValue(`OIC`),
					
			);

		const RowMain = new ActionRowBuilder()
			.addComponents(MainOpts);

		await interaction.reply({ embeds: [EBContent], components: [RowMain] });
	}
};