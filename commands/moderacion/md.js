const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const ms = require('ms');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('md') 
        .setDescription('Manda un mensage al md de la persona seleccionada')
        .addUserOption(option => 
            option.setName("user")
                .setDescription("usuario a seleccionar")
                .setRequired(true),
        )
        .addStringOption(option => 
            option.setName('reason')
        .setDescription('Reason to ban member')
        .setRequired(true)),
        premiumOnly: true,
        userPermissions: ['ADMINISTRATOR'],
    async run(client, interaction) {

        const user = interaction.options.getUser("user")
        const mensage = interaction.options.getString("reason")

        user.send({embeds: [new MessageEmbed()
            .setTitle('**¡Se te a enviado un mensaje!**')
           .setDescription(`Contenido: ${mensage}\n**Informacion del mensage**\nServidor: ${interaction.guild.name}\nModerador: interaction.user.id\nHora: `)
            .setColor('GREEN')
         ]})

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`✅Se a enviado correctamente el mensage al miembro **${user}**`)
            .setFooter(`FusionSecurity - Md`)

            interaction.reply({ embeds: [embed] });
    }
};