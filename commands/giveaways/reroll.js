const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const ms = require('ms');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('greroll') 
        .setDescription('Haz que le toque el premio a otra persona que halla participado')
        .addStringOption(option =>
            option
            .setName("message_id")
            .setDescription("id del mensaje del sorteo.")
            .setRequired(true)),
    async run(client, interaction) {

        const messageId = interaction.options.getString("message_id");

        client.giveawaysManager.reroll(messageId).then(() => {
            interaction.channel.send('Success! Giveaway rerolled!');
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }
};