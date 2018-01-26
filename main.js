require('body-parser');
require('express');

require('./src/main/schedule');
const electron = require('electron');
const appConfig = require('./package');
const iconHelper = require('./src/main/iconHelper');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;

const main = {};
let bw;
let icon = electron.nativeImage.createFromPath(app.getAppPath() + "/src/main/resources/toilet-black.png");


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

app.on('ready', () => {
    app.setAppUserModelId("com.amdocs.bdc.toiletalert");

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
                content: "The application is running in background."
            });
        });

        /*
        var newMenu = new Menu();
        newMenu.append(new MenuItem({
            label: "Dummy1", accelerator: "Ctrl+O", click: function () {
                console.log("Dummy1");
                debugger;
                editMenu.append(new MenuItem({
                    label: "Dummy2", accelerator: "Ctrl+P", click: function () {
                        console.log("Dummy2");
                    }
                }));
            }
        }));

        var editMenu = new Menu();
        var menubar = Menu.getApplicationMenu();
        menubar.append(new MenuItem({ label: "NewMenu", submenu: newMenu }));
        menubar.append(new MenuItem({ label: "Edit", submenu: editMenu }));
        bw.setMenu(menubar);
        */

        bw.on('minimize', function (event) {
            event.preventDefault();
            bw.hide();
        });

    } catch (error) {
        console.log('FATAL ERROR!')
        console.log(error);
    } finally {
        bw.on('closed', () => { bw = null; });
    }
});

function setIcon(mainWindow) {
    mainWindow.setIcon(icon, "");
    mainWindow.setTitle(appConfig.appName);
    mainWindow.tray = addTray();
}

function addTray() {
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                bw.show();
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    main.contextMenu = contextMenu;

    var appIcon = new Tray(icon);
    appIcon.setToolTip("No toilet being cleaned.");
    appIcon.setTitle(appConfig.appName);
    appIcon.setPressedImage(icon);
    appIcon.setHighlightMode('always');
    appIcon.setContextMenu(contextMenu);
    return appIcon;
}

module.exports = main;