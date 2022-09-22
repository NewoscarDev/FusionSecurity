const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('skip')
    .setDescription('Salta la cancion que estes escuchando'),

    async run(client, interaction){

        const queue = client.distube.getQueue(interaction.member.voice.channel)
        if(!queue) return interaction.reply({ content: 'No hay ninguna cancion en la Playlist', ephemeral: false})
        if(!interaction.member.voice.channel) return interaction.reply({ content: 'Debes estar en un canal de voz', ephemeral: false})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Debes estar en el mismo canal de voz que yo', ephemeral: false})

        client.distube.skip(interaction.member.voice.channel)
        interaction.reply('La cancion fue saltada correctamente')

    }
} 