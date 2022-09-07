const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require('discord.js');
const { getTimeTable } = require('../../timetable.js')
var moment = require('moment');
const { now } = require('moment');
const { ApplicationCommandType } = require('discord.js');
const { GlobalFonts, Canvas } = require('@napi-rs/canvas');

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
        await interaction.deferReply();
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
        todaylessons.sort(function(a,b){
            let x = a['timeStart']
            let y = b['timeStart']
            if(x < y){return -1}
            if(x>y){return 1}
            return 0;
        })

        const canvas = Canvas.createCanvas(1080, todaylessons.length*180 + todaylessons.length*10 + 100);
        const ctx = canvas.getContext('2d');
        
        
        starty = 70
        startx = 10
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0,0,1080,canvas.height)
        ctx.fillStyle = "#000000"
        GlobalFonts.registerFromPath('../../OpenSans-BoldItalic.ttf', 'OpenSans')
        ctx.font = "50px OpenSans";
        ctx.textAlign = "center";
        var text = moment().weekday(interaction.options.get('paev').value).format('dddd D MMM').toString();
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width/2, 30)
        ctx.textAlign = "start";
        ctx.font = "30px Arial";
        for(i in todaylessons) {
            if(todaylessons[i]['rooms'][0]['roomCode'].startsWith("A")){
                ctx.strokeStyle = '#0099FF'
            } else {
                ctx.strokeStyle = '#a60311'
            }
            ctx.strokeRect(startx, starty, 1050, 180)
            ctx.fillText(todaylessons[i]['nameEt'], startx+10, starty + 50)
            ctx.fillText(todaylessons[i]['timeStart'] + "-" + todaylessons[i]['timeEnd'], startx+10, starty + 100)
            ctx.fillText(todaylessons[i]['rooms'][0]['roomCode'], startx+10, starty + 150)
            ctx.fillText(todaylessons[i]['teachers'][0]['name'], 700, starty + 50)
            starty = starty+190
        }
        const pic = new AttachmentBuilder(await canvas.encode('png'), {name: 'timetable.png'})
        await interaction.editReply({files: [pic], fetchReply: true})
	}
};