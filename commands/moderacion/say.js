const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Manda un anuncio en el servidor")
  .addStringOption( option =>
      option.setName("texto")
          .setDescription("razon del aviso al usuario")
          .setRequired(true)
  ),
    run: async (client, interaction, message) => {

  const texto = interaction.options.getString("texto") 
  const embed = new MessageEmbed()
  .setDescription(`${texto}`)
  .setColor('GREEN')
  await interaction.reply({ embeds: [embed] })
    
    }
}
