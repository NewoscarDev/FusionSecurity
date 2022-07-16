const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const {mcapi, uuidToUsername} = require('mcapi')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skin') 
        .setDescription('Muestra la skin del usuario seleccionado')
        .addStringOption(option => 
            option.setName("usuario")
                .setDescription("usuario bla bla")
                .setRequired(true)
        ),
        premiumOnly: true,
    async run(client, interaction) {
        const usuario = interaction.options.getString("usuario")
        const embed = new MessageEmbed()
        .setDescription(`Nombre de la cuenta: ${usuario}\n Descargar: [Descargar](https://minotar.net/download/${usuario})\n NameMC: [Click Me](https://mine.ly/${usuario})`)
        .setImage(`https://mc-heads.net/body/${usuario}/100`)
        .setThumbnail(`https://minotar.net/cube/${usuario}/100.png`)

       await interaction.reply({ embeds: [embed] })
    }
}
