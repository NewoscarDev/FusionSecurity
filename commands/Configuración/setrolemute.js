const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const Schema = require('../../models/mute')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmuterole')
        .setDescription('Establece un rol para los muteados')
        .addRoleOption(option => 
            option.setName('rol')
            .setDescription('El rol')
            .setRequired(true)
            ),
    async run(client, interaction) {

        const language = interaction.member.guild.lang
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return;

        const role = interaction.options.getRole('rol')

        const servidor = await Schema.findOne({ guildId: interaction.guildId })

        const guardar = new Schema({
            guildId: interaction.guildId,
            rolId: role.id
        });
        try{
        servidor ? Schema.updateOne({guildId: interaction.guildId }, {rolId: role.id}) : guardar.save().catch(err => {
            interaction.reply("Parece que hubo un error!"+err)
        })
        } catch (error){
            console.log(error)
        }
        const embedSucces = new MessageEmbed()
        .setColor('WHITE')
        .setDescription('El rol mute ha sido guardado correctamente!')
        .addField('Rol:', role.name)
        .setFooter('Accion completada correctamente!', client.user.displayAvatarURL())


        interaction.reply({embeds: [embedSucces], ephemeral: true})
    }
}
