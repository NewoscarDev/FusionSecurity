const { SlashCommandBuilder } = require('@discordjs/builders');
const {Rank} = require("canvacord");
const { MessageEmbed, DiscordAPIError, MessageAttachment } = require('discord.js');
const levels = require("../../models/levelsSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Muestra progreso de nivel tuyo o de un usuario.')
        .addUserOption(option => option
            .setName("usuario")
            .setDescription("El usuario que quieres ver el progreso.")
        ),
    async run(client, interaction) {
        
        const member = interaction.options.getMember("usuario") || interaction.member;

        const data = levels.findOne({ guildId: interaction.guild.id, userId: member.user.id });
        if(!data) return interaction.reply({ content: "El usuario no tiene ningun progreso en este servidor", ephemeral: true })

        let dataGlobal = await levels.find({ guildId: interaction.guild.id }).sort([["xp", "descending"]]).exec();
        if(!dataGlobal) return interaction.reply({ content: "Nadie de este servidor tiene un progreso registrado", ephemeral: true })
        

        const rankCard = new Rank()
        .setAvatar(member.user.displayAvatarURL({ size: 2048, format: "png" }))
        .setCurrentXP(Number(data.xp))
        .setRequiredXP(Number(data.limit))
        .setLevel(Number(data.level))
        .setStatus(member.presence ? member.presence.status : "offline")
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setRank(dataGlobal.findIndex(dataUser => dataUser.userId === member.user.id) + 1);

        const buffer = await rankCard.build();

        const attachment = new MessageAttachment(buffer, "RankCard.png")

        interaction.reply({ files: [attachment] });

  }
}