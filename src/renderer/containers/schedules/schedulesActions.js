// eslint-disable-next-line import/no-extraneous-dependencies
import { remote, ipcRenderer } from 'electron';
import { ActionTypes as types } from '../../constants';

const logger = remote.getGlobal('logger');

const fetchSchedulesSuccess = payload => ({
  type: types.FETCH_SCHEDULES_SUCCESS,
  payload,
});

export function getSchedules() {
  return (dispatch) => {
    ipcRenderer.once('get-schedules-reply', (event, arg) => {
      dispatch(fetchSchedulesSuccess(arg));
    });
    ipcRenderer.send('get-schedules', '');
  };
}

export function unsubscribeSchedulesUpdate() {
  ipcRenderer.removeAllListeners('on-schedule-update');
}

export function subscribeSchedulesUpdate() {
  return (dispatch) => {
    ipcRenderer.on('on-schedule-update', (event, message) => {
      logger.info('schedules received on renderer REACT');
      dispatch({
        type: types.FETCH_SCHEDULES_SUCCESS,
        payload: message,
      });
    });
    dispatch({
      type: types.SUBSCRIBE_SCHEDULES_UPDATE,
    });
  };
}

export const fetchSchedulesStart = (event, payload) => ({
  type: types.FETCH_SCHEDULES_START,
  payload,
});

export default () => ('');
