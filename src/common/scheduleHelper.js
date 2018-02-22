import pad from 'pad-left';
import configHelper from './configHelper';

function getCurrentTime() {
  const currentDate = new Date();
  return parseInt(pad(currentDate.getHours().toString(), 2, '0') + pad(currentDate.getMinutes().toString(), 2, '0'), 0);
}

function checkFilter(schedule) {
  if (!configHelper.getShowMale() && schedule.gender === 'M') {
    return false;
  }
  if (!configHelper.getShowFemale() && schedule.gender === 'F') {
    return false;
  }
  return true;
}

export default {
  getCurrentTime,
  checkFilter,
};
