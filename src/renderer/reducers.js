import { combineReducers } from 'redux'; // eslint-disable-line
import appReducer from './app/appReducer';

const rootReducer = combineReducers({
  tab: appReducer,
});


export default rootReducer;
