const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anounce') 
        .setDescription('Anuncia algo')
        .addStringOption((option) => option.setName('anuncio').setDescription('El anuncio').setRequired(true))
        .addChannelOption((option) => option.setName('channel').setDescription('El canal bla bla').setRequired(true)),
        premiumOnly: true,
        userPermissions: ['ADMINISTRATOR'],
        
    async run(client, interaction) {
        const canal = interaction.options.getChannel('channel')
        const texto = interaction.options.getString('anuncio')

        client.channels.cache.get(canal.id).send({embeds: [new MessageEmbed().setTitle('Anuncio').setDescription(texto).setColor('GREEN').setThumbnail(interaction.guild.iconURL())]})

        interaction.reply({ embeds: [new MessageEmbed().setDescription(`Anuncio enviado al canal ${canal.name} correctamente!`).setColor('GREEN')]})
   
    } 
}