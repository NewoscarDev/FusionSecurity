const Discord = require('discord.js');
const moderacion = require('../models/moderacion')

module.exports = async (client, member) => {

    const datos = await moderacion.findOne({ guildID: member.guild.id })
    if(!datos) return;

    if(datos.antibots === 'Activado'){
        if(member.user.bot){
            member.kick('Expulsado por el sistema de antibots')
        }
    }
    if(datos.antibots !== 'Activado') return;

}