const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Allows the admin or owner to ban the member.")
    .addUserOption((option) => option.setName('user').setDescription('The person who you want to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to ban member').setRequired(true)),
    userPermissions: ['BAN_MEMBERS'],
    run: async (client, interaction, message) => {

       if (!interaction.member.permissions.has("BAN_MEMBERS")){ 
        const embed = new MessageEmbed() 
        return interaction.reply({ content: "No tienes suficientes permisos para usar este comando.", ephemeral: true })
      }

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if (!member){ 
          const embed = new MessageEmbed()
          return interaction.reply("😅 | No se pueden obtener detalles relacionados con un miembro determinado.")
        }

        const reason = interaction.options.getString('reason')

        if (!member.bannable || member.user.id === client.user.id){
         const embed = new MessageEmbed() 
        return interaction.reply("😅 | No puedo prohibir a este miembro")}
        
        if (interaction.member.roles.highest.position <= member.roles.highest.position){ 
        return interaction.reply('Un miembro dado tiene un rango superior o igual al suyo, por lo que no puedo prohibirlo.')
      }else{
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** is banned from the server for \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Ban Member")
        .setTimestamp()

        await member.user.send(`Estás prohibido **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        member.ban({ reason })

        return interaction.reply({ embeds: [ embed ]})
      }
    },
  }