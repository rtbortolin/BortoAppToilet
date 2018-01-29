const env = process.env.NODE_ENV || 'production';

let reloadFileTimeout = 30000;
let runScheduleCheckerTimeout = 10000;
if (env === 'production') {
  reloadFileTimeout = 86400000;
  runScheduleCheckerTimeout = 30000;
}


module.exports = {
  reloadFileTimeout,
  runScheduleCheckerTimeout,
  env,
};
