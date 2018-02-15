import electron from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import scheduleHelper from '../common/scheduleHelper';

const { remote, ipcRenderer } = electron;

const logger = remote.getGlobal('logger');

let table = null;

function populateTable(schedules) {
  schedules.sort((a, b) => a.startTime - b.startTime);
  const currentTime = scheduleHelper.getCurrentTime();
  let nextScheduleM = null;
  let nextScheduleF = null;
  schedules.forEach((schedule) => {
    const row = table.insertRow(-1);

    if (schedule.endTime > currentTime) {
      if (nextScheduleM == null && schedule.gender === 'M') {
        nextScheduleM = schedule;
        row.className = 'nextScheduleM';
      }

      if (nextScheduleF == null && schedule.gender === 'F') {
        nextScheduleF = schedule;
        row.className = 'nextScheduleF';
      }
    }

    row.insertCell(0).innerHTML = schedule.gender;
    row.insertCell(1).innerHTML = schedule.floor;
    row.insertCell(2).innerHTML = schedule.startTime;
    row.insertCell(3).innerHTML = schedule.endTime;
  });
}

function updateTable(schedules) {
  logger.debug(schedules);
  if (schedules !== undefined) {
    const newTable = document.createElement('tbody');
    table.parentNode.replaceChild(newTable, table);
    table = newTable;
    populateTable(schedules);
  }
}

ipcRenderer.on('on-schedule-update', (event, message) => {
  logger.info('schedules received on renderer');
  updateTable(message);
});

export default function startRender(document) {
  table = document.getElementById('schedules').getElementsByTagName('tbody')[0]; // eslint-disable-line
}
