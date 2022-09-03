const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require('discord.js');
const { getTimeTable } = require('../../timetable.js')
var moment = require('moment');
const { now } = require('moment');
const { ApplicationCommandType } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { CanvasTable, CTConfig } = require("canvas-table");

module.exports = {
	name: 'canvas',
	description: "Saab tunnid pildina",
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
        s = moment().startOf('isoWeek').format('yyyy-MM-DDT00:00:00') + "Z".toString()
        e = moment().endOf('isoWeek').format('yyyy-MM-DDT00:00:00') + "Z".toString()
        if(interaction.options.get('paev') !== null && interaction.options.get('paev').value !== '') {
            n = moment().day(interaction.options.get('paev').value).format('yyyy-MM-DDT00:00:00') + "Z".toString()
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
        /*const lessonembed = new EmbedBuilder()
            .setTitle('TA-22E tunnid - ' + moment(n).format('ddd Do MMM YYYY'))
            .setColor(0x2c65d7)
            */

        todaylessons.sort(function(a,b){
            let x = a['timeStart']
            let y = b['timeStart']
            if(x < y){return -1}
            if(x>y){return 1}
            return 0;
        })
        const canvas = Canvas.createCanvas(1080, 2400);
        const ctx = canvas.getContext('2d');
        const tptlivelogo = await Canvas.loadImage('https://www.tptlive.ee/sites/tpt.edu.ee/files/tpt_logo.png')
        ctx.drawImage(tptlivelogo,0,0,456,296)
        const data = [];
        for(i in todaylessons) {
            data.push(todaylessons[i]['nameEt'], todaylessons[i]['timeStart'], todaylessons[i]['timeEnd'],  todaylessons[i]['rooms'][0]['roomCode'])
        }
        const columns = [
            {title: "Column 1"},
            {title: "Column 2", options: { textAlign: "center" }},
            {
                title: "Column 3",
                options: {
                    textAlign: "right",
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "serif",
                    color: "#444444",
                    lineHeight: 1
                }
            },{
                title: "Column 4",
                options: {
                    textAlign: "right",
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "serif",
                    color: "#444444",
                    lineHeight: 1
                }
            }
        ];
        const config = {
            data: data,
            columns: columns,
        }
        const ct = new CanvasTable(canvas,config);
        await ct.generateTable();
        const table = ct.renderToFile('table.png')
        ctx.drawImage(table, 0,0)
        const lessonembed = new AttachmentBuilder(await canvas.encode('png'), {name: 'timetable.png'})
        
        /*if(todaylessons.length === 0) {
            lessonembed.setDescription("Täna ei toimu tunde.")
        }*/
        await interaction.editReply({files: [lessonembed]})
	}
};