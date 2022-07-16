const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const karit = require('ckarit')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme') 
        .setDescription('Muestra un meme'),
    async run(client, interaction) {

        let meme = await karit.meme()
        const embed = new MessageEmbed()

        .setDescription('Memes |FusionSecurity')
        .setImage(meme)
        .setColor('RANDOM')
        
        interaction.reply({embeds:[embed]})
    } 
}
