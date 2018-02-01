const fs = require('fs');
const appConfig = require('../../package');
const CONSTS = require('./constants');

let main;
let filePath = '\\\\ntnet\\filestore1\\Competency_Center_Root\\CMCC\\RtB\\t_schedule.json';
if (CONSTS.env === 'dev') {
  filePath = './src/main/resources/schedule.json';
}

function read(file, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

let output;
read(filePath, (data) => {
  output = data;
  console.log('File updated.');
});

setInterval(
  () => {
    read(filePath, (data) => {
      output = data;
      console.log('File updated.');
    });
  },
  CONSTS.reloadFileTimeout,
);

const Schedule = class Schedule {
  constructor(id, gender, floor, startTime, endTime) {
    this.id = id;
    this.gender = gender;
    this.floor = floor;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isNotificationShowed = false;
  }

  isCleaningNow() {
    const currentDate = new Date();
    const currentTime = parseInt(currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0'), 0);

    const scheduleStartTime = parseInt(this.startTime, 0);
    const scheduleEndTime = parseInt(this.endTime, 0);

    return currentTime >= scheduleStartTime && currentTime <= scheduleEndTime;
  }

  showNotification() {
    if (this.isNotificationShowed) {
      return;
    }

    const mainWindow = main.getMainWindow();
    mainWindow.tray.displayBalloon({
      title: appConfig.appName,
      content: this.getNotificationMessage(),
    });

    this.isNotificationShowed = true;
  }

  getNotificationMessage() {
    const toiletGender = this.gender === 'M' ? "Men's" : "Ladies'";
    return `${toiletGender} toilet on ${this.floor} floor is being cleaned.`;
  }

  hideNotification() {
    this.isNotificationShowed = false;
  }
};

function createSchedule(scheduleObj) {
  const schedule = new Schedule(scheduleObj.id, scheduleObj.gender, scheduleObj.floor, scheduleObj.startTime, scheduleObj.endTime);
  return schedule;
}

let schedules = [];

function getSchedules() {
  if (output === undefined) {
    return undefined;
  }
  const schedulesObj = JSON.parse(output).schedules;
  const newSchedules = [];
  schedulesObj.forEach((scheduleObj) => {
    const schedule = createSchedule(scheduleObj);
    const existingSchedule = schedules.find(sc => sc.id === schedule.id);
    if (existingSchedule === undefined) {
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

function start(mainModule) {
  main = mainModule;
}

module.exports = {
  getSchedules,
  start,
};
