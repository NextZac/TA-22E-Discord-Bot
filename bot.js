const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const fs = require("fs");
require('dotenv').config()
require('./timetable.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
    console.log("Bot ready")
})

client.commands = new Collection();

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}

module.exports = client;
require('./events/message.js')
client.login(process.env.TOKEN)