import { remote } from 'electron'; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import App from './app/app';

const logger = remote.getGlobal('logger');

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers, devTools);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >
  , document.getElementById('app'),
);
