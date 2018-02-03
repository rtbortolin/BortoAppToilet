const electron = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const appConfig = require('../../package');

const { app } = electron;

const toiletGreenIcon = electron.nativeImage.createFromPath(`${app.getAppPath()}/src/main/resources/toilet-green.png`);
const toiletRedIcon = electron.nativeImage.createFromPath(`${app.getAppPath()}/src/main/resources/toilet-red.png`);

class IconHelper {
  constructor() {
    this.schedulesHappening = [];
    this.isTrayOnClickBound = false;

    this.changeIcon = this.changeIcon.bind(this);
    this.setTrayClick = this.setTrayClick.bind(this);
    this.getTrayMessage = this.getTrayMessage.bind(this);
    this.addScheduleHapening = this.addScheduleHapening.bind(this);
    this.removeScheduleHapening = this.removeScheduleHapening.bind(this);
    this.main = {};
  }

  changeIcon(iscleaning) {
    const mainWindow = this.main.getMainWindow();
    if (mainWindow == null) {
      return;
    }

    this.setTrayClick(mainWindow.tray);

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
  }

  setTrayClick(tray) {
    const localTray = tray;
    if (this.isTrayOnClickBound) {
      return;
    }

    localTray.iconHelper = this;

    tray.on('click', () => {
      const message = tray.iconHelper.getTrayMessage();
      tray.displayBalloon({
        title: appConfig.appName,
        content: message,
      });
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
  }
}

module.exports = new IconHelper();
