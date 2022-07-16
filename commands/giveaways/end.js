const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const ms = require('ms');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gend') 
        .setDescription('Finaliza un sorteo con este comando.')
        .addStringOption(option =>
            option
            .setName("message_id")
            .setDescription("id del mensaje del sorteo.")
            .setRequired(true)),
    async run(client, interaction) {

        const messageId = interaction.options.getString("message_id");

        client.giveawaysManager.delete(messageId).then(() => {
            interaction.channel.send('Success! Giveaway deleted!');
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }
};