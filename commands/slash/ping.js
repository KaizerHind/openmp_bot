const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Pong 🏓`),
  async execute(client, interaction) {
    interaction.reply({ content: "Pong 🏓" })
    console.log(`${interaction.user.username}ha ejecutado el comando Pong.`)
  }
}