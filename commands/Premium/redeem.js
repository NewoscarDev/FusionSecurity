const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Premium = require('../../models/premium');
const Guild = require('../../models/guild');
const moment = require("moment");
let uniqid = require('uniqid');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("redeem")
    .setDescription("Reclama tu codigo premium!")
  .addStringOption(option =>
      option.setName("code")
          .setDescription("El codigo")
          .setRequired(true)
  ),
  userPermissions: ['ADMINISTRATOR'],
    run: async (client, interaction, message) => {

        const code = interaction.options.getString('code')
    
        const guildDB = await Guild.findOne({
            guildId: interaction.guildId
        });

        if(guildDB.isPremium === "true") {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`El servidor ya es premium!`)
                    .setColor('RED')
                ], ephemeral: true
            })
        }
        const premium = await Premium.findOne({
            code: code
        })
        
        if(premium) {
            const expires = moment(Number(premium.expiresAt)).format("dddd, MMMM Do YYYY HH:mm:ss")
            
             guildDB.isPremium = "true";
             guildDB.premium.redeemedBy.id = interaction.member.id;
             guildDB.premium.redeemedBy.tag = interaction.member.tag;
             guildDB.premium.redeemedAt = Date.now()
             guildDB.premium.expiresAt = premium.expiresAt;
             guildDB.premium.plan = premium.plan;
     
             await guildDB.save().catch(()=>{});
     
             await premium.deleteOne().catch(()=>{});
            
             let ID = uniqid(undefined, `-${code}`);
             const date = require('date-and-time');
             const now = new Date();
             let DDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            
                try {
                 await interaction.member.send({
                     embeds: [
                         new MessageEmbed()
                        .setDescription(`**Premium Subscription**\n\nYou've recently redeemed a code in **${interaction.guild.name}** and here is your receipt:\n\n **Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**Guild Name:** ${interaction.guild.name}\n**Guild ID:** ${interaction.guild.id}`)
                         .setColor(interaction.guild.me.displayHexColor)
                         .setFooter(`${interaction.member}`)
     
                     ]
                 })
             } catch(err){
                 return console.log(err)
             }
            interaction.reply({embeds:[new MessageEmbed().setDescription(`**Felicidades!**\n\n**${interaction.guild.name}** es ahora un servidor premium, la factura ha sido enviada a tus mensajes directos!\n\n**Expira en:** **${expires}**`).setColor('GREEN')]})
        } else {
            return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`Ese codigo no es valido`)]})
        }

    }
}