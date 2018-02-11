import { remote } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import './style.css';
import templateIndex from './schedulestemplate.html';
import scheduleTable from './schedule_table';
import appConfig from '../../package.json';

const logger = remote.getGlobal('logger');
const robotofont = '@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");';
const materialicon = '@import url(https://fonts.googleapis.com/icon?family=Material+Icons)';
const styles = document.createElement('style');

logger.info('rendering style tag');

styles.innerText = `${robotofont}${materialicon}`;


const head = document.getElementsByTagName('head')[0];
head.appendChild(styles);

require('./app');

const body = document.getElementById('content');
body.innerHTML = templateIndex;

scheduleTable(document);

const tagVersion = document.getElementById('txtVersion');
tagVersion.innerHTML = `<small>version: </small>${appConfig.version}`;

/*
import path from 'path';
import templateIndex from './teste.html';

let index = templateIndex.replace('{style.css}', path.join(__static, 'style.css'));
document.getElementById('app').innerHTML = index;

import scheduleTable from './schedule_table';
scheduleTable(document);
*/
