const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Bota nuestro bot para darlo a conocer a mas gente'),
    async run(client, interaction, message) {
        const user = interaction
       
        const embedprincipal = new MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096, }))
        .setAuthor('Vota a FusionSecurity para que se una a mas servidores.')
        .setDescription('[Link de top.gg](https://top.gg/bot/881883753327243334)')
        .setColor("00BFFF")
            
        await interaction.reply({ embeds: [embedprincipal] })
    }
}
