const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball') 
        .setDescription('Haz una pregunta y recibe una respuesta')
        .addStringOption(option => 
            option.setName('pregunta')
            .setDescription('La pregunta')
            .setRequired(true)
            ),
    async run(client, interaction, message, args) {

        const pregunta = interaction.options.getString("pregunta")
        if(!pregunta) return interaction.channel.send("Debes escribir tu pregunta")

        let respuestas = ["Si", "No", "Probablemente no", "Probablemente si", "Puedes confiar en ello", "Por supuesto que no!, talvez, alomejor, no lo eres"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new Discord.MessageEmbed()
        .setDescription(`A tu pregunta:\n**${pregunta}**\n\nMi respuesta es:\n**${random}**`)
        .setColor("ORANGE")

        interaction.reply({ embeds: [embed] })
    }
}