const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('volume')
    .setDescription('Cambia el volumen de la cancion que estes escuchando')
    .addNumberOption(option =>
        option
        .setName("volumen")
        .setDescription("Cambia el volumen de la cancion que estes escuchando")
        .setRequired(true)
        ),

    async run(client, interaction){

        if(!interaction.member.voice.channel) return interaction.reply({ content: 'Debes estar en un canal de Voz', ephemeral: false})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Debes estar en el mismo canal de voz que yo', ephemeral: false})

        const queue = client.distube.getQueue(interaction.member.voice.channel)
        if(!queue) return interaction.reply({ content: 'No hay una playlist de Canciones', ephemeral: false})

        let porcentaje = interaction.options.getNumber('volumen')
        if(porcentaje < '1') return interaction.reply({ content: 'El volumen debe ser mayor a 1', ephemeral: false })
        if(porcentaje > '100') return interaction.reply({ content: 'El porcentaje no debe ser mayor que 100', ephemeral: false })

        try {
            client.distube.setVolume(interaction.member.voice.channel, porcentaje)
        } catch (e) {
            interaction.channel.send(`Hubo un error inesperado: **${e}**`)
            return;
        }
        
        interaction.reply(`El volumen se ha establecido a **${porcentaje}%**`)
    }
}