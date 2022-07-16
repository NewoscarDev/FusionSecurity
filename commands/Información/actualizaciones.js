const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('actualizaciones') 
        .setDescription('Muestra actualizaciones'),
    async run(client, interaction) {
       
            const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096, }))
            .setTitle('**Actualizacion 3.0.0**')
            .setColor('AQUA')
            .setDescription("Se incrementaron los siguientes comandos:\n**Diversion**\n```/logro```\n```/skin```\n**Musica**\n```/queue```\n```/play```\n```/pause```\n```/lopp```\n```/continue```\n```/skip```\n```/volume```\n**Moderacion**\n```/warn```\n```/lock-escribir```\n```/unlock-escribir```\n```/lock```\n```/unlock```\n**Informacion**\n```/server-info```\n```/user-info```\n```/roles```\n Se eliminaron los comando /ban y /kick por que tienen problemas. **(Se volveran a poner en la siguien actualizacion 4.0.0)**\n**Para mas informacion sobre los comando pon /help.**")
            .setFooter('©FusionSecurity Updates')
            await interaction.reply({ embeds: [embed] })
    
    }
}