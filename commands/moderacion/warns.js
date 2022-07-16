const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const warnModel = require('../../models/warnModel')
const moment = require('moment')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Usuario a ver los warns")
    .addUserOption(option => 
      option.setName("user")
          .setDescription("usuario bla bla")
          .setRequired(true),
  ),
    run: async (client, interaction, message) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
  const user = interaction.options.getUser("user")

  const userWarnings = await warnModel.find({
    userId: user.id,
    guildId: interaction.guildId,
});
console.log(userWarnings);


if(!userWarnings?.length)
return interaction.reply({
    embeds: [
        new MessageEmbed()
        .setDescription(`El usuario ${user} no tiene warns en este servidor!`)
        .setColor('RED')
    ], ephemeral: true
})


const embedDescription = userWarnings.map((warn) => {
    const moderator = interaction.guild.members.cache.get(
        warn.moderatorId
    );
    return [
        `**warnId:** \`\`${warn._id}\`\``,
        `**Moderador:** ${moderator || 'No encontrado'}`,
        `**Razon:** \`\`${warn.reason}\`\``
    ].join("\n");
})
        .join("\n\n");

        const embed = new MessageEmbed()
        .setTitle(`Warns de ${user.tag}`)
        .setDescription(embedDescription)
        .setColor('RED')

        interaction.reply({ embeds:[embed], ephemeral: true })
  
    
  }
}
