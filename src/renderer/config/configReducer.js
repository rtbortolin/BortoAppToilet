import ConfigHelper from '../../common/configHelper';

const INITIAL_STATE = {
  startWithWindows: ConfigHelper.getStartWithWindows(),
  isDarkThemeActive: ConfigHelper.getIsDarkThemeActive(),
  showMale: ConfigHelper.getShowMale(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START_WITH_WINDOWS_CHANGED': {
      ConfigHelper.setStartWithWindows(action.payload);
      return { ...state, startWithWindows: action.payload };
    }

    case 'IS_DARK_THEME_ACTIVE_CHANGED': {
      ConfigHelper.setIsDarkThemeActive(action.payload);
      return { ...state, isDarkThemeActive: action.payload };
    }

    case 'IS_TO_SHOW_MALE_CHANGED': {
      ConfigHelper.setShowMale(action.payload);
      return { ...state, showMale: action.payload };
    }

    default:
      return state;
  }
};
