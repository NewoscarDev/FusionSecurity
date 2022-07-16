const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twiter') //! El .setName siempre tiene que ser en minusculas 
        .setDescription('Muestra el twiter de la persona seleccionada.')
        .addStringOption(option =>
            option
            .setName("nombre")
            .setDescription("Nombre del twiter")
            .setRequired(true)),
    async run(client, interaction) {
        const nombre = interaction.options.getString("nombre")
await interaction.reply({
    content: `https://twitter.com/${nombre}` || "Este usuario no existe", 
    ephemeral: false,           
})
  }
}