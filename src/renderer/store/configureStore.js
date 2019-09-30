import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // eslint-disable-line

const logger = createLogger({
  collapsed: true,
});
const store = createStore(
  reducers,
  devTools,
  applyMiddleware(thunk, logger),
);

export default store;
