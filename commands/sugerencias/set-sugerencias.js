const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Schema = require('../../models/sugerencias')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("set-sugerencias")
    .setDescription("Establece un canal de sugerencias!")
  .addChannelOption(option =>
      option.setName("channel")
          .setDescription("el canal")
          .setRequired(true)
  ),
    run: async (client, interaction, message) => {

        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
        
        const canal = interaction.options.getChannel('channel')

        const data = Schema.findOne({ guildId: interaction.guildId })

        if(data){
            Schema.findOneAndDelete({ guildId: interaction.guildId })
            const sch = new Schema({
                channel: canal.id,
                guildId: interaction.guildId
            })
            sch.save();
        } 
        if(!data){
            const sc = new Schema({
                channel: canal.id,
                guildId: interaction.guildId
            })
            sc.save();
        }
        const embed = new MessageEmbed()
        .setDescription(`El canal de sugs ha sido establezido a ${canal} correctamente!`)
        .setColor('WHITE')
        .setTimestamp() 

        interaction.reply({embeds:[embed]})

    }
}