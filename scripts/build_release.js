const jsonfile = require('jsonfile'); // eslint-disable-line
const CONSTs = require('../src/main/constants');

const file = './publisher.template.json';
const targetFile = './publisher.json';

const publisher = jsonfile.readFileSync(file);

publisher.transport.remoteUrl = publisher.transport.remoteUrl.replace('{host}', CONSTs.host).replace('{port}', CONSTs.serverPort);
publisher.updatesJsonUrl = publisher.updatesJsonUrl.replace('{host}', CONSTs.host).replace('{port}', CONSTs.serverPort);

jsonfile.writeFile(targetFile, publisher, { spaces: 2 }, (err) => {
  global.logger.error(err);
});

