const updater = require('electron-simple-updater');

console.log('checking update');
updater.init('https://raw.githubusercontent.com/megahertz/electron-simple-updater/master/example/updates.json');
console.log('update completed.');
