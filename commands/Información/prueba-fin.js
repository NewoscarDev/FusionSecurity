const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const pruebaModel = require('../../models/prueba.js')
const moment = require('moment')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("pruebas")
    .setDescription("Usuario a ver los warns"),
    run: async (client, interaction, message) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")

  const userWarnings = await pruebaModel.find({
    guildId: interaction.guildId,
});
const embed = new MessageEmbed()
.setDescription(`${reason}`)
interaction.reply({ embeds:[embed], ephemeral: true })
  
    
  }
}
