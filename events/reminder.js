const axios = require('axios');
const schedule = require('node-schedule')
const client = require('..');

module.exports.lessonCheck = schedule.scheduleJob("00 07 * * *", async function() {
    const today = new Date();
    const data = await (await axios.get(`https://tahvel.edu.ee/hois_back/timetableevents/timetableByGroup/14?from=${today.toISOString()}&studentGroups=6932&thru=${today.toISOString()}`)).data;
    for(i in data) {
        const [min, hour] = [Number(data[i]['timeStart'].split(":")[1]), Number(data[i]['timeStart'].split(":")[0])];
        schedule.scheduleJob(`${min - 5} ${hour} * * *`, async function() {
            client.channels.cache.get('1016342648279289907').send(`Tund: ${data[i]['nameEt']} hakkab 5 minuti pärast!\nKlassis: ${data[i]['rooms'][0]['buildingCode']}-${data[i]['rooms'][0]['roomCode']}\n<@1016731276989972511>`);
      });
      schedule.scheduleJob(`${min} ${hour} * * *`, async function() {
            client.channels.cache.get('1016342648279289907').send(`Tund: ${timetableEvent.nameEt} hakkas!\nKlassis: ${data[i]['rooms'][0]['buildingCode']}-${data[i]['rooms'][0]['roomCode']}\n<@1016731276989972511>`);
      });

    }
})