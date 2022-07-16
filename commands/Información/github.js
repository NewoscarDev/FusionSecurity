const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Muestra el github de la persona seleccionada.')
        .addStringOption(option =>
            option
            .setName("nombre")
            .setDescription("Nombre de github")
            .setRequired(true)),
    async run(client, interaction) {
        const nombre = interaction.options.getString("nombre")
await interaction.reply({
    content: `https://github.com/${nombre}` || "Este usuario no existe", 
    ephemeral: false,           
})
  }
}