const axios = require('axios');
//sitt kuradi tunniplaani API
async function getMenu() {
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

module.exports.getMenu = getTimeTable;