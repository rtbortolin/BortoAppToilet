const webpackMain = require('electron-webpack/webpack.main.config.js'); // eslint-disable-line

const { inspect } = require('util');

webpackMain().then((config) => {
  console.log(inspect(config, { // eslint-disable-line
    showHidden: false,
    depth: null,
    colors: true,
  }));
});
