const {SlashCommandBuilder} = require('@discordjs/builders')
const config = require('../../config.json')
const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Te muestra todos los roles de este servidor'),
    async run(client, interaction, language) {
      const { MessageEmbed } = require("discord.js");

      let roles = interaction.guild.roles.cache
          .filter(r => r.id !== interaction.guild.id)
          .map((roles) => roles.toString())
          
  

      const embed = new MessageEmbed()
          .setTitle("Lista roles")
          .setFooter(interaction.guild.name, interaction.guild.iconURL())
          .setColor("BLUE")
          .setDescription(`${roles}`)
          .setTimestamp()

     

      interaction.channel.send({  embeds: [embed] });
  }
}
          