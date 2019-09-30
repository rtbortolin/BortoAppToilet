import { ActionTypes as types } from '../../constants';

export const startWithWindowsChange = (event, isInputChecked) => ({
  type: types.START_WITH_WINDOWS_CHANGED,
  payload: isInputChecked,
});

export const isDarkThemeActiveChange = (event, isInputChecked) => ({
  type: types.IS_DARK_THEME_ACTIVE_CHANGED,
  payload: isInputChecked,
});

export const isToShowMaleChange = (event, isInputChecked) => ({
  type: types.IS_TO_SHOW_MALE_CHANGED,
  payload: isInputChecked,
});

export const isToShowFemaleChange = (event, isInputChecked) => ({
  type: types.IS_TO_SHOW_FEMALE_CHANGED,
  payload: isInputChecked,
});

export default () => ('');
