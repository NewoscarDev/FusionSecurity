const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('play')
    .setDescription('Reproduce una cancion en un canal de voz')
    .addStringOption(option =>
        option
        .setName("cancion")
        .setDescription("Escribe la cancion que quieras escuchar")
        .setRequired(true)
        ),

    async run(client, interaction){

        const cancion = interaction.options.getString("cancion")

        if(!interaction.member.voice.channel) return interaction.reply({ content: 'Debes estar en un canal de voz', ephemeral: false})
        if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: 'Debes estar en el mismo canal de voz que yo', ephemeral: false})

        interaction.client.distube.playVoiceChannel(
            interaction.member.voice.channel,
            cancion,
            {
                textChannel: interaction.channel,
                member: interaction.member,
            }
        );
        interaction.reply({ content: 'Buscando la cancion...', ephemeral: true})
        }
}