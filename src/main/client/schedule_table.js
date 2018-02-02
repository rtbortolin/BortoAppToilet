var sch = require('./src/main/schedule')

var table = document.getElementById("schedules").getElementsByTagName('tbody')[0];

var output = sch.output

function populateTable(schedules) {
  schedules.sort(function (a, b) {
    return a.startTime - b.startTime
  })
  schedules.forEach(schedule => {
    row = table.insertRow(-1)

    row.insertCell(0).innerHTML = schedule.gender
    row.insertCell(1).innerHTML = schedule.floor
    row.insertCell(2).innerHTML = schedule.startTime
    row.insertCell(3).innerHTML = schedule.endTime
  });
}

function updateTable() {
  var schedules = sch.getSchedules();
  console.log(output);
  if (schedules == undefined) {
    setTimeout(updateTable, 1000);
  }
  else {
    var new_table = document.createElement('tbody');
    table.parentNode.replaceChild(new_table, table);
    table = new_table
    populateTable(schedules);
    setTimeout(updateTable, 30000);
  }
}

updateTable();
