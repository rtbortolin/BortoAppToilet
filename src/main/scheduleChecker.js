const electron = require('electron');
const getSchedule = require('./schedule');
const iconHelper = require('./iconHelper');
const Notification = electron.Notification;


const app = electron.app;

app.on('ready', () => {
    processTime();
    setInterval(() => {
        processTime();
    }, 30000);
});

var isBathCleaning = false;

function processTime() {

    let schedules = getSchedule();
    if (schedules == undefined) {
        return;
    }

    let isAnyBathCleaning = false;

    schedules.forEach(schedule => {

        if (schedule.isCleaningNow()) {
            iconHelper.addScheduleHapening(schedule);
            iconHelper.changeIcon(true);
            schedule.showNotification();
            isAnyBathCleaning = true;
        } else {
            schedule.hideNotification();
            iconHelper.removeScheduleHapening(schedule);
        }       

    });

    isBathCleaning = isAnyBathCleaning;

    iconHelper.changeIcon(isBathCleaning);
}
