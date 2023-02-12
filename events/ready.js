const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
	const activities = [
		{ name: `${client.users.cache.size} Pedekat`, type: ActivityType.Watching }
	];
	const status = [
		'online',
		'dnd',
		'idle'
	];
	client.user.setActivity(activities[0]);
	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
});
