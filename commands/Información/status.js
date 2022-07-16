const {
    SlashCommandBuilder
} = require('@discordjs/builders')
const config = require('../../config.json')
const Discord = require("discord.js");
const moment = require("moment");
const osu = require("node-os-utils");
const os = require("os");
require("moment-duration-format");
const diagramMaker = require('../../functions/diagramMaker.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Devuelve el estado del bot.'),
    async run(client, interaction, language) {
        interaction.reply({
            content: 'Obteniendo estado <a:engranajes:890648263588454411>',
            ephemeral: false
        })
        const totalGuilds = client.guilds.cache.size
        const totalMembers = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

        var mem = osu.mem;
        let freeRAM;
        let usedRAM;

        mem.info()
            .then(info => {
                freeRAM = info["freeMemMb"]
                usedRAM = info["totalMemMb"] - freeRAM
            })

        let cpuUsage;
        var cpu = osu.cpu;

        const p1 = cpu.usage().then((cpuPercentage) => {
            cpuUsage = cpuPercentage;
        });
        await Promise.all([p1]);

        const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setAuthor(`Estado de ${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 4096,
            }))
            .addField('<:desktopcomputersamsung:890643875012694016> Rendimiento', "```" + `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round((100 * usedRAM) / (usedRAM + freeRAM))}%]\nCPU: ${diagramMaker(cpuUsage, 100 - cpuUsage)} [${Math.round(cpuUsage)}%]` + "```", false)
            .addField('<:864126690342207499:890648387886645269> Sistema', "```" + `Procesador\nIntel ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB` + "```", false)
            .addField('<:864107735255220235:890648362590797904> Sistema Operativo', "```" + `${os.type} ${os.release} ${os.arch}` + "```", false)
            .addField('<:863983092658208790:890648228926734366> Total de usuarios', "```" + `${totalMembers}` + "```")
            .addField('Total de emotes', "```" + `${client.emojis.cache.size}` + "```", true)
            .addField('<:864107765050638367:890648339182420008> Total de servidores', "```" + `${totalGuilds}` + "```", true)
            .addField('<:greencircule:890646769413783673> Tiempo de actividad del bot', "```" + `${moment.duration(client.uptime).format(`D [Dias], H [Horas], m [Minutos], s [Segundos]`)}` + "```", true)
            .addField('<:greencircule:890646769413783673> Tiempo de actividad del host', "```" + `${moment.duration(os.uptime * 1000).format(`D [Dias], H [Horas], m [Minutos], s [Segundos]`)}` + "```", true)
            .setImage('https://cdn.discordapp.com/attachments/882684143903866941/904468745731342356/standard.gif')
            .addField('<a:engranajes:890648263588454411> Último inicio', "```" + `${moment(client.readyAt).format("MMMM DD, YYYY HH:mm a")}` + "```", true)
            .setColor("D2691E");

        interaction.editReply({
            content: ' ',
            embeds: [embed],
            ephemeral: true
        });
    }
}