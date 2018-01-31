const bodyParser = require('body-parser');
const express = require('express');
const os = require('os');
const path = require('path');
const appConfig = require('../../package.json');
const CONSTS = require('../main/constants');

const port = CONSTS.serverPort;

const staticFunc = express.static(path.join(__dirname, 'static'));
function handleStatiRequest(req, res, next) {
  console.log(`static request: ${req.originalUrl}`);
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
    console.log(`SERVER is running on port ${port}.`);
  });
}

if (os.hostname().toUpperCase().indexOf('RAFAELBO') !== -1) {
  startServer();
}


require('./client');
