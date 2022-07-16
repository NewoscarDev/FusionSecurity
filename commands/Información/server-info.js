const {SlashCommandBuilder} = require('@discordjs/builders')
const config = require('../../config.json')
const Discord = require("discord.js");
const moment = require("moment");
moment.updateLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  }
  );

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Devuelve la informacion del servidor'),
    async run(client, interaction, language) {
        var very = {
            "LOW": "BAJO", "NONE": "Ninguno", "MEDIUM": "Medio" , "HIGH": "Alto", "VERY_HIGH": "Muy alto"
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`**Informacion del servidor ${interaction.guild.name}**`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true })) 
        .setColor("BLUE")
        .addField("Owner", `${await interaction.guild.fetchOwner()}`)
        .addField("Id del servidor", `${interaction.guild.id}`)
        .addField("🗓️ Se creo el dia", `${moment.utc(interaction.guild.createdAt).format("d[ de] MMMM[ de] YYYY")} (${moment.utc(interaction.guild.createdAt).fromNow()})`)
        .addField("Roles", `${interaction.guild.roles.cache.size}`)
        .addField("<:863983092658208790:890648228926734366> Miembros", `${interaction.guild.memberCount}`)
        .addField("Lvl de verificación", `${very[interaction.guild.verificationLevel]}`)

        interaction.reply({ embeds: [embed]})
        
           
            }
    }
