const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help') 
        .setDescription('Muestra ayuda'),
    async run(client, interaction) {
        const row = new MessageActionRow()
        .addComponents(

            new MessageSelectMenu()

            .setCustomId('comandos')
            .setPlaceholder('Categorias')
            .addOptions([{
                    label: '🛑 Moderacion',
                    description: 'Comandos de moderacion.',
                    value: 'moderacion',
                },
                {
                    label: '📋 Informacion',
                    description: 'Comandos de informacion.',
                    value: 'informacion',
                },
                {
                    label: '🔒 Owner',
                    description: 'En desarrollo',
                    value: 'owner',
                },
                {
                    label: '🎮 Diversion',
                    description: 'Comandos de diversion',
                    value: 'diversion',
                }
            ])
        )
       
            const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096, }))
            .setTitle('Ayuda')
            .setColor('BLUE')
            .setDescription(
               "Si quieres ver que comandos tiene el bot dale al menu de interaccion de abajo y veras las categorias."
                )
            .addField('Enlaces:', '[Pagina oficial del bot](https://fusionsecuritybot.jimdofree.com/)\n [Servidor de discord oficial](https://discord.gg/gyfDA3BA6f.)\n<:dev:910964519239565313> Developer: NewoscarYT#8819\n💻 Ayudante: byavt.#0001 ')
            .setFooter('©FusionSecurity help')
            .setImage('https://cdn.discordapp.com/attachments/882684143903866941/904468745731342356/standard.gif')
            await interaction.reply({ephemeral: false, embeds: [embed], components: [row] });
    
    }
}