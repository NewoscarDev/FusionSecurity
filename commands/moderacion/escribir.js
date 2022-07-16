const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('unlock-escribir')
    .setDescription('Bloquea el canal donde se use el comando')
    .addRoleOption(option =>
        option
        .setName("rol")
        .setDescription("Menciona al rol que vas a desbloquear para que escriba en este canal.")
        .setRequired(true)),
    async run(client, interaction) {

        if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply("No tengo suficientes permisos")
        if(!interaction.member.permissions.has("MANAGER_CHANNELS")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
        let rol2 = interaction.options.getRole("rol")

        let rol = interaction.guild.roles.cache.find(r => r.name === rol2.name)

        if(!rol) return interaction.reply(`No he podido encontrar el rol ${rol2}`)

        interaction.channel.permissionOverwrites.create(rol, {
            SEND_MESSAGES: true
        })

        interaction.reply(`Se ha desbloqueado la escritura correctamente para ${rol2}`)


    }
}