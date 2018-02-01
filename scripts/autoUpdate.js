const updater = require('electron-simple-updater');

updater.on('update-downloaded', () => {
  global.logger.info('downloaded.');
  updater.quitAndInstall();
});

updater.on('checking-for-update', () => {
  global.logger.info('checking update');
});

function checkUpdates() {
  global.logger.info('checking updates 1');
  try {
    updater.checkForUpdates();
  } catch (err) {
    global.logger.error(err);
  }
  global.console.info('fim updates 1');
}

global.logger.info('checking update');
updater.init({ url: 'http://localhost:3003/updates/updates.json', logger: global.logger });
global.logger.info('update completed.');

setInterval(checkUpdates, 30000);
