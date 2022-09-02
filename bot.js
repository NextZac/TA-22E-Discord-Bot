const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
import { getTimeTable } from './timetable.js';
require('dotenv').config()


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log("Bot ready")
})

module.exports = client;
require('./events/message.js')
client.login(process.env.TOKEN)