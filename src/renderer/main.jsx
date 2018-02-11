import { remote } from 'electron'; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import App from './app';

const logger = remote.getGlobal('logger');

const store = createStore(reducers);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'),
);
