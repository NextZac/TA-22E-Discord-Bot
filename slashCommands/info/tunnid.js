const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { getTimeTable } = require('../../timetable.js')
var moment = require('moment');
const { now } = require('moment');
const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'tunnid',
	description: "Saab tunnid",
    type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'paev',
            description: "Päeva tunniplaan",
            type: 3,
            required: false,
            choices: [
                {name: 'Esmaspäev', value: '1'},
                {name: 'Teisipäev', value: '2'},
                {name: 'Kolmapäev', value: '3'},
                {name: 'Neljapäev', value: '4'},
                {name: 'Reede', value: '5'},
            ]
        }
    ],
	run: async (client,interaction) => {
        interaction.deferReply();
        //YEAR-MONTH-DAYT00:00:00Z
        s = moment().weekday(1).format('yyyy-MM-DDT00:00:00') + "Z".toString()
        e = moment().weekday(7).format('yyyy-MM-DDT00:00:00') + "Z".toString()
        if(interaction.options.get('paev') !== null && interaction.options.get('paev').value !== '') {
            n = moment().weekday(interaction.options.get('paev').value).format('yyyy-MM-DDT00:00:00') + "Z".toString()
        } else {
            n = moment().format('yyyy-MM-DDT00:00:00') + "Z".toString()
        }
        const lessons = await getTimeTable(s,e)
        
        const todaylessons = [];
        for (i in lessons) {
           if(lessons[i]['date'].toString() != n)
            {continue;}
            todaylessons.push(lessons[i])
        }

        if(todaylessons[0]['timeStart'] != "08:15") {
            firstlesson = {nameEt: "Tühi tund", timeStart:'08:15', timeEnd: '09:00', rooms:[
                {
                    "id": 69420,
                    "roomCode": "X420-69",
                    "buildingCode": "D"
                }
            ]}
            secondlesson = {nameEt: "Tühi tund", timeStart:'09:10', timeEnd: '09:55', rooms:[
                {
                    "id": 69420,
                    "roomCode": "X420-69",
                    "buildingCode": "D"
                }
            ]}
            todaylessons.push()
        }
        
        const lessonembed = new EmbedBuilder()
            .setTitle('TA-22E tunnid - ' + moment(n).format('ddd Do MMM YYYY'))
            .setColor(0x2c65d7)

        todaylessons.sort(function(a,b){
            let x = a['timeStart']
            let y = b['timeStart']
            if(x < y){return -1}
            if(x>y){return 1}
            return 0;
        })
        for(i in todaylessons) {
            lessonembed.addFields({name: todaylessons[i]['nameEt'], value: todaylessons[i]['timeStart'] +"-"+todaylessons[i]['timeEnd'] + " - " + todaylessons[i]['rooms'][0]['roomCode'], inline:false})
        }
        if(todaylessons.length === 0) {
            lessonembed.setDescription("Täna ei toimu tunde.")
        }
        await interaction.editReply({embeds: [lessonembed]})
	}
};