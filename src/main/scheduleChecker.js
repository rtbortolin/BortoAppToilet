const getSchedule = require('./schedule');
const iconHelper = require('./iconHelper');
const CONSTS = require('./constants');

let isBathCleaning = false;
function processTime() {
  const schedules = getSchedule();
  if (schedules === undefined) {
    return;
  }

  let isAnyBathCleaning = false;

  schedules.forEach((schedule) => {
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

function start() {
  processTime();
  setInterval(() => {
    processTime();
  }, CONSTS.runScheduleCheckerTimeout);
}

module.exports = start;
