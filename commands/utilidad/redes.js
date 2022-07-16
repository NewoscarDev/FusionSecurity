const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redes') //! El .setName siempre tiene que ser en minusculas 
        .setDescription('Muestra las redes sociales de los programadores'),
    async run(client, interaction) {
        const user = interaction.options.getUser('objetivo')
        
            const embed = new MessageEmbed()
            .setColor('AQUA')
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096, }))
            .setDescription(`**NewoscarYT**
               [Youtube](https://www.youtube.com/channel/UCTid5m-A1NMRP1-5olcRSCw) <:youtube:917015304540917760>
               [Twitch](https://www.twitch.tv/newoscaryt) <:twitch:917016917934505996>
               [Discord](http://discord.com/users/739421873816993835) <:discord:917015304280875008>
               [PayPal](https://paypal.me/NewoscarYT?country.x=ES&locale.x=es_ES) <:paypal:917016944224382976>
               **brandoncl**
               [Instagram](https://www.instagram.com/espaciocl) <:Instagram:917015304972935238>
               [Github](https://github.com/brandonivs) <:github:917015304083742792>
               [Discord](http://discord.com/users/400151053741326337) <:discord:917015304280875008>
               **Leah**
               [Instagram](https://www.instagram.com/prxko) <:Instagram:917015304972935238>
               [Discord](http://discord.com/users/716567567023603732) <:discord:917015304280875008>
               **byatvt**
               [Github](https://github.com/byavt) <:github:917015304083742792>`
            
                )
            await interaction.reply({ embeds: [embed] })
    
    }
} 