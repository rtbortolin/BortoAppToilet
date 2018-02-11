import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Menu from './components/menu';
import Configuration from './config/config-index';

const App = () => (
  <MuiThemeProvider>
    <div>
      <Menu />
      <div id="content" />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
