const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule')
const client = require('..');
const chalk = require('chalk')

schedule.scheduleJob("00 07 * * *", async function() {
    const today = new Date();
    const data = await (await axios.get(`https://tahvel.edu.ee/hois_back/timetableevents/timetableByGroup/14?from=${today.toISOString()}&studentGroups=6934&thru=${today.toISOString()}`)).data;
    for(i in data['timetableEvents']) {
        const [date, min, hour] = [new Date(data['timetableEvents'][i]['date']), Number(data['timetableEvents'][i]['timeStart'].split(":")[1]), Number(data['timetableEvents'][i]['timeStart'].split(":")[0])];
        const channel = client.channels.cache.get('1015307760470073374');
        date.setMinutes(min - 5);
        date.setHours(hour);
        schedule.scheduleJob(date, async function() {
            date.setMinutes(min)
            const embed = new EmbedBuilder()
                .setTitle(`Tund ${data[i]['nameEt'].toString()}`)
                .setDescription(`Tund algab <t:${Math.floor(date.floor(date.getTime() / 1000))}>!\nKlass:${data['timetableEvents'][i]['rooms'][0]['roomCode']}\n<@1016731276989972511>`)
            await channel.send({embeds: [embed]});
            console.log(chalk.yellow(`[Reminder] `) + `${channel.name}`)
      });
    }
})