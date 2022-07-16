const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logro') 
        .setDescription('Muestra la skin del usuario seleccionado')
        .addStringOption(option => 
            option.setName("texto")
                .setDescription("usuario bla bla")
                .setRequired(true)
        ),
    async run(client, interaction) {
        const rand = Math.floor(Math.random() *  (15 - 1 + 1) + 1); // xd ok
        const texto = interaction.options.getString("texto") 
        const embed = new MessageEmbed()
        .setImage(`https://minecraftskinstealer.com/achievement/${rand}/%C2%A1Logro+obtenido%21+/${texto}`)
        return interaction.reply({embeds: [embed]})
   
    } 
}
