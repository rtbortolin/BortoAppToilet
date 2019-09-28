import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // eslint-disable-line
const store = createStore(
  reducers,
  devTools,
  applyMiddleware(logger, thunk),
);

export default store;
