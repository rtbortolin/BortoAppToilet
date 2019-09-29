import ConfigHelper from '../../common/configHelper';
import { ActionTypes as types } from '../constants';

const INITIAL_STATE = {
  startWithWindows: ConfigHelper.getStartWithWindows(),
  isDarkThemeActive: ConfigHelper.getIsDarkThemeActive(),
  showMale: ConfigHelper.getShowMale(),
  showFemale: ConfigHelper.getShowFemale(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.START_WITH_WINDOWS_CHANGED: {
      ConfigHelper.setStartWithWindows(action.payload);
      return {
        ...state,
        startWithWindows: action.payload,
      };
    }

    case types.IS_DARK_THEME_ACTIVE_CHANGED: {
      ConfigHelper.setIsDarkThemeActive(action.payload);
      return {
        ...state,
        isDarkThemeActive: action.payload,
      };
    }

    case types.IS_TO_SHOW_MALE_CHANGED: {
      ConfigHelper.setShowMale(action.payload);
      return {
        ...state,
        showMale: action.payload,
      };
    }

    case types.IS_TO_SHOW_FEMALE_CHANGED: {
      ConfigHelper.setShowFemale(action.payload);
      return {
        ...state,
        showFemale: action.payload,
      };
    }

    default:
      return state;
  }
};
