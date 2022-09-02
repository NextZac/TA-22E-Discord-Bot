const axios = require('axios');
//from & thru format = YEAR-MONTH-DAYT00:00:00Z
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
    /*counts = {};
    tunninimed.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    console.log(counts)*/
    return tund
}

module.exports.getTimeTable = getTimeTable()