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
  moment.locale('es');

moment.updateLocale('es')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Devuelve la informacion del usuario')
        .addUserOption(option => 
            option.setName("member")
                .setDescription("usuario bla bla")
                .setRequired(true),
        ),
    async run(client, interaction, args) {
        var member = interaction.options.getMember("member");
        const roles = member.roles.cache    
        .sort((a, b) => b.position - a.position)
        .map((roles) => roles.toString())
        .slice(0, -1)

        let displayRoles;

        if(roles.length < 30){
            displayRoles = roles.join(" ")
        }else{
            displayRoles = "El miembro tiene demasiados roles"
        }

        const info =new Discord.MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png"}))
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, format: 'png'}))
        .addField("ID", `${member.user.id}`)
        .addField("Apodo", `${member.nickname || "Ninguno"}`)
        .addField("Creo su cuenta", `${moment.utc(member.user.createdAt).format('d[ de] MMMM[ del] YYYY')} (${moment.utc(member.user.createdAt).fromNow()})`)
        .addField("Fecha de ingreso al servidor", `${moment.utc(member.joinedAt).format('d[ de] MMMM[ del] YYYY')} (${moment.utc(member.createdAt).fromNow()})`)
        .addField(`Roles (${roles.length})`, `${displayRoles}`)

        interaction.reply({ embeds: [info]})
        
           
            }
    };
