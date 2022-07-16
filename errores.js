const chalk = require("chalk");
const { MessageEmbed } = require("discord.js")
module.exports = async (client) => {

    process.on('uncaughtException', (error, origin) => {
        console.log(chalk.blue('----- Uncaught exception -----'))
        console.log(error.stack)
        console.log(chalk.blue('----- Exception origin -----'))
        console.log(origin)

        let errmsg = new MessageEmbed()
        .setTitle('Ha ocurrido un error')
        .setDescription(`**Tengo el siguiente error: **  ${error.stack}`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/882684143903866941/919603954134974474/Error.png`)
        .setFooter('©FusionSecurity Errores ')
        .setTimestamp()
        .setColor('RED')
        client.channels.cache.get('924740336406896680').send({ embeds: [errmsg] })
                
    })
    
    process.on('unhandledRejection', (reason, promise) => {
        console.log(chalk.blue('----- Unhandled Rejection at -----'))
        console.log(promise)
        console.log(chalk.blue('----- RAZON -----'))
        console.log(reason.stack)

        let errmsg = new MessageEmbed()
        .setTitle('Ha ocurrido un error')
        .setDescription(`**Tengo el siguiente error:** ${reason.stack}`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/882684143903866941/919603954134974474/Error.png`)
        .setFooter('©FusionSecurity Errores')
        .setColor('RED')
        .setTimestamp()
        client.channels.cache.get('924740336406896680').send({ embeds: [errmsg] })


    })
}