const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('lock-escribir')
    .setDescription('Bloquea el canal donde se use el comando')
    .addRoleOption(option =>
        option
        .setName("rol")
        .setDescription("Menciona al rol que vas a bloquear la escritura.")
        .setRequired(true)),
    async run(client, interaction) {

        if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply("No tengo suficientes permisos")
        if(!interaction.member.permissions.has("MANAGER_CHANNELS")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
        let rol2 = interaction.options.getRole("rol")

        let rol = interaction.guild.roles.cache.find(r => r.name === rol2.name)

        if(!rol) return interaction.reply(`No he podido encontrar el rol ${rol2}`)

        interaction.channel.permissionOverwrites.create(rol, {
            SEND_MESSAGES: false
        })

        interaction.reply(`Se ha bloqueado la escritura correctamente para ${rol2}`)
    }
}