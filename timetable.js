const axios = require('axios');
//sitt kuradi tunniplaani API
async function getTimeTable(from, thru) {
    resp = await axios.get('https://tahvel.edu.ee/hois_back/timetableevents/timetableByGroup/14?from=' + from + '&studentGroups=6934&thru=' + thru)
    tunninimed = [];
    for(i in resp['data']['timetableEvents']) {
        tunninimed.push(resp['data']['timetableEvents'][i]['nameEt']);
    }
    tund = [];
    for(i in resp['data']['timetableEvents']) {
        tund.push(resp['data']['timetableEvents'][i]);
    }
    return tund
}

async function getLessonsToday() {
    s = moment().startOf('isoWeek').format('yyyy-MM-DDT00:00:00') + "Z".toString()
    e = moment().endOf('isoWeek').format('yyyy-MM-DDT00:00:00') + "Z".toString()
    n = moment().format('yyyy-MM-DDT00:00:00') + "Z".toString()
    const lessons = await getTimeTable(s,e)
    const todaylessons = [];
    for (i in lessons) {
        if(lessons[i]['date'].toString() != n)
         {continue;}
         todaylessons.push(lessons[i])
     }
     return todaylessons;
}

async function getHomeWork() {
    resp = await axios.get('https://tahvel.edu.ee/hois_back/journals/studentJournalTasks?presentTasks=true&studentId=86598');
    tasks = JSON.parse(resp)['tasks'];

}

module.exports.getTimeTable = getTimeTable;