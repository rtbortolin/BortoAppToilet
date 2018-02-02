const updater = require('electron-simple-updater');
const appConfig = require('../../../package');
const os = require('os');
const CONSTs = require('../constants');

updater.on('update-downloaded', () => {
  global.logger.info('downloaded.');
  updater.quitAndInstall();
});

function checkUpdates() {
  global.logger.info('checking updates');
  try {
    updater.checkForUpdates();
  } catch (err) {
    global.logger.error(err);
  }
  global.console.info('end checking updates');
}

global.logger.info('checking update');
updater.init({ url: `http://${CONSTs.host}:${CONSTs.serverPort}/updates/updates.json?v=${appConfig.version}&h=${os.hostname()}`, logger: global.logger });
global.logger.info('update completed.');

setInterval(checkUpdates, CONSTs.checkForUpdatesFrequency);
