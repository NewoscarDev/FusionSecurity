const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("generador-codes")
    .setDescription("Manda un anuncio en el servidor"),
    ownerOnly: true,
    run: async (client, interaction, message) => {
  const embed = new MessageEmbed()
  .setTitle("Generador Codigos premium")
  .setDescription(`Este comando es exclusivo para los owners.
  Elige los codigos premium a generar y la duracion que desea tener el codigo.
  **Opciones**
  - Year X1
  - Year X10
  - Month X1
  - Month X10`)
  .setColor('GREEN')
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId('year-x1')
      .setLabel(`Year x1`)
      .setStyle('PRIMARY'),
    new MessageButton()
      .setCustomId('year-x10')
      .setLabel(`Year x10`)
      .setStyle('SUCCESS'),
      new MessageButton()
      .setCustomId('month-x1')
      .setLabel(`Month x1`)
      .setStyle('PRIMARY'),
      new MessageButton()
      .setCustomId('month-x10')
      .setLabel(`Month x10`)
      .setStyle('SUCCESS'),
  )

  await interaction.reply({components: [row], embeds: [embed] });
    }
}
