import { ActionTypes as types } from '../constants';

export const pageChange = () => ({
  type: types.PAGE_CHANGED,
  payload: null,
});

export const toggleDrawerOpen = () => ({
  type: types.TOGGLE_DRAWER_OPEN,
  payload: null,
});
