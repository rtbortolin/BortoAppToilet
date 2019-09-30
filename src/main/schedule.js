import fs from 'fs';
import path from 'path';
import { ipcMain } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import appConfig from '../../package.json';
import CONSTS from '../common/constants';
import scheduleHelper from '../common/scheduleHelper';

const { logger } = global;

let main;
let filePath = path.join(__static, '/schedule.json'); // eslint-disable-line no-undef
const localFilePath = path.join(__static, '/schedule.json'); // eslint-disable-line no-undef
if (CONSTS.isDevEnv()) {
  filePath = localFilePath;
}

function read(file, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      logger.error('error loading schedules file.', err);
      logger.info('Opening local schedules...');
      read(localFilePath, callback);
    }
    callback(data);
  });
}

let output;
read(filePath, (data) => {
  output = data;
  logger.info('File updated.');
});

function readInterval() {
  read(filePath, (data) => {
    output = data;
    logger.info('File updated.');
  });
}

function getCurrentTime() {
  return scheduleHelper.getCurrentTime();
}

setInterval(readInterval, CONSTS.reloadFileTimeout);

const Schedule = class Schedule {
  constructor(id, gender, floor, startTime, endTime) {
    this.id = id;
    this.gender = gender;
    this.floor = floor;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isNotificationShowed = false;
    this.main = main;
    this.mainWindow = null;
    this.getMainWindow();
  }

  getMainWindow() {
    const self = this;
    this.main.getMainWindow()
      .then((window) => {
        self.mainWindow = window;
      })
      .catch((error) => {
        logger.warn(`Error on getMainWindow on schedule obj: ${error}`);
      });
  }

  isCleaningNow() {
    const currentTime = getCurrentTime();

    const scheduleStartTime = parseInt(this.startTime, 0);
    const scheduleEndTime = parseInt(this.endTime, 0);

    return currentTime >= scheduleStartTime && currentTime <= scheduleEndTime;
  }

  showNotification() {
    if (this.isNotificationShowed) {
      return;
    }

    if (this.mainWindow == null) {
      logger.info('skiping showNotification due mainWindow null');
      return;
    }

    this.mainWindow.tray.displayBalloon({
      title: appConfig.appName,
      content: this.getNotificationMessage(),
    });

    this.isNotificationShowed = true;
  }

  getNotificationMessage() {
    const toiletGender = this.gender === 'M' ? 'Men\'s' : 'Ladies\'';
    return `${toiletGender} toilet on ${this.floor} floor is being cleaned.`;
  }

  hideNotification() {
    this.isNotificationShowed = false;
  }
};

function createSchedule(scheduleObj) {
  const schedule = new Schedule(
    scheduleObj.id,
    scheduleObj.gender,
    scheduleObj.floor,
    scheduleObj.startTime,
    scheduleObj.endTime,
  );
  return schedule;
}

let schedules = [];

function sendSchedulesToRenderer() {
  const mainWindowPromisse = main.getMainWindow();
  mainWindowPromisse.then((window) => {
    const internalSchedules = schedules;
    logger.info('schedules sending on main');
    window.webContents.send('on-schedule-update', internalSchedules);
  });
}

function getSchedules() {
  if (output === undefined) {
    return undefined;
  }

  const schedulesObj = JSON.parse(output).schedules;
  const newSchedules = [];
  schedulesObj.forEach((scheduleObj) => {
    const schedule = createSchedule(scheduleObj);
    const shouldContinue = scheduleHelper.checkFilter(schedule);

    if (shouldContinue) {
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
    }
  });
  schedules = newSchedules;
  sendSchedulesToRenderer();
  return schedules;
}

function bindGetSchedules() {
  ipcMain.on('get-schedules', (event, arg) => {
    logger.info('get-schedules async message received', arg);
    event.reply('get-schedules-reply', getSchedules());
  });
}

function start(mainModule) {
  main = mainModule;
  bindGetSchedules();
}

export default {
  getCurrentTime,
  getSchedules,
  start,
};
