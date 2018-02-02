const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig() {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  console.log('creating windows installer')
  const outPath = path.join(rootPath, 'release-builds')
  console.log('creating windows installer')
  const iconPath = path.join(rootPath, 'src', 'main', 'resources', 'toilet.ico');
  console.log(iconPath);
  return Promise.resolve({
    appDirectory: path.join(outPath, 'BortoAppToiletAlert-win32-ia32/'),
    authors: 'Christian Engvall',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'BortoAppToiletAlert.exe',
    setupExe: 'BortoAppToiletAlertInstaller.exe',
    setupIcon: iconPath
  })
  console.log('creating windows installer')
}