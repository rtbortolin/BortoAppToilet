/* eslint-disable no-console */

/**
 * Windows users use git-bash to make this work (https://git-for-windows.github.io/)
 */

const childProcess = require('child_process');
const path = require('path');

let exitCode = 0;

const toError = (stdout) => {
  const error = stdout.toString('utf8');
  if (error.length > 0) {
    console.log(error);
    exitCode = 1;
  }
};

const getChangedFiles = () => {
  let changedFiles = null;

  try {
    const str = childProcess.execSync('git diff --cached --name-only | grep \'.js$\'').toString('utf8');
    changedFiles = str.split(/(\r?\n)/g).filter(line => !(line === '\n' || line === '\r' || line.length < 1));
  } catch (e) {
    toError(e.stdout);
  }

  return changedFiles;
};

const lintFiles = (files) => {
  if (files) {
    files.forEach((file) => {
      if (path.extname(file) !== '.js') {
        return;
      }

      try {
        childProcess.execSync(`${path.join(__dirname, 'node_modules/.bin/eslint')} --fix ${file}`).toString('utf8');
      } catch (e) {
        toError(e.stdout);
      }
    });
  }
};

const changedFiles = getChangedFiles();
lintFiles(changedFiles);

process.exit(exitCode);
