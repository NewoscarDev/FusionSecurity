const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const moderacion = require('../../models/moderacion')

module.exports = {

    data: new SlashCommandBuilder()

        .setName('antibots') 
        .setDescription('Configura el sistema de antibots')
        .addStringOption(option =>
            option
            .setName('accion')
            .setDescription('Especifica si vas a activar o desactivar')
            .setRequired(true)
            .addChoice("activar", "activar")
            .addChoice("desactivar", "desactivar")),

    async run(client, interaction) {
 
        var perms = interaction.member.permissions.has('ADMINISTRATOR')
        if(!perms) return interaction.reply('No tienes suficientes permisos para ejecutar este comando')

        var perms2 = interaction.guild.me.permissions.has('KICK_MEMBERS')
        if(!perms2) return interaction.reply('Necesito el permiso **Expulsar miembros** para usar este comando')

        const datos = await moderacion.findOne({ guildID: interaction.guild.id })
        if(!datos){
            const schema = new moderacion({
                guildID: interaction.guild.id,
                rolQuitar: 'No',
                rolAñadir: 'No',
                antibots: 'Desactivado'
            })
            await schema.save()
        }

        const accion = interaction.options.getString('accion')
        if(accion === 'activar'){
            if(datos.antibots === 'Activado') return interaction.reply('El sistema de antibots ya estaba activado')
            await moderacion.findOneAndUpdate({ guildID: interaction.guild.id }, { antibots: 'Activado'})
            return interaction.reply(`Ahora **no** se podran añadir bots al servidor`)
        }
        if(accion === 'desactivar'){
            if(datos.antibots === 'Desactivado') return interaction.reply('El sistema de antibots ya estaba desactivado')
            await moderacion.findOneAndUpdate({ guildID: interaction.guild.id }, { antibots: 'Desactivado'})
            return interaction.reply(`Ahora **si** se podran añadir bots al servidor`)
        }

    }
}