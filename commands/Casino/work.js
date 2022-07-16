const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const economia = require('../../models/economia')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('work') 
        .setDescription('Mina criptomonedas.'),
    async run(client, interaction, message, args) {

        let datos = await economia.findOne({ userID: interaction.member.id })
        if(!datos){
            let datosnuevos = new economia({
                userID: interaction.member.id,
                dinero: 0,
                dinerobanco: 0
            })
            await datosnuevos.save()
            return interaction.reply({ content: "Tus datos estan siendo guardados, usa otra vez el comando"})
        }

        let dinerototal = datos.dinero

        let random = Math.floor(Math.random() * 325) + 150

        const embed = new Discord.MessageEmbed()

        .setTitle("Trabajo")
        .setDescription(`**${interaction.user.tag}** mino Criptomonedas
         y gano **${random}** <:money:893553167596421131> CriptoFusiones.
         `)
        .setColor("ORANGE")
        .setFooter('©FusionSecurity Casino')

        await economia.findOneAndUpdate({ userID: interaction.user.id }, { dinero: dinerototal + Number(random) })

         interaction.reply({ embeds: [embed] })


    }
}  