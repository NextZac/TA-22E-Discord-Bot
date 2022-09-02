const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log("Bot ready")
})

client.login(process.env.TOKEN)