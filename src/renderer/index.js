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

require('./main');

const body = document.getElementsByTagName('body')[0];
const versionTagHtml = document.createElement('footer');
versionTagHtml.innerHTML = '<h4><span id="txtVersion"/></h4>';

body.append(versionTagHtml);

const tagVersion = document.getElementById('txtVersion');
tagVersion.innerHTML = `<small>version: </small>${appConfig.version}`;
