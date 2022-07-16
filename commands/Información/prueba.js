const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const pruebaModel = require('../../models/prueba.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("prueba")
    .setDescription("Avisa a un usuario sobre la fraccion cometida.")
  .addStringOption( option =>
      option.setName("reason")
          .setDescription("razon del aviso al usuario")
          .setRequired(true)
  ),
    run: async (client, interaction, message) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
  const reason = interaction.options.getString("reason") || 'No especificada'

  new pruebaModel({
    guildId: interaction.guildId,
    reason
  }).save()
  console.log(`${reason}`)
  const embed = new MessageEmbed()
  .setDescription(`Su informacion se ha enviado correctamente a mi base de datos.`)
  .setColor('GREEN')
  await interaction.reply({ embeds: [embed] })
}
}