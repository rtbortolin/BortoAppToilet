import electron from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import appConfig from '../../package.json';

import greenPng from '../resources/toilet-green.png';
import redPng from '../resources/toilet-red.png';

const { logger } = global;
const toiletGreenIcon = electron.nativeImage.createFromDataURL(greenPng);
const toiletRedIcon = electron.nativeImage.createFromDataURL(redPng);

class IconHelper {
  constructor() {
    this.appConfig = appConfig;
    this.schedulesHappening = [];
    this.isTrayOnClickBound = false;

    this.changeIcon = this.changeIcon.bind(this);
    this.setTrayClick = this.setTrayClick.bind(this);
    this.getTrayMessage = this.getTrayMessage.bind(this);
    this.addScheduleHapening = this.addScheduleHapening.bind(this);
    this.removeScheduleHapening = this.removeScheduleHapening.bind(this);
    this.main = {};

    this.doubleClicked = false;
    this.mainWindow = null;
  }

  changeIcon(iscleaning) {
    if (this.mainWindow == null) {
      return;
    }

    const { mainWindow } = this;

    this.setTrayClick(mainWindow);

    if (iscleaning) {
      if (mainWindow.icon === undefined || mainWindow.icon === toiletGreenIcon) {
        mainWindow.icon = toiletRedIcon;
        mainWindow.tray.setImage(toiletRedIcon);
        mainWindow.tray.setToolTip(this.getTrayMessage());
        mainWindow.setIcon(toiletRedIcon, '');
      }
    } else if (mainWindow.icon === undefined || mainWindow.icon === toiletRedIcon) {
      mainWindow.icon = toiletGreenIcon;
      mainWindow.tray.setImage(toiletGreenIcon);
      mainWindow.tray.setToolTip(this.getTrayMessage());
      mainWindow.setIcon(toiletGreenIcon, '');
    }

    mainWindow.tray.setToolTip(this.getTrayMessage());
  }

  displayNotificationOnClick(tray, message) {
    const localTray = tray;
    const localMessage = message;
    setTimeout(() => {
      if (this.doubleClicked) {
        this.doubleClicked = false;
      } else {
        localTray.displayBalloon({
          title: this.appConfig.appName,
          content: localMessage,
        });
      }
    }, 100);
  }

  setTrayClick(mainWindow) {
    const localTray = mainWindow.tray;
    const localWindow = mainWindow;
    if (this.isTrayOnClickBound) {
      return;
    }

    localTray.iconHelper = this;

    localTray.on('double-click', () => {
      this.doubleClicked = true;
      localWindow.show();
      logger.info('double clicked');
    });

    localTray.on('click', () => {
      const message = localTray.iconHelper.getTrayMessage();
      this.displayNotificationOnClick(localTray, message);
      logger.info('one click');
    });

    this.isTrayOnClickBound = true;
  }

  getTrayMessage() {
    let message = '';

    if (this.schedulesHappening.length === 0) {
      message = 'All toilet are ready to use.';
    }

    this.schedulesHappening.forEach((element) => {
      const msg = `\u25A0 ${element.getNotificationMessage()}`;
      message += `${msg} \n`;
    });

    return message;
  }

  addScheduleHapening(schedule) {
    this.removeScheduleHapening(schedule);
    this.schedulesHappening.push(schedule);
  }

  removeScheduleHapening(schedule) {
    for (let index = 0; index < this.schedulesHappening.length; index += 1) {
      const element = this.schedulesHappening[index];

      if (element.id === schedule.id) {
        this.schedulesHappening.splice(index, 1);
      }
    }
  }

  start(mainModule) {
    this.main = mainModule;
    const self = this;
    this.main.getMainWindow()
      .then((window) => {
        self.mainWindow = window;
        logger.info('main window received on iconHelper');
      })
      .catch((error) => {
        logger.warn(`Error on getMainWindow for iconHelper: ${error}`);
      });
  }
}

export default new IconHelper();
