const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const warnModel = require('../../models/warnModel')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear-warns")
    .setDescription("Usuario a eliminar el warn")
    .addStringOption(option => 
      option.setName("warnid")
          .setDescription("usuario bla bla")
          .setRequired(true),
  ),
    run: async (client, interaction, message) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "No tienes los suficientes permisos para utilizar este comando", ephemeral: true})
        const warnid = interaction.options.getString("warnid")

  const data = await warnModel.findById(warnid);
        
    if(!data)
        return interaction.reply({embeds: [new MessageEmbed().setDescription(`El id ${warnid} no es valido!`).setColor('RED')], ephemeral: true})
    data.delete();
        
    const user = interaction.guild.members.cache.get(data.userId)
    interaction.reply({ embeds: [new MessageEmbed()
      .setTitle(`Warn Eliminado`)
      .setDescription(`He eliminado el warn: ${warnid} correctamente!`)
      .setColor('GREEN')], ephemeral: true})
  
    
  }
}
