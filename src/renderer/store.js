import { createStore } from 'redux';
import reducers from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // eslint-disable-line
const store = createStore(reducers, devTools);

export default store;
