const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Reporta un bug o un error del bot.')
        .addStringOption(option =>
            option
            .setName("reporte")
            .setDescription("Reporte que vas a enviar")
            .setRequired(true)),

    async run(client, interaction, message) {
        const texto = interaction.options.getString("reporte")

        const embed = new MessageEmbed()
                .setTitle('Reporte')
                .setDescription(`✅ El reporte se envio correctamente.`)
                .setColor('GREEN')
                interaction.reply({ embeds: [embed] });

        const reporte = new MessageEmbed()
            .setDescription(`**Enviado por:** ´${interaction.user.tag}´\n**Reporte:** ${texto} `)
            .setFooter('©FusionSecurity Reportes')
            .setColor('GREEN')
            .setTimestamp()
         client.channels.cache.get('883105064183554168').send({ embeds: [reporte] })
    }
}
