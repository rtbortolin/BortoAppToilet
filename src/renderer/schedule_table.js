const electron = require('electron'); // eslint-disable-line import/no-extraneous-dependencies

const { remote } = electron;
const main = remote.require('./main');
const { scheduleModule } = main.default.scheduleModule;
const { CONSTs } = main.default.CONSTs;
const logger = remote.getGlobal('logger');

let table = null;
const sch = scheduleModule;

function populateTable(schedules) {
  schedules.sort((a, b) => a.startTime - b.startTime);
  const currentTime = sch.getCurrentTime();
  let nextScheduleM = null;
  let nextScheduleF = null;
  schedules.forEach((schedule) => {
    const row = table.insertRow(-1);

    if (schedule.startTime > currentTime) {
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

function updateTable() {
  const schedules = sch.getSchedules();
  logger.debug(schedules);
  if (schedules === undefined) {
    setTimeout(updateTable, 1000);
  } else {
    const newTable = document.createElement('tbody');
    table.parentNode.replaceChild(newTable, table);
    table = newTable;
    populateTable(schedules);
    setTimeout(updateTable, CONSTs.runScheduleCheckerTimeout);
  }
}

export default function startRender(document) {
  table = document.getElementById('schedules').getElementsByTagName('tbody')[0]; // eslint-disable-line
  setTimeout(updateTable, 2000);
}
