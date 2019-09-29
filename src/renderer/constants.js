import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  PAGE_CHANGED: null,
  TOGGLE_DRAWER_OPEN: null,

  START_WITH_WINDOWS_CHANGED: null,
  IS_DARK_THEME_ACTIVE_CHANGED: null,
  IS_TO_SHOW_MALE_CHANGED: null,
  IS_TO_SHOW_FEMALE_CHANGED: null,
});

export default ActionTypes;
