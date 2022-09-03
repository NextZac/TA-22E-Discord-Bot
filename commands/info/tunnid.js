const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { getTimeTable } = require('../../timetable.js')
var moment = require('moment');
const { now } = require('moment');

module.exports = {
	name: 'tunnid',
	description: "Saab tunnid",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		const msg = await message.reply('Fetching timetable...')
        //YEAR-MONTH-DAYT00:00:00Z
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
        const lessonembed = new EmbedBuilder()
            .setTitle('TA-22E tunnid - ' + moment().format('ddd Do MMM YYYY'))
            .setColor(0x2c65d7)

        for(i in todaylessons) {
            lessonembed.addFields({name: todaylessons[i]['nameEt'], value: todaylessons[i]['timeStart'] +"-"+todaylessons[i]['timeEnd'] + " - " + todaylessons[i]['rooms'][0]['roomCode'], inline:false})
        }
        if(todaylessons.length === 0) {
            lessonembed.setDescription("Täna ei toimu tunde.")
        }
        await msg.delete()
        await message.reply({embeds: [lessonembed]})
	}
};