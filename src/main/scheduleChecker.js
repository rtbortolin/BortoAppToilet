import scheduleModule from './schedule';
import iconHelper from './iconHelper';
import CONSTS from './constants';

let isBathCleaning = false;
function processTime() {
  const schedules = scheduleModule.getSchedules();
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
  setTimeout(() => processTime(), 5000);
  setInterval(() => {
    processTime();
  }, CONSTS.runScheduleCheckerTimeout);
}

export default { start };
