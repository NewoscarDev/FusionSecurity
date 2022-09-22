const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()

    .setName('queue')
    .setDescription('Mira la playlist de Musica'),

    async run(client, interaction) {

        const queue = client.distube.getQueue(interaction.member.voice.channel)
        if(!queue) return interaction.reply({ content: 'No hay canciones reproduciendose', ephemeral: false})

        const embed = new Discord.MessageEmbed()

        .setTitle(`Playlist de ${interaction.guild.name}`)
        .setDescription('\n' + queue.songs.map((song, id) => `**${id + 1}**. 📀${song.name} - \`${song.formattedDuration}⏳\``).slice(0, 10).join("\n\n"))
        .setColor("ORANGE")
        .setFooter(`${interaction.member.user.username}`)
        .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}