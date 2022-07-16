const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const economia = require('../../models/economia')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bal') 
        .setDescription('Mira tu balance de Criptomonedas'),
    async run(client, interaction, message, args) {

        //const user = interaction.mentions.users.first() || interaction.user

        let datos = await economia.findOne({ userID: interaction.member.id })
        if(!datos) {
            let nuevosdatos = new economia({
                userID: interaction.member.id,
                dinero: 0,
                dinerobanco: 0
            })
            await nuevosdatos.save()
            return interaction.reply({ content: "Los datos estan siendo guardados, usa otra vez el comando"})
        }

        let dinerototal = datos.dinero
        let dinerobancototal = datos.dinerobanco

        const embed = new Discord.MessageEmbed()

        .setTitle("Balance")
        .setDescription(`Dinero de **${interaction.member.user.username}** <:money:893553167596421131>\n\nCriptoFusiones fuera del banco: **${dinerototal}** <:money:893553167596421131>\nCriptoFusiones en el banco: **${dinerobancototal}**\nCriptoFusiones en total: **${dinerototal + dinerobancototal}**`)
        .setColor("ORANGE")
        .setFooter('©FusionSecurity Casino')

        await interaction.reply({ embeds: [embed] })


    }
}