const { app } = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const startWindow = require('./startWindow');

function run() {
  startWindow(app);
}

module.exports = run;
