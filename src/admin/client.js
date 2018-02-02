const os = require('os');
const nodefetch = require('node-fetch');
const CONSTS = require('../main/constants');
const appConfig = require('../../package.json');

const currentVersion = '1.0.1';

const hostname = os.hostname();
const newVersionUrl = `http://rafaelbo03:${CONSTS.serverPort}/version?${hostname}`;

class NewVersionChecker extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      return executor(resolve, reject);
    });
  }

  then(onFulfilled, onRejected) {
    const returnValue = super.then(onFulfilled, onRejected);

    return returnValue;
  }

  static checkNewVersion() {
    const newVersionRequest = nodefetch(newVersionUrl);
    newVersionRequest
      .then(res => res.json())
      .then((json) => {
        console.log(json);
        if (currentVersion !== json.version) {
          console.log('versão diferente!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
