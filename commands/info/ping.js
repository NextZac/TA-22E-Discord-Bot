const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		const pingEmbed = new EmbedBuilder()
			.setDescription(`🏓 Pong! Latency: **${Math.round(client.ws.ping)} ms**`)
			.setTimestamp()
			.setColor(0x2c65d7)
			
		await message.reply({embeds:[pingEmbed]})
	}
};