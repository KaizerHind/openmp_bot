const { Discord, EmbedBuilder, Events, InteractionType, CommandInteraction } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,

	execute: async (client, interaction) => {

		if (interaction.type == InteractionType.ApplicationCommand) {
			if (interaction.user.bot) return;
			try {
				const command = client.slashcommands.get(interaction.commandName)
				command.execute(client, interaction)
			} catch (e) {
				console.error(e)
				interaction.reply({ content: "Ha habido un error al ejecutar el comando; Intenta de nuevo o Contacta con un Administrador.", ephemeral: true })
			}
		} 
		
		if (!interaction.isStringSelectMenu()) return;
		if (interaction.customId === 'clientcommand') {
			const embeds = {
				AudioMsg: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Information - AudioMessage`)
					.setDescription('Habilita/deshabilita el mensaje que se imprime cuando se transmite una URL a un cliente.\nEsto se puede modificar en el archivo\n `%appdata%./../../Documents/GTA San Andreas User Files/SAMP/sa-mp.cfg`, `"audiomsgoff"`.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				CameraTargetDebugging: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - CTD`)
					.setDescription('Permite la depuracion del cliente del objetivo de la camara del jugador.\n\n**Nota:** Este comando fue agregado en **SA-MP 0.3.7 RC2**')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				DebugLabel: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Debug Label`)
					.setDescription('Este comando muestra las etiquetas de depuracion en los vehiculos, los cuales muestra la siguiente informacion:\n* vehicleid(id del vehiculo)\n* modelid(modelo del vheiculo)\n* vehicle status(estado del vehiculo)\n* vehicle pre-loaded(si el vehiculo esta precargado)\n* Distance player(la distancia del jugador)\n*Trailer(remolque)\n* Available seats(asientos disponibles)\n* Current & Spawn Pos(posicion actual y posicion de spawn)')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				FontSize: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Font Size`)
					.setDescription('Cambia el tamaño de fuente de la interfaz de usuario.\nEs decir, todo lo referente al chat, cuadros de dialogo, etc, el tamaño de fuente **minima** y **maxima** es de **-3** a **5**.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				FPS: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - FPS Limits`)
					.setDescription('Establece el limite de FPS(Frames por segundo) para tu juego, cuanto mas alto sea el limite, mas suave sera tu juego.\nEsto no tiene efecto si el limitador de fotogramas esta desactivado en las opciones graficas. El limite se puede establecer entre **20** y **90**.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				HeadMove: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - HeadMove`)
					.setDescription('**Habilitara/deshabilitara** los movimientos de cabeza de los jugadores, sin embargo, se maneja localmente, por lo que otros jugadores aun veran su movimiento de cabeza.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				HudScaleFix: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - HudScaleFix`)
					.setDescription('Se puede usar para alternar la correcciÃ³n de la escala del radar, de modo que el radar del juego deberia escalar mejor en resoluciones de pantalla ancha.\nNo mas "huevo de hallazgo"\n\n**Nota:** Este comando se agrega en **SA-MP 0.3.7 R3**')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),
				Int: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Interior`)
					.setDescription('Se encarga unicamente de mostrar el interior(id) en el que te encuentras.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				Mem: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Memory`)
					.setDescription('Muestra la cantidad actual de uso de memoria. (Aunque, por lo general, solo imprime 128 MB).')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				Nametagstatus: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Nametagstatus`)
					.setDescription('Cuando esta habilitado`(lo cual es predeterminado)`, los jugadores veran un pequeño icono de reloj de arena junto al de nombre de los jugadores en pausa.\nEsto incluye:\n* Minimizar. `(alt-tab)`\n* MenÃº de pausa. `(ESC)`\n* Perdida de conexion. `(bloqueo/tiempo de espera)`\n* Al tomar capturas de pantalla que congelan el juego por mas o menos de `3 segundos`.\n\n**Nota:** Este comando se agrega en **0.3x**.')
					.setImage('https://team.sa-mp.com/upload/1/13/Afkicon.png')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				Pagesize: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Pagesize`)
					.setDescription('Es usado para elegir la cantidad de lineas a visualizar en el chat.\nCabe decir que el limite de visualizacion es de **10** a **20** lineas, algo a aclarar es que el tamaño de pagina siempre es 10 por defecto, nativamente.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				Exit: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Quit`)
					.setDescription('Su nombre habla por so solo, basicamente salir del juego; Tambien puede usar **/q**, ya que es exactamente el mismo comando, solo que esta es una abreviacion.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				RS: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Raw/RS`)
					.setDescription('Similar al comando /save, a excepcion de que este unicamente guarda la los datos de la `Posicion actual` y el `Angulo de orientacion` en el archivo`rawpositions.txt`, el cual se encuentra ubicado en `%appdata%./../../Documents/GTA San Andreas User Files/SAMP/rawpositions.txt`.\nNo se guarda informacion adicional, como clase y armas.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				RCMD: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - RCON`)
					.setDescription('Este comando se utiliza para ejecutar comandos **RCON**.\n**RCON** es el sistema de administracion incorporado. RCON significa Control Remoto.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				SAVE: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Save`)
					.setDescription('Este comando es probablemente el mas utilizado para los nuevos y viejos usuarios, ya que de manera similar al comando /raw, este se encarga de guardar diferentes tipos datos del usuario tanto a pie, como en un vehiculo, en un archivo llamado `savedpositions.txt`, el cual podras ubicar en la ruta `%appdata%./../../Documents/GTA San Andreas User Files/SAMP/savedpositions.txt`.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				Times: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - Timestamp`)
					.setDescription('Este comando **mostrara/ocultara** la hora junto a todos los mensajes en el cuadro de chat.\nLa hora que se muestra en pantalla es la hora local(tu localidad), no la hora del servidor.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				VW: new EmbedBuilder()
					.setColor('#df740f')
					.setTitle(`Client Commands - VirtualWorld`)
					.setDescription('Se encarga unicamente de mostrar el VirtualWorld(id) en el que te encuentras.')
					.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),
			}

			const selectedValue1 = interaction.values[0]
			const selectedEmbed1 = embeds[selectedValue1]

			await interaction.reply({ embeds: [selectedEmbed1] })
			setTimeout(() => interaction.deleteReply().catch(e => console.error(e)), 80000)
		}
		else if (interaction.customId === 'scripting') {
			const embeds = {
				OASI: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnActorStreamIn`)
				.setDescription('Esta devolución de llamada se llama cuando el cliente de un jugador transmite a un actor.\n```md\n# |    Nombre   | Descripcion |\n# |   actorid   | ActorID que sera transmitida al jugador |\n# | forplayerid | ID del jugador que transmite al Actor   |```\n\n## • Example:\n```c\npublic OnActorStreamIn(actorid, forplayerid)\n{\n\tnew string[40];\n\tformat(string, sizeof(string), "El actor %d ahora se transmite por ti", actorid);\n\tSendClientMessage(forplayerid, 0xFFFFFFFF, string);\n\treturn 1;\n}```\n\n:bulb:**CONSEJO:**\nEsta devolución de llamada también puede ser invocada por NPC.\nLa siguiente informacion fue extraida y tomada de [OPEN.MP](https://www.open.mp/docs/scripting/callbacks).')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				OASO: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnActorStreamOut`)
				.setDescription('Esta devolución de llamada se llama cuando el cliente de un jugador transmite a un actor.\n\n## - Example:\n```c\npublic OnActorStreamOut(actorid, forplayerid)\n{\n\tnew string[40];\n\tformat(string, sizeof(string), "El actor %d ahora está transmitido por ti", actorid);\n\tSendClientMessage(forplayerid, 0xFFFFFFFF, string);\n\treturn 1;\n}```')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				OCCR: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnClientCheckResponse`)
				.setDescription('Esta devolución de llamada se llama cuando se completa una solicitud SendClientCheck.\n\n## - Example:\n```c\npublic OnPlayerConnect(playerid)\n{\n\tSendClientCheck(playerid, 0x48, 0, 0, 2);\n\treturn 1;\n}```\n\n```public OnClientCheckResponse(playerid, actionid, memaddr, retndata)\n{\n\tif(actionid == 0x48) // or 72\n\t{\n\t\tprint("WARNING: The player doesnt seem to be using a regular computer!");\n\t\tKick(playerid);\n\t}\n\treturn 1;\n}```\n### • Notas: Esta funcion es llamada primero en **filterscripts**.')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				OCM: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnClientMessage`)
				.setDescription('Es llamado cada vez que un NPC ve un ClientMessage. Esto será cada vez que se utilice una función **SendClientMessageToAll** y cada vez que se envíe una función **SendClientMessage** hacia el NPC. Esta devolución de llamada no se realizará cuando alguien diga algo. Para obtener una versión de esto con texto del jugador, consulte **NPC:OnPlayerText**.\n\n## - Example:\n```c\npublic OnClientMessage(color, text[])\n{\n\tif (strfind(text,"Bank Balance: $0") != -1)\n\t{\n\tSendClientMessage(playerid, -1, "I am poor :(");\n\t}\n}\n```\n### • Notas: Esta funcion es llamada primero en **filterscripts**.')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				ODR: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnDialogResponse`)
				.setDescription('Se llama cuando un reproductor responde a un cuadro de diálogo que se muestra usando ShowPlayerDialog haciendo clic en un botón, presionando ENTER/ESC o haciendo doble clic en un elemento de la lista. (si usa un cuadro de diálogo de estilo de lista)\nPuedes encontrar mas informacion al respecto en [**OnDialogResponse**](https://www.open.mp/docs/scripting/callbacks/OnDialogResponse).\n\n### • Notas:\nLos parámetros pueden contener diferentes valores, según el estilo del diálogo, es recomendable variar entre dialogos si contienes mucha informacion.\n### • Advertencia:\nEl diálogo de un jugador no se oculta cuando se reinicia el modo de juego, lo que hace que el servidor imprima "Advertencia: PlayerDialogResponse PlayerId: 0 ID de diálogo no coincide con el último ID de diálogo enviado" si un jugador respondió a este diálogo después del reinicio.')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				OEEMS: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnEnterExitModShop`)
				.setDescription('Esta devolución de llamada se llama cuando un jugador entra o sale de una tienda de modificaciones.\n\n## - Example:\n```c\npublic OnEnterExitModShop(playerid, enterexit, interiorid)\n{\n\tif (enterexit == 0) // If enterexit is 0, this means they are exiting\n\t{\n\t\tSendClientMessage(playerid, COLOR_WHITE, "Nice car! You have been taxed $100.");\n\t\tGivePlayerMoney(playerid, -100);\n\t}\n\treturn 1;\n}```')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

				OIC: new EmbedBuilder()
				.setColor('#df740f')
				.setTitle(`Callback Information - OnIncomingConnection`)
				.setDescription('Esta devolución de llamada se llama cuando una dirección IP intenta conectarse al servidor, de esta manera.\nSi deseas bloquear conexiones entrantes, utilice BlockIpAddress.\n\n## - Example:\n```c\npublic OnIncomingConnection(playerid, ip_address[], port)\n{\n\nprintf("Incoming connection for player ID %i [IP/port: %s:%i]", playerid, ip_address, port);\n\nreturn 1;\n}```')
				.setFooter({ text: 'Administracion de PawnCode - SAMP', iconURL: 'https://i.imgur.com/IWhvfck.png' }),

			}
		
			const selectedValue2 = interaction.values[0]
			const selectedEmbed2 = embeds[selectedValue2]
		
			await interaction.reply({ embeds: [selectedEmbed2] })
			setTimeout(() => interaction.deleteReply().catch(e => console.error(e)), 80000)
		}
		else { return; }
	},
};

