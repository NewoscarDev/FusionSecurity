const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('loop')
        .setDescription('Haz que las canciones de la playlist suenen repetidas')
        .addStringOption(option => 
            option
            .setName("accion")
            .setDescription("Especifica si quieres activarlo o desactivarlo")
            .addChoice("activar", "activar")
            .addChoice("desactivar", "desactivar")
            .setRequired(true)
            ),

    async run(client, interaction){

        const queue = client.distube.getQueue(interaction.member.voice.channel)
        if(!interaction.member.voice.channel) return interaction.reply({ content: 'Debes estar en un canal de voz', ephemeral: false})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Debes estar en el mismo canal que yo', ephemeral: false})
        if(!queue) return interaction.reply({ content: 'No hay canciones en la Playlist', ephemeral: false})

        const opcion = interaction.options.getString("accion")

        if(opcion == 'desactivar'){
            client.distube.setRepeatMode(interaction.member.voice.channel, 0)
            interaction.reply({ content: 'La **repeticion** se ha **desactivado**' })
            return;
        }

        if(opcion === 'activar'){
            client.distube.setRepeatMode(interaction.member.voice.channel, 2)
            interaction.reply({ content: 'La **repeticion** se ha activado**'})
            return;
        }
   
 }
}