import startWindow, { openWindow } from './startWindow';
import autoUpdate from './autoUpdate';
import server from '../server/server';
import iconHelper from '../iconHelper';
import schedule from '../schedule';
import scheduleChecker from '../scheduleChecker';

export default function run() {
  autoUpdate();
  server();
  iconHelper.start(startWindow);
  schedule.start(startWindow);
  scheduleChecker.start(startWindow);
  openWindow();
}
