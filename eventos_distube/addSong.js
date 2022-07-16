const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");

module.exports = (client, queue, song) => {
    queue.textChannel.send({embeds: [new MessageEmbed()
        .setDescription(`Cancion añdida a la playlist: **🎵 ${song.name}**`)
        .setColor('GREEN')
    ]})}
    
