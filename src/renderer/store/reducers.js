import { combineReducers } from 'redux'; // eslint-disable-line
import appReducer from '../app/appReducer';
import configReducer from '../containers/config/configReducer';
import schedulesReducer from '../containers/schedules/schedulesReducer';

const rootReducer = combineReducers({
  tab: appReducer,
  configurations: configReducer,
  schedulesStore: schedulesReducer,
});

export default rootReducer;
