const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		const pingEmbed = new EmbedBuilder()
			.setDescription(`🏓 Pong! Latency: **${Math.round(client.ws.ping)} ms**`)
			.setTimestamp()
			.setColor(0x2c65d7)

		interaction.reply({ embeds:[pingEmbed] })
	}
};