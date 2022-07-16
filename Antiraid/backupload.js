const backup = require('discord-backup')
backup.setStorageFolder(__dirname+"/backups/");

const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const moderacion = require('../../models/moderacion')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('backup') 
        .setDescription('Crea una copia de seguridad del servidor!')
        .addStringOption(option => option
            .setName('accion')
            .setDescription('Especifica si vas a activar o desactivar')
            .setRequired(true)),
        userPermissions: ['ADMINISTRATOR'],
    async run(client, interaction) {
 
        const SERVIDOR = interaction.guild

        const language = interaction.member.guild.lang

        const embed = new MessageEmbed().setColor('RED')

        await backup.create(SERVIDOR, {
            jsonBeautify: true
        }).then(backupData => {
            interaction.member.send({ 
                embeds: [
                    embed.setDescription(client.languages.__mf({ phrase: 'backup.author', locale: language }, { link: backupData.id }))
                ]
            })

            interaction.reply({ embeds: [
                Embed.setDescription(client.languages.__({ phrase: 'backup.created', locale: language })).setFooter(client.languages.__({ phrase: 'backup.todm', locale: language }))
            ]})
        })

    }
}