const { MessageEmbed } = require("discord.js")
module.exports = {
    data: {
        name: 'comandos'
    },
    async run(client, interaction, language) {
        switch (interaction.values[0]) {


            case 'moderacion':
                const embedmoderacion = new MessageEmbed();
                embedmoderacion.setColor('BLUE');
                embedmoderacion.setDescription(
                    client.languages.__mf({
                        phrase: 'moderacion.comandos',
                        locale: language
                    },
                    )
                );
                return interaction.update({
                    content: ' ',
                    components: [],
                    embeds: [embedmoderacion]
                });
                break

            case 'informacion':
                const embedinfo = new MessageEmbed();
                embedinfo.setColor('BLUE');
                embedinfo.setDescription(
                    client.languages.__mf({
                        phrase: 'informacion.comandos',
                        locale: language
                    },
                    )
                );
                return interaction.update({
                    content: ' ',
                    components: [],
                    embeds: [embedinfo]
                });
                break


            case 'diversion':
                const embedfun = new MessageEmbed();
                embedfun.setColor('BLUE');
                embedfun.setDescription(
                    client.languages.__mf({
                        phrase: 'diversion.comandos',
                        locale: language
                    },
                    )
                );
                return interaction.update({
                    content: ' ',
                    components: [],
                    embeds: [embedfun]
                });
                break


            case 'musica':
                const embeduwu = new MessageEmbed();
                embeduwu.setColor('BLUE');
                embeduwu.setDescription(
                    client.languages.__mf({
                        phrase: 'musica.comandos',
                        locale: language
                    },
                    )
                );
                return interaction.update({
                    content: ' ',
                    components: [],
                    embeds: [embeduwu]
                });
                break
        }
    }
}