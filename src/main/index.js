import './startup/configlog';
import setupEvents from './startup/setupEvents';
import startup from './startup/startup';
import CONSTs from '../common/constants';

function startApp() {
  startup();
}

if (!setupEvents.handleSquirrelEvent()) {
  if (CONSTs.isDevEnv()) {
    setTimeout(startApp, 2000);
  } else {
    startApp();
  }
  global.logger.info('startup');
} else {
  global.logger.info('exiting squirrel event');
  // return; // eslint-disable-line
}
