const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('pause')
    .setDescription('Pausa la cancion que estes escuchando'),

    async run(client, interaction){

        if(!interaction.member.voice.channel) return interaction.reply({ content: 'Debes estar en un canal de Voz', ephemeral: true})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Debes estar en el mismo canal de voz que yo', ephemeral: true})

        const queue = client.distube.getQueue(interaction.member.voice.channel)
        if(!queue) return interaction.reply({ content: 'No hay canciones en la lista', ephemeral: true})

        if(!queue.pause){
            interaction.reply({ content: `La cancion ya estaba pausada`, ephemeral: true})
            return;
        }
        
        try{
            client.distube.pause(interaction.member.voice.channel)
            interaction.reply({ content: 'La cancion ya esta pausada correctamente'})
            return;
        } catch (e) {
            interaction.reply({ content: `Hubo un error inesperado: **${e}**`, ephemeral: true})
        }

    }
}