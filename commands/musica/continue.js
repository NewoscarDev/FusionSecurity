const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('continue')
    .setDescription('Reanuda una cancion pausada'),

    async run(client, interaction) {

        if(!interaction.member.voice.channel) return interaction.reply({ content: 'Debes estar en un canal de Voz', ephemeral: true})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Debes estar en el mismo canal de voz que yo', ephemeral: true})

        const queue = client.distube.getQueue(interaction.member.voice.channel)
        if(!queue) return interaction.reply({ content: 'No hay canciones en la lista', ephemeral: true})

        try {
            client.distube.resume(interaction.member.voice.channel)
            interaction.reply('La cancion fue reanudada')
            return;
        } catch (e) {
            interaction.reply(`Hubo un error inesperado: **${e}**`)
        }
  
    }
}