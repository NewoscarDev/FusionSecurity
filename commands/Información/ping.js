const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping') 
        .setDescription('Muestra el ping del bot'),
    async run(client, interaction) {
      
       
        let locales = {
           
            "en-US": `**Bot Ping**\n Api: **${client.ws.ping} ms**\n Bot: **${new Date() - interaction.createdTimestamp} ms**`,
            "es-ES": `**Ping del Bot**\n Api: **${client.ws.ping} ms**\n Bot: **${new Date() - interaction.createdTimestamp} ms**`,
        }
        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription(`${locales[interaction.locale]}`)
        interaction.reply({ embeds: [embed] })
    }
}