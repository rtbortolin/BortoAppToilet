import { app } from 'electron'; // eslint-disable-line
import updater from 'electron-simple-updater';
import os from 'os';
import appConfig from '../../../package.json';
import CONSTs from '../../common/constants';


function exitApp() {
  app.isQuiting = true;
  app.quit();
}

updater.on('update-downloaded', () => {
  global.logger.info('downloaded.');
  app.isQuiting = true;
  updater.quitAndInstall();
  setTimeout(exitApp, 5000);
});

function checkUpdates() {
  global.logger.info('checking updates');
  try {
    updater.checkForUpdates();
  } catch (err) {
    global.logger.error('Error checking for updates', err);
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
