const appConfig = require('../package');
const { exec } = require('child_process');

const command = `electron-packager . "BortoAppToiletAlert" --overwrite --asar=true --platform=win32 --arch=ia32 --icon=src/main/resources/toilet.ico --prune=true --out=release-builds --version-string.CompanyName="${appConfig.company}" --version-string.FileDescription="${appConfig.description}" --version-string.ProductName="${appConfig.appName}"`;

exec(
  command,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
