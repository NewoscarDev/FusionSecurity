const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const ms = require('ms') 
const Schema = require('../../models/mute')
const { MessageEmbed } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()

        .setName('mute') 
        .setDescription('Mutea a un miembro')
        .addUserOption(option =>
            option
            .setName("usuario")
            .setDescription("Menciona al usuario que vas a mutear")
            .setRequired(true)
            )
        .addStringOption(option =>
            option
            .setName("tiempo")
            .setDescription("Especifica la duracion que le vas a mutear")
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName("motivo")
            .setDescription("Especifica el motivo de porque le vas a mutear")
        ),

    async run(client, interaction) {

        const usuario = interaction.options.getUser(`usuario`)
        let user = interaction.guild.members.cache.get(usuario.id)
        if(!user) return interaction.reply("No he encontrado ese usuario")

        const time = interaction.options.getString("tiempo")
        const razon = interaction.options.getString("motivo") || 'No especificado'

        const tiempo = ms(time)

        if(!interaction.guild.me.permissions.has("MANAGE_ROLES")) return interaction.reply("Necesito el permiso de **Gestionar Roles** para utilizar este comando")
        if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply("Necesitas el permiso de **Gestionar Roles** para utilizar este comando")
        if(interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return interaction.reply("No puedes mutear a este usuario porque su rol es superior al tuyo")

        const muteid = await Schema.findOne({ guildId: interaction.guildId })
        if(!muteid) return interaction.reply('No hay datos guardados en mi base de datos!')

        const member = interaction.guild.members.cache.get(user.id)
            
        member.roles.add(`${muteid.rolId}`)
        interaction.reply(`El usuario **${usuario.tag}** ha sido muteado durante **${time}** por **${razon}**`)

        usuario.send({embeds: [new MessageEmbed()
            .setTitle(`Has sido Muteado`)
            .setDescription(`
            **Has sido muteado en el servidor:** ´${interaction.guild.name}´
            **Durante:** ${time}
            **Razon:** ${razon}
            `)
            .setColor('RED')
            .setFooter('No incumplas las normas!', client.user.displayAvatarURL())
            .setThumbnail(interaction.guild.iconURL({ dynamic: true })) ]})

        setTimeout(() => {
            member.roles.remove(`${muteid.rolId}`)

            interaction.channel.send(`El usuario **${usuario.tag}** ha sido desmuteado`)

        }, tiempo)

    }
}