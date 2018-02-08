import electron, { app, BrowserWindow, Menu, Tray } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import * as path from 'path';
import { format as formatUrl } from 'url';
import CONSTs from '../constants';
import appConfig from '../../../package.json';
// import icon from '../resources/toilet-green.png';

const isDevelopment = CONSTs.isDevEnv();
const iconPath = `${app.getAppPath()}/src/main/resources/toilet-green.png`;
const icon = electron.nativeImage.createFromPath(iconPath);

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

  const appIcon = new Tray(icon);
  appIcon.setToolTip('No toilet being cleaned.');
  appIcon.setTitle(appConfig.appName);
  appIcon.setPressedImage(icon);
  appIcon.setHighlightMode('always');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

function setIcon(window) {
  const localMainWindow = window;
  localMainWindow.setIcon(icon, '');
  localMainWindow.setTitle(appConfig.appName);
  localMainWindow.tray = addTray();
}

function createMainWindow() {
  global.logger.info(iconPath);
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

  global.logger.info('oi2');
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
  app.on('ready', () => {
    mainWindow = createMainWindow();
  });
}

export default function init() {
  bindAppEvents();
  setOpenOnLogin();
}
