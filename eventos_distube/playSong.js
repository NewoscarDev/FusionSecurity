const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");

module.exports = (client, queue, song) => {

queue.textChannel.send({embeds: [new MessageEmbed()
    .setDescription(`Reproduciendo ahora: **🎵 ${song.name}**`)
    .setColor('RED')
]})}

