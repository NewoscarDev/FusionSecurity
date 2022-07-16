const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reporte') 
        .setDescription('Muestra el correo electronico para enviar reportes de bugs, etc...'),
    async run(client, interaction) {
       
            const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096, }))
            .setTitle('Reporte')
            .setColor('AQUA')
            .setDescription("Acontinuación se muestran las formas en las que puedes enviar un reporte\n**Correo electronico**:\n**Discord:**NewoscarYT#8919")
            await interaction.reply({ embeds: [embed] })
    
    }
}