const bodyParser = require('body-parser');
const express = require('express');
const os = require('os');
const appConfig = require('../../package.json');
const CONSTS = require('../main/constants');

const port = CONSTS.serverPort;

function startServer() {
  const server = express();
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
