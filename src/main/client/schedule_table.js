const electron = require('electron'); // eslint-disable-line import/no-extraneous-dependencies

const { remote } = electron;
const sch = remote.require('./src/main/schedule');
const CONSTs = remote.require('./src/main/constants');
const logger = remote.getGlobal('logger');
// const sch = require('./src/main/schedule'); // eslint-disable-line
// const CONSTs = require('./src/main/constants');

let table = document.getElementById('schedules').getElementsByTagName('tbody')[0];

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

updateTable();
