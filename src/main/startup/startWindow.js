import electron, { app, BrowserWindow, Menu, Tray } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import * as path from 'path';
import { format as formatUrl } from 'url';
import CONSTs from '../constants';
import appConfig from '../../../package.json';
import blackIconData from '../../resources/toilet-black.png';

const { logger } = global;

const isDevelopment = CONSTs.isDevEnv();
const blackIcon = electron.nativeImage.createFromDataURL(blackIconData);
const main = {};
// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function setOpenOnLogin() {
  app.setLoginItemSettings({
    openAtLogin: true,
  });
}

function showAppClick() {
  mainWindow.show();
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

  const appIcon = new Tray(blackIcon);
  appIcon.setToolTip('No toilet being cleaned.');
  appIcon.setTitle(appConfig.appName);
  appIcon.setPressedImage(blackIcon);
  appIcon.setHighlightMode('always');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

function setIcon(window) {
  const localMainWindow = window;
  localMainWindow.setIcon(blackIcon, '');
  localMainWindow.setTitle(appConfig.appName);
  localMainWindow.tray = addTray();
}

function createMainWindow() {
  const window = new BrowserWindow({
    show: false,
    frame: true,
    closable: false,
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  window.on('ready-to-show', () => {
    setIcon(mainWindow);
    if (isDevelopment) {
      window.show();
    }
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

function bindAppEvents() {
  // quit application when all windows are closed
  app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
      mainWindow = createMainWindow();
    }
  });

  // create main BrowserWindow when electron is ready
  if (app.isReady()) {
    mainWindow = createMainWindow();
  } else {
    app.on('ready', () => {
      mainWindow = createMainWindow();
    });
  }
}

function getMainWindowPromisse(resolve, reject, attempts) {
  if (attempts >= 20) {
    logger.warn('Rejecting getMainWindowPromisse.');
    reject('GetMainWindow timeout');
  }
  if (mainWindow === undefined) {
    const localAttempt = attempts + 1;
    setTimeout(() => { getMainWindowPromisse(resolve, reject, localAttempt); }, 100);
  } else {
    resolve(mainWindow);
  }
}
function getMainWindow() {
  const mainWindowPromisse = new Promise((resolve, reject) => {
    if (mainWindow !== undefined) {
      resolve(mainWindow);
    }
    getMainWindowPromisse(resolve, reject, 0);
  });
  return mainWindowPromisse;
}
main.getMainWindow = getMainWindow;

export function openWindow() {
  bindAppEvents();
  setOpenOnLogin();
}

function init() {
  return main;
}

export default init();
