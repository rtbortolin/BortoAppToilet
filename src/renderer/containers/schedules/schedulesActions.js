import { remote, ipcRenderer } from 'electron';
import { ActionTypes as types } from '../../constants';

const logger = remote.getGlobal('logger');

export function subscribeSchedulesUpdate() {
  return (dispatch) => {
    ipcRenderer.on('on-schedule-update', (event, message) => {
      logger.info('schedules received on renderer REACT');
      dispatch({
        type: types.FETCH_SCHEDULES_SUCCESS,
        payload: message,
      });
    });
  };
}

export const fetchSchedulesSuccess = payload => ({
  type: types.FETCH_SCHEDULES_SUCCESS,
  payload,
});

export const fetchSchedulesStart = (event, payload) => ({
  type: types.FETCH_SCHEDULES_START,
  payload,
});

export default () => ('');
