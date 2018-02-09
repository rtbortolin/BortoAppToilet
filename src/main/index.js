import './startup/configlog';
import setupEvents from './startup/setupEvents';
import startup from './startup/startup';
import CONSTs from './constants';

function startApp() {
  startup();
}

const mainModule = {};
export default mainModule;

if (!setupEvents.handleSquirrelEvent()) {
  if (CONSTs.isDevEnv()) {
    setTimeout(startApp, 2000);
  } else {
    startApp();
  }
  global.logger.info('startup');
  // mainModule.scheduleModule = require('./schedule');
  mainModule.CONSTs = CONSTs;
} else {
  global.logger.info('exiting squirrel event');
  // return; // eslint-disable-line
}
