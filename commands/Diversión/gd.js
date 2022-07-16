const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const {mcapi, uuidToUsername} = require('mcapi')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gd') 
        .setDescription('El texto que pongas se combertira en formato geometry dash')
        .addStringOption(option => 
            option.setName("palabra")
                .setDescription("palabra que quieres combertir")
                .setRequired(true)
        ),
    async run(client, interaction) {
        const palabra = interaction.options.getString("palabra")
        const embed = new MessageEmbed()

        .setImage(`https://gdcolon.com/tools/gdlogo/img/${palabra}`)
        .setColor('GOLD')

       await interaction.reply({ embeds: [embed] })
    }
}