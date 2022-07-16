const guildModel = require('../models/guild.js')

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    const miembro = interaction.member.id

    if (!command) return

    const Guild = interaction.member.guild

    await guildModel.findOne({ guildId: interaction.guildId }).then((s, err) => {
        if (err) return console.log(err)
        if (s) {
            Guild.lang = s.lang
        } else {
            const newGuild = new guildModel({
                guildId: interaction.guildId.toString(),
                lang: 'es'
            })
            newGuild.save().catch(e => console.log(e))
        }
    })

    try {
        const language = interaction.member.guild.lang
        if(!interaction.guild.me.permissions.has(command.botPermissions || [])) return interaction.reply({ content: `<a:denied:893553169139900476> Necessito el permiso ${command.botPermissions || []} para ejecutar el comando!`, ephemeral: true})
        if(!interaction.member.permissions.has(command.userPermissions || [])) return interaction.reply({ content: `<a:denied:893553169139900476> Necessitas el permiso **${command.userPermissions || []}** para ejecutar el comando!`, ephemeral: true})
        if(command.ownerOnly){
            if(!client.config.owners.includes(miembro)){
                interaction.reply({ content: `<a:denied:893553169139900476> Ese comando es solo para dessarrolladores!`, ephemeral: true})
            }
        }
        if(command.premiumOnly){
            const data = await guildModel.findOne({ guildId: interaction.guildId })
            if(data.isPremium === "false") {
                interaction.reply({ content: `<a:denied:893553169139900476> Ese comando es solo para servidores premium!`, ephemeral: true})
                return;s
            }
        }
        await command.run(client, interaction, language)
    } catch (e) {
        console.error(e)
        return interaction.reply({ content: 'Ha surgido un error al ejecutar el comando.' })
    }
}