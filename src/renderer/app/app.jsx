import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from 'react-redux';

import Menu from './menu';
import Configuration from '../config/config-index';

import { remote } from 'electron'; // eslint-disable-line

const logger = remote.getGlobal('logger');

const App = (props) => {
  const renderContent = () => {
    const { page } = props;
    if (page === 'Schedules') {
      return (
        <div>
          <div id="content" />
        </div>
      );
    }
    if (page === 'Configuration') {
      const style = { display: 'none' };
      return (
        <div>
          <div id="content" style={style} />
          <Configuration />
        </div>
      );
    }
    return '';
  };
  return (
    <MuiThemeProvider>
      <div>
        <Menu />
        <div className="content-body">
          {renderContent()}
        </div>
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  page: PropTypes.string,
};

App.defaultProps = {
  page: 'Schedules',
};

const mapStateToProps = state => ({ page: state.tab.page });

export default connect(mapStateToProps)(App);
