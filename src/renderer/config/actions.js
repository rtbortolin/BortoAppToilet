export const startWithWindowsChange = (event, isInputChecked) => ({
  type: 'START_WITH_WINDOWS_CHANGED',
  payload: isInputChecked,
});

export const isDarkThemeActiveChange = (event, isInputChecked) => ({
  type: 'IS_DARK_THEME_ACTIVE_CHANGED',
  payload: isInputChecked,
});

export default () => ('a');
