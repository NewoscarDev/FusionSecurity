const { SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} =require ('discord.js')
const {MessageActionRow, MessageButton} = require ('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Crea un boton para habrir un tiket')
    .addStringOption(option => option
        .setName("texto")
        .setDescription("De que va este ticket?")
        .setRequired(true),
    )
    .addStringOption( option =>
        option.setName("boton")
            .setDescription("razon del aviso al usuario")
            .setRequired(true)
    ),
async run(client, interaction){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando")
    const Texto = interaction.options.getString('texto')
        const ticket = new MessageEmbed() 
            .setColor('BLUE')
            .setTitle(`FusionSecurity | Tickets`)
            .setDescription(`Para crear un Ticket presiona el botón de abajo\n${Texto}`)
            .setFooter('©FusionSecurity')
        const boton = interaction.options.getString("boton") 
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tickets')
                .setEmoji('<:gmail:916054030717952051>')
                .setStyle('PRIMARY')
                .setLabel(`${boton}`)
            )
        interaction.channel.send({
            embeds: [ticket],
            components: [row]
        })
        const a = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('FusionSecurity | Tickets')
            .setDescription('Tickets activados correctamente presione el boton de ticket para crear uno')
            .setFooter('©FusionSecurity ')
        interaction.reply({
            embeds: [a],
            ephemeral: true
        })
}
}

