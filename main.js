 //handle setupevents as quickly as possible
 const setupEvents = require('./scripts/setupEvents');
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }

 require('./scripts/autoUpdate');


require('body-parser');
require('express');
require('./src/admin/server');

const schedule = require('./src/main/schedule');
const scheduleChecker = require('./src/main/scheduleChecker');
const electron = require('electron');
const appConfig = require('./package');
const iconHelper = require('./src/main/iconHelper');

const {
  app, BrowserWindow, Menu, Tray,
} = electron;

const main = {};
let bw;
const icon = electron.nativeImage.createFromPath(`${app.getAppPath()}/src/main/resources/toilet-green.png`);

function showAppClick() {
  bw.show();
}

function quitAppClick() {
  app.isQuiting = true;
  app.quit();
}

function addTray() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: showAppClick,
    },
    {
      label: 'Quit', click: quitAppClick,
    },
  ]);

  main.contextMenu = contextMenu;

  const appIcon = new Tray(icon);
  appIcon.setToolTip('No toilet being cleaned.');
  appIcon.setTitle(appConfig.appName);
  appIcon.setPressedImage(icon);
  appIcon.setHighlightMode('always');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

function setIcon(mainWindow) {
  const localMainWindow = mainWindow;
  localMainWindow.setIcon(icon, '');
  localMainWindow.setTitle(appConfig.appName);
  localMainWindow.tray = addTray();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  app.setAppUserModelId('com.amdocs.bdc.toiletalert');

  bw = new BrowserWindow({ show: false });
  main.mainWindow = bw;
  try {
    bw.loadURL(`file://${app.getAppPath()}/index.html`);

    bw.once('ready-to-show', (event) => {
      setIcon(bw);
      iconHelper.changeIcon(false);
      event.preventDefault();
      bw.hide();
      bw.tray.displayBalloon({
        title: appConfig.appName,
        content: 'The application is running in background.',
      });
      scheduleChecker();
    });

    bw.on('minimize', (event) => {
      event.preventDefault();
      bw.hide();
    });
  } catch (error) {
    console.error('FATAL ERROR!');
    console.log(error);
  } finally {
    bw.on('closed', () => { bw = null; });
  }
});

function getMainWindow() {
  return bw;
}

main.getMainWindow = getMainWindow;

schedule.start(main);
iconHelper.start(main);

module.exports = main;
