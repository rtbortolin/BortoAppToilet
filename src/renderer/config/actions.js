export const startWithWindowsChange = (event, isInputChecked) => ({
  type: 'START_WITH_WINDOWS_CHANGED',
  payload: isInputChecked,
});

export const isDarkThemeActiveChange = (event, isInputChecked) => ({
  type: 'IS_DARK_THEME_ACTIVE_CHANGED',
  payload: isInputChecked,
});

export const isToShowMaleChange = (event, isInputChecked) => ({
  type: 'IS_TO_SHOW_MALE_CHANGED',
  payload: isInputChecked,
});

export const isToShowFemaleChange = (event, isInputChecked) => ({
  type: 'IS_TO_SHOW_FEMALE_CHANGED',
  payload: isInputChecked,
});

export default () => ('a');
