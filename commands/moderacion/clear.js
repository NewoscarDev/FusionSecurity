const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Elimina hasta 99 mensajes')
		.addIntegerOption(option => option.setName('amount').setDescription('Número de mensajes para eliminar')),
	async run(client, interaction) {
		if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply("No tengo suficientes permisos")
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes los suficientes permisos para utilizar este comando.\nNecesitas permisos de administrador.")
		const amount = interaction.options.getInteger('amount');

		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: 'Debes ingresar un número entre 1 y 99', ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'Se produjo un error al intentar eliminar los mensajes en este canal', ephemeral: true });
		});

		return interaction.reply({ content: `Mensajes eliminados con exito \`${amount}\` mensajes`, ephemeral: true });
	},
};