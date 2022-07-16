const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('createrol') //! El .setName siempre tiene que ser en minusculas 
        .setDescription('Crea un rol en el servidor con el nombre escrito en la opcion.')
        .addStringOption(option =>
            option
            .setName("rol")
            .setDescription("usuario bla bla")
            .setRequired(true),),
    async run(client, interaction) {
        if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply("No tengo suficientes permisos")
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                const name = interaction.options.getString('rol');
                const rColor = "RANDOM";

                let max = 20;

                if (name.length > max) return interaction.followUp('El maximo numero de caracteres para el rol son 20!');

                try {
                  await interaction.guild.roles.create({ name: name, permissions: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES], color: rColor });
                } catch (e) {
                   interaction.reply("Something Went Worng...")
                }

                const embed = new MessageEmbed()
                .setTitle('Rol Creado')
                .setColor('GREEN')
                .setDescription(`Se a creado correctamente el rol: ${name}`)
                .setFooter(`FusionSecurity - Role Create`)

                interaction.reply({ embeds: [embed] });


        } else {
            const noperms = new MessageEmbed()
            .setColor('RED')
            .setTitle('Error')
            .setDescription(`Tu no tienes permiso para ejecutar este comando \`MANAGE_ROLES\`!`)
            .setFooter('FusionSecurity - Error')
        interaction.reply({
            embeds: [noperms]
        });
        }
    
    }
}
}