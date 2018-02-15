import winston from 'winston';
import os from 'os';
import CONSTs from '../../common/constants';

const isRafaelboHost = os.hostname().toUpperCase().indexOf('RAFAELBO') !== -1;

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.prettyPrint(),
);

function getLogLevel() {
  if (CONSTs.isDevEnv()) {
    return 'debug';
  }
  if (isRafaelboHost) {
    return 'info';
  }
  return 'warning';
}

const logLevel = getLogLevel();

function execute() {
  const logger = winston.createLogger({
    exitOnError: false,
    level: logLevel,
    format: logFormat,
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        handleExceptions: true,
        humanReadableUnhandledException: true,
      }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      level: logLevel,
      format: logFormat,
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }));
  }

  logger.log({ level: 'info', message: 'Logger created' });
  global.logger = logger;
}

export default execute();
