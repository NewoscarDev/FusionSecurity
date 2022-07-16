const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const warnModel = require('../../models/warnModel')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Avisa a un usuario sobre la fraccion cometida.")
    .addUserOption(option => 
      option.setName("user")
          .setDescription("usuario bla bla")
          .setRequired(true),
  )
  .addStringOption( option =>
      option.setName("reason")
          .setDescription("razon del aviso al usuario")
          .setRequired(true)
  ),
    run: async (client, interaction, message) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
  const user = interaction.options.getUser("user")
  const reason = interaction.options.getString("reason") || 'No especificada'

  new warnModel({
    userId: user.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    reason,
    timestamp: Date.now()
  }).save()
  user.send({embeds: [new MessageEmbed()
  .setTitle(`Has sido warneado`)
  .setDescription(`Has sido warneado por: ${reason}\nModerador: ${interaction.user.username}\nServidor: ${interaction.guild.name}`)
  .setColor('ORANGE')
  .setFooter('No incumplas las normas!', client.user.displayAvatarURL())
  .setThumbnail(interaction.guild.iconURL({ dynamic: true })) ]})
        
  interaction.reply({embeds:[new MessageEmbed()
    .setTitle(`Usuario Warneado`)
    .setDescription(`El usuario ${user} ha sido advertido por: ${reason}\nModerador: ${interaction.user.username}\nServidor: ${interaction.guild.name}`)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true })) 
   .setColor('GREEN')]})
  
    
  }
}



