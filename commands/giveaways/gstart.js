const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const ms = require('ms');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gstart') 
        .setDescription('Empieza un sorteo')
        .addStringOption(option =>
            option
            .setName("duration")
            .setDescription("duracion del sorteo")
            .setRequired(true))

            .addIntegerOption(option => 
                option
                .setName("winners")
                .setDescription("Numero de ganadores")
                .setRequired(true))

                .addStringOption(option => 
                    option 
                    .setName("prize")
                    .setDescription('premio que vas a sortear')
                    .setRequired(true)
                    ),
                    userPermissions: ['ADMINISTRATOR'],

    async run(client, interaction) {

        const duration = interaction.options.getString("duration");
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');

        const embed = new MessageEmbed()
       .setDescription(`@everyone Soteo`)
       .setColor('GREEN')
       await interaction.reply({ embeds: [embed] })

        client.giveawaysManager.start(interaction.channel, {
            duration: ms(duration),
            winnerCount,
            prize
        }).then((gData) => {
            console.log(gData); // {...} (messageId, end date and more)
        });
        // And the giveaway has started!
    }
};
    
