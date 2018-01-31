const updater = require('electron-simple-updater');

console.log('checking update');
updater.init('http://localhost:3003/updates/updates.json');
console.log('update completed.');
