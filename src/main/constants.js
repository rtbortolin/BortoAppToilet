const env = process.env.NODE_ENV || 'production';

let reloadFileTimeout = 30000;
let runScheduleCheckerTimeout = 10000;
let checkForUpdatesFrequency = 30000;
let serverPort = 3003;
let host = 'localhost';
const isDevEnv = () => env !== 'production';
if (!isDevEnv()) {
  reloadFileTimeout = 3600000;
  runScheduleCheckerTimeout = 30000;
  checkForUpdatesFrequency = 3600000;
  serverPort = 6565;
  host = 'RAFAELBO03';
}

module.exports = {
  reloadFileTimeout,
  runScheduleCheckerTimeout,
  checkForUpdatesFrequency,
  env,
  serverPort,
  host,
  isDevEnv,
};
