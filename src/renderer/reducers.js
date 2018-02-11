import { combineReducers } from 'redux'; // eslint-disable-line

const rootReducer = combineReducers({
  tab: () => ({
    title: 'Config',
    page: 'Schedules',
  }),
});


export default rootReducer;
