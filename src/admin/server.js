const bodyParser = require('body-parser');
const express = require('express');
const os = require('os');
const { resolve } = require('path');
const appConfig = require('../../package.json');
const CONSTS = require('../main/constants');

const { logger } = global;
const port = CONSTS.serverPort;

const staticFolder = 'build/static';
const staticFunc = express.static(staticFolder);
logger.info(resolve(staticFolder));
function handleStatiRequest(req, res, next) {
  logger.info(`static request: ${req.originalUrl}`);
  return staticFunc(req, res, next);
}

function startServer() {
  const server = express();
  server.use('/updates', handleStatiRequest);
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.get('/version', (req, res) => {
    res.json({ version: appConfig.version });
  });
  server.listen(port, () => {
    logger.info(`SERVER is running on port ${port}.`);
  });
}

if (os.hostname().toUpperCase().indexOf('RAFAELBO') !== -1) {
  startServer();
}

require('./client');
