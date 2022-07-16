const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config.json')
const Schema = require('../../models/verificacion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setverify')
        .setDescription('Configura el sistema de verificacion!')
        .addRoleOption(option => 
            option.setName('role')
            .setDescription('El rol')
            .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('El canal')
            .setRequired(true)
        )
        .addStringOption(option => 
            option
            .setName('texto')
            .setDescription('texto que quieres que aparezca')
            .setRequired(true)
        ),

    async run(client, interaction) {

        const language = interaction.member.guild.lang  
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando.\nNecesitas permisos de administrador.")
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return;

        const role = interaction.options.getRole('role')

        const channel = interaction.options.getChannel('channel')

        Schema.findOne({ guildId: interaction.guildId }, async(err, data) => {
            if(err) throw err;

            if(data){
                data.guildId = interaction.guildId;
                data.roleId = role.id;
                data.channelId = channel.id
                data.save();
            } else {
                const hola = new Schema({
                    guildId: interaction.guildId,
                    roleId: role.id,
                    channelId: channel.id
                })
                await hola.save()
            }

        })

        const row = new MessageActionRow()
            .addComponents(
            new MessageButton()
            .setLabel('✅ Verificate')
            .setStyle('SUCCESS')
            .setCustomId('verify')
        )
        const texto = interaction.options.getString("texto")
        await channel.send({
            embeds: [
                new MessageEmbed()
                .setDescription(`${texto}`)
                .setFooter('©FusionSecurity verification.')
                .setTitle('Verificate')
                .setColor('GREEN')
            ],
            components: [row]
        })

        await interaction.reply({ embeds: [new MessageEmbed().setDescription(`El canal ha sido establezido a ${channel.name} correctamente y el rol a ${role.name} !`).setColor('WHITE')]})
    }
}
