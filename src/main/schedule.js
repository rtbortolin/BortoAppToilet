const fs = require('fs');
const electron = require('electron');
const appConfig = require('../../package')
const Notification = electron.Notification;

const filePath = "\\\\ntnet\\filestore1\\Competency_Center_Root\\CMCC\\RtB\\b_schedule.txt";
//const filePath = "./src/resources/schedule.txt";

function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

var output;
read(filePath, function (data) {
    output = data;
    console.log('File updated.');
});

setInterval(() => {
    read(filePath, function (data) {
        output = data;
        console.log('File updated.');
    });
},
    86400000
);

let schedules = [];

function getSchedules() {
    if (output == undefined) {
        return undefined;
    }
    let lines = output.split('\r\n');
    let newSchedules = [];
    lines.forEach(line => {
        let schedule = processLine(line);
        let existingSchedule = schedules.find(sc => sc.id == schedule.id);
        if (existingSchedule == undefined) {
            newSchedules.push(schedule);
        } else {
            existingSchedule.gender = schedule.gender;
            existingSchedule.floor = schedule.floor;
            existingSchedule.startTime = schedule.startTime;
            existingSchedule.endTime = schedule.endTime;
            newSchedules.push(existingSchedule);
        }
    });
    schedules = newSchedules;
    return schedules;
}

function processLine(line) {
    let fields = line.split('|');
    let schedule = new Schedule(fields[0], fields[1], fields[2], fields[3], fields[4]);
    return schedule;
}

var Schedule = class Schedule {
    constructor(id, gender, floor, startTime, endTime) {
        this.id = id;
        this.gender = gender;
        this.floor = floor;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isNotificationShowed = false;
    }

    isCleaningNow() {
        var currentDate = new Date();
        var currentTime = parseInt(currentDate.getHours().toString().padStart(2, "0") + currentDate.getMinutes().toString().padStart(2, "0"));

        let scheduleStartTime = parseInt(this.startTime);
        let scheduleEndTime = parseInt(this.endTime);

        return currentTime >= scheduleStartTime && currentTime <= scheduleEndTime;
    }

    showNotification() {
        if (this.isNotificationShowed)
            return;

        const { mainWindow } = require('../../main');

        mainWindow.tray.displayBalloon({
            title: appConfig.appName,
            content: this.getNotificationMessage()
        });

        this.isNotificationShowed = true;
    }

    getNotificationMessage() {
        let toiletGender = this.gender == 'M' ? "Men's" : "Ladies'";
        return `${toiletGender} toilet on ${this.floor} floor is being cleaned.`;
    }

    hideNotification() {
        this.isNotificationShowed = false;
    }
}

module.exports = getSchedules;