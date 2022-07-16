const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Premium = require('../../models/premium');
const moment = require('moment');
var voucher_codes = require('voucher-code-generator');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("generar-code")
    .setDescription("(Dev) Añade uno o mas codigos premium")
  .addStringOption(option =>
      option.setName("cantidad")
          .setDescription("La cantidad de codigos a generar")
          .setRequired(true)
  )
  .addStringOption(option =>
        option.setName("plan")
            .setDescription("El plan de premium")
            .setRequired(true)
            .addChoice('year', 'year')
            .addChoice('month', 'month')
  ),
  ownerOnly: true,
  
    run: async (client, interaction, message) => {

        const amount = interaction.options.getString('cantidad')

        const choice = interaction.options.getString('plan')

        let expiresAt;
        
            if(choice === 'year'){
                expiresAt = Date.now() + 2592000000;
            }
            if(choice === 'month'){
                expiresAt = Date.now() + (2592000000 * 12);
            }
                
        const array = []
        for (var i = 0; i <  amount; i++) {

            const codePremium = voucher_codes.generate({
            pattern: "####-####-####",
        });
        const code = codePremium.toString().toUpperCase();


        const find = await Premium.findOne({ 
        code: code 
        });

        if(!find){

        Premium.create({
            code: code,
            expiresAt: expiresAt,
            plan: choice
        });

            array.push(`\`${i + 1}-\` ${code}`)
        }
        }
        interaction.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Generados ${array.length} Premium Code(s)**\n\n${array.join("\n")}\n\n**Type:** ${choice}\n**Expires:** ${moment(expiresAt).format("dddd, MMMM Do YYYY")}`)        
        ],
            ephemeral: true
        })
    }


}

