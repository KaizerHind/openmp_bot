const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName("clientcmd")
		.setDescription("Show info about of differents sa-mp client commands."),
	guildOnly: true,

	async execute(client, interaction) {
		console.log(`${interaction.user.username}, ha solicitado informacion acerca de /testcmd\n`)

		const EBContent = new EmbedBuilder()
			.setColor('#7a3b9b')
			.setTitle('Client Information - Pawn')
			.setDescription('## :flag_es: - Español\n\nA Continuacion encontraras informacion acerca de los comandos integrados en el\nCliente de SAMP, puedes seleccionar diferentes opciones, las cuales te mostraran informacion\nacerca de este.\n\n## :flag_us: - English.\n\nBelow you will find information about the commands integrated into the\nSAMP Client, you can select different options, which will show you information\nabout it.')
			.setFooter({ text: 'PawnCode Community - SA-OP:MP', iconURL: 'https://assets.open.mp/assets/images/assets/logo-dark-trans.png' })

		const MainOpts = new StringSelectMenuBuilder()
			.setCustomId('clientcommand')
			.setPlaceholder('Select Any Option')
			.setMinValues(1)
			.setMaxValues(1)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Audio Message')
					.setDescription('Info about of Client-Command Audio Message.')
					.setEmoji('💿')
					.setValue(`AudioMsg`),

				new StringSelectMenuOptionBuilder()
					.setLabel('Camera Target Debugging')
					.setDescription('Info about of Client-Command Camera Target Debugging.')
					.setEmoji('📷')
					.setValue('CameraTargetDebugging'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Debug Labels')
					.setDescription('Info about of Client-Command Debug Labes.')
					.setEmoji('📄')
					.setValue('DebugLabel'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Font Size')
					.setDescription('Info about of Client-Command FontSize')
					.setEmoji('🔎')
					.setValue('FontSize'),

				new StringSelectMenuOptionBuilder()
					.setLabel('FPS Limits')
					.setDescription('Info about of Client-Command FPS Limits')
					.setEmoji('🧭')
					.setValue('FPS'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Head Move')
					.setDescription('Info about of Client-Command HeadMove.')
					.setEmoji('🕵️‍♀️')
					.setValue('HeadMove'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Hud Scale Fix')
					.setDescription('Info about of Client-Command HudScaleFix.')
					.setEmoji('🗺')
					.setValue('HudScaleFix'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Interior')
					.setDescription('Info about of Client-Command Interior.')
					.setEmoji('⚙')
					.setValue('Int'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Memory')
					.setDescription('Info about of Client-Command Memory.')
					.setEmoji('📊')
					.setValue('Mem'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Name Tag Status')
					.setDescription('Info about of Client-Command Nametagstatus.')
					.setEmoji('📝')
					.setValue('Nametagstatus'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Page Size')
					.setDescription('Info about of Client-Command Pagesize.')
					.setEmoji('📰')
					.setValue('Pagesize'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Quit')
					.setDescription('Info about of Client-Command Quit.')
					.setEmoji('📤')
					.setValue('Exit'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Raw/RS')
					.setDescription('Info about of Client-Command Raw.')
					.setEmoji('🗒')
					.setValue('RS'),

				new StringSelectMenuOptionBuilder()
					.setLabel('RCON')
					.setDescription('Info about of Client-Command RCON.')
					.setEmoji('🕵️‍♀️')
					.setValue('RCMD'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Save')
					.setDescription('Info about of Client-Command SAVE.')
					.setEmoji('💾')
					.setValue('SAVE'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Timestamp')
					.setDescription('Info about of Client-Command Timestamp.')
					.setEmoji('🕧')
					.setValue('Times'),

				new StringSelectMenuOptionBuilder()
					.setLabel('Virtual World')
					.setDescription('Info about of Client-Command Virtual World.')
					.setEmoji('🌍')
					.setValue('VW'),
			);

		const RowMain = new ActionRowBuilder()
			.addComponents(MainOpts);

		await interaction.reply({ embeds: [EBContent], components: [RowMain] });
	}
};