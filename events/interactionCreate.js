const executeCommand = require('../functions/executeCommand.js')
const executeSelectMenu = require('../functions/executeSelectMenu.js')
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const Schema = require('../models/verificacion')
const Premium = require('../models/premium');
const moment = require('moment');
var voucher_codes = require('voucher-code-generator');

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (interaction.isCommand()) executeCommand(client, interaction)
        if (interaction.isSelectMenu()) executeSelectMenu(client, interaction)
        if (interaction.isButton()) {
            /////////////////////
            // * VERIFICACION //
            if (interaction.customId === 'verify') {
                const data = await Schema.findOne({
                    guildId: interaction.guildId
                })
                const roleId = data.roleId
                const memberRoles = interaction.member.roles

                const hasRoles = interaction.member.roles.cache.has(roleId);

                if (hasRoles) {
                    interaction.reply({
                        content: `${interaction.member} tu ya estas verificado!`,
                        ephemeral: true
                    })
                } else {
                    memberRoles.add(roleId)
                    await interaction.reply({
                        content: `${interaction.member} has sido verificado correctamente!`,
                        ephemeral: true
                    })
                }
            }
            ///////////////
            //  Botones  //
            //////////////
            if (interaction.customId === 'year-x1') {


                const array = []
                for (var i = 0; i < 1; i++) {


                    const codePremium = voucher_codes.generate({
                        pattern: "####-####-####",
                    });
                    const code = codePremium.toString().toUpperCase();


                    const find = await Premium.findOne({
                        code: code
                    });

                    if (!find) {

                        Premium.create({
                            code: code,
                            expiresAt: Date.now() + 2592000000,
                        });

                        array.push(`\`${i + 1}-\` ${code}`)
                    }
                }
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`**Generados ${array.length} Premium Code(s)**\n\n${array.join("\n")}\n\n**Type:** Year\n**Expires:** Expira en un año.`)
                    ],
                    ephemeral: true
                })

            }
            //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------       

            if (interaction.customId === 'year-x10') {
                const array = []
                for (var i = 0; i < 10; i++) {


                    const codePremium = voucher_codes.generate({
                        pattern: "####-####-####",
                    });
                    const code = codePremium.toString().toUpperCase();


                    const find = await Premium.findOne({
                        code: code
                    });

                    if (!find) {

                        Premium.create({
                            code: code,
                            expiresAt: Date.now() + 2592000000,
                        });

                        array.push(`\`${i + 1}-\` ${code}`)
                    }
                }
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`**Generados ${array.length} Premium Code(s)**\n\n${array.join("\n")}\n\n**Type:** Year\n**Expires:** Expira en un año.`)
                    ],
                    ephemeral: true
                })

            }

            //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------       

            ///////////////  
            // *TICKETS //
            /////////////
            const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

            const categoria = interaction.guild.channels.cache.find(c => c.name === 'TICKETS')

            const canal = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)

            const channelexist = new MessageEmbed()
                .setTitle('Error')
                .setFooter('©FusionSecurity')
                .setColor('AQUA')
                .setDescription('Ya has creado un ticket en este discord.')

            if (interaction.customId === "tickets") {

                if (!categoria) {
                    await interaction.guild.channels.create('TICKETS', {
                        type: 4,
                    })
                }
                if (canal) {
                    return interaction.reply({
                        embeds: [channelexist],
                        ephemeral: true
                    })
                }
                await interaction.guild.channels.create(interaction.user.username, {
                    type: "GUILD_TEXT",
                    topic: interaction.user.id,
                    parent: categoria.id,
                    permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: everyone.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                }).then(c => {

                    const row = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setCustomId('cerrar')
                        .setLabel('Close')
                        .setEmoji('🔒')
                        .setStyle('DANGER')
                    )

                    const msj = new MessageEmbed()
                        .setTitle('FusionSecurity | Tickets')
                        .setFooter('©FusionSecurity')
                        .setColor('AQUA')
                        .setDescription('Cuentanos porque abriste este Ticket\n**Por favor espera pacientemente una respuesta**')
                    c.send({
                        embeds: [msj],
                        components: [row]
                    })
                })
                const embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setTitle('FusionSecurity | Tickets')
                    .setFooter('©FusionSecurity')
                    .setDescription(`${interaction.user.username}, tu ticket a sido creado correctamente`)
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            } else if (interaction.customId === 'cerrar') {
                const vvv = interaction.channel

                await vvv.delete()
            }

        }
    }

}