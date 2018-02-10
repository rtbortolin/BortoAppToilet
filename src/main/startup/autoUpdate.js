import updater from 'electron-simple-updater';
import os from 'os';
import appConfig from '../../../package.json';
import CONSTs from '../constants';

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
  global.logger.info('end checking updates');
}

function run() {
  global.logger.info('checking update');
  updater.init({ url: `http://${CONSTs.host}:${CONSTs.serverPort}/updates/updates.json?v=${appConfig.version}&h=${os.hostname()}`, logger: global.logger });
  global.logger.info('update completed.');
  setInterval(checkUpdates, CONSTs.checkForUpdatesFrequency);
}

export default run;
