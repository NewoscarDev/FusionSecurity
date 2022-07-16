const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Schema = require('../../models/sugerencias')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Manda una sugerencia")
    .addStringOption(option => option
        .setName("sugerencia")
        .setDescription("La sugerencia bla bla")
        .setRequired(true),
    ),
  
    run: async (client, interaction, message) => {

        Schema.findOne({ guildId: interaction.guildId }, async(err, data) => {
            if(!data) return interaction.reply({
                content: 'El servidor no tiene ningun canal de sugerencias configurado!', ephemeral: true
            })
        
        const canal = client.channels.cache.get(data.channel);
        const sugerencia = interaction.options.getString('sugerencia')

        const Embed = new MessageEmbed()
        .setTitle('Nueva Sugerencia')
        .addField('Sugerencia', `${sugerencia}`) 
        .addField('Estado', 'Desconocido')
        .setColor('RANDOM')
        .setThumbnail('©FusionSecurity ')
        .setTimestamp()

        const msg = await canal.send({ embeds: [Embed] });

        msg.react('👍')
        msg.react('👎')

        interaction.reply({content: 'Tu sugerencia ha sido enviada.', ephemeral: true})
        })

    }
}