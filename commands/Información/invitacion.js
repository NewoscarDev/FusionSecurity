const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invitacion')
        .setDescription('Muestra la invitacion del bot.'),
    async run(client, interaction, message) {
        const user = interaction
       
        const embedprincipal = new MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096, }))
        .setAuthor('Invitacion del bot FusionSecurity')
        .setDescription('**Invitacion:    **[📎📎📎](https://discord.com/api/oauth2/authorize?client_id=881883753327243334&permissions=8&scope=bot%20applications.commands)')
        .addField(
          "Info",
          "Puedes comunicar cualquier error o duda a NewoscarYT#8819 o unirte al servidor de soporte Poniendo `/discord`",
          "Tambien puedes ver las colavoraciones con otros servidores de discord poniendo `/colaboraciones`"
        )
        .setImage('https://cdn.discordapp.com/attachments/882684143903866941/904468745731342356/standard.gif')
        .setColor("00FFF0")
            
        await interaction.reply({ embeds: [embedprincipal] })
    }
}
