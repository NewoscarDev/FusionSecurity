const { SlashCommandBuilder } = require('@discordjs/builders')
const simplydjs = require("simply-djs");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculadora') 
        .setDescription('Saca una calculadora'),
    async run(client, interaction) {
        await interaction.deferReply();

simplydjs.calculator(interaction, {
  slash: true,
  credit: false
  // other options
});
    

}
}

