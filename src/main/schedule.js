const fs = require('fs');
const appConfig = require('../../package');

const filePath = '\\\\ntnet\\filestore1\\Competency_Center_Root\\CMCC\\RtB\\b_schedule.txt';

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
  86400000,
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

    const { mainWindow } = require('../../main');

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

function processLine(line) {
  const fields = line.split('|');
  const schedule = new Schedule(fields[0], fields[1], fields[2], fields[3], fields[4]);
  return schedule;
}

let schedules = [];

function getSchedules() {
  if (output === undefined) {
    return undefined;
  }
  const lines = output.split('\r\n');
  const newSchedules = [];
  lines.forEach((line) => {
    const schedule = processLine(line);
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

module.exports = getSchedules;
