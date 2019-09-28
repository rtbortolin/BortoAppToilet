import { combineReducers } from 'redux'; // eslint-disable-line
import appReducer from '../app/appReducer';
import configReducer from '../config/configReducer';

const rootReducer = combineReducers({
  tab: appReducer,
  configurations: configReducer,
});

export default rootReducer;
