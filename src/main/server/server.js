import bodyParser from 'body-parser';
import express from 'express';
import os from 'os';
import { resolve } from 'path';
import appConfig from '../../../package.json';
import CONSTS from '../../common/constants';

const { logger } = global;
const port = CONSTS.serverPort;

const staticFolder = 'C:/Users/RAFAELBO/Downloads/ftp/publish/';
const staticFunc = express.static(staticFolder);
logger.info(resolve(staticFolder));

function handleStaticRequest(req, res, next) {
  logger.info(`static request: ${req.originalUrl}`);
  return staticFunc(req, res, next);
}

const staticAppFunc = express.static(__dirname);

function handleLocalApp(req, res, next) {
  logger.info(`static local app request: ${req.originalUrl}`);
  logger.info(`server dirname: ${__dirname}`);
  return staticAppFunc(req, res, next);
}

function startServer() {
  const server = express();
  server.use('/updates', handleStaticRequest);
  server.use('/app', handleLocalApp);
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.get('/version', (req, res) => {
    res.json({ version: appConfig.version });
  });
  server.listen(port, () => {
    logger.info(`local SERVER is running on port ${port}.`);
  });
}

function shouldStartServer() {
  const isRafaelboHost = os.hostname().toUpperCase().indexOf('RAFAELBO') !== -1;
  const isDebug = CONSTS.isDevEnv();
  return true;
  //return isRafaelboHost || isDebug;
}

function run() {
  if (shouldStartServer()) {
    startServer();
  }
}

export default run;
