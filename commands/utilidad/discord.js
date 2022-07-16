const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discord') 
        .setDescription('Muestra el enlace del discord oficial')
        .addUserOption(option => option.setName('objetivo').setDescription('Muestra el enlace del discord oficial')),
    async run(client, interaction) {
       const user = interaction.options.getUser('objetivo') 
       
            const embed = new MessageEmbed()
            .setColor('AQUA')
            .setDescription('**Discord oficial**: https://discord.gg/gyfDA3BA6f.' )
            await interaction.reply({ embeds: [embed] })
    
    }
}