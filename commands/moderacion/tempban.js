const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const ms = require('ms')

module.exports = {

    data: new SlashCommandBuilder()

        .setName('tempban') 
        .setDescription('Banea a un usuario temporalmente')
        .addUserOption(option =>
            option
            .setName('usuario')
            .setDescription('Especifica que usuario vas a banear temporalmente')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('tiempo')
            .setDescription('Especifica el tiempo que le vas a mutear')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('motivo')
            .setDescription('Especifica el motivo de porque le vas a banear')),

    async run(client, interaction) {

        var perms = interaction.member.permissions.has('BAN_MEMBER')
        if(!perms) interaction.reply('Debes tener el permiso **Banear miembros** para usar este comando')

        var perms2 = interaction.guild.me.permissions.has('BAN_MEMBERS')
        if(!perms2) interaction.reply('Necesito el permiso **Banear miembros** para usar este comando')

        const user = interaction.options.getUser('usuario')
        const miembro = await interaction.guild.members.cache.get(user.id)
        const tiempo = interaction.options.getString('tiempo')
        const tiempoMS = ms(tiempo)
        var motivo = interaction.options.getString('motivo') || 'No especificada'

        if(user.id === interaction.user.id) return interaction.reply('No te puedes banear a ti mismo')
        if(interaction.member.roles.highest.comparePositionTo(miembro.roles.highest) <= 0) return interaction.reply('No puedes banear a este miembro')

        interaction.reply(`El usuario **${user.tag}** ha sido baneado temporalmente durante **${tiempo}** por **${motivo}**`)
        interaction.guild.members.ban(user.id, { reason: motivo }).then(() => {

            setTimeout(() => {
                interaction.guild.members.unban(user.id)
                interaction.channel.send(`El usuario **${user.tag}** ha sido desbaneado, fue baneado durante **${tiempo}** por **${motivo}**`)
            }, tiempoMS)
        })

    }
}