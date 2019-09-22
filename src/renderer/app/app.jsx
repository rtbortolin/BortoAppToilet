import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';

import Menu from './menu';
import ConfigurationTab from '../config/config-index';
import SchedulesTab from './tabs/schedulesTab';

import { remote } from 'electron'; // eslint-disable-line

const App = (props) => {
  const theme = {
    palette: {
      type: props.themeType,
    },
  };

  const renderContent = () => {
    const { page } = props;
    if (page === 'Schedules') {
      return (
        <div>
          <SchedulesTab />
        </div>
      );
    }
    if (page === 'Configurations') {
      return (
        <div>
          <ConfigurationTab />
        </div>
      );
    }
    return '';
  };

  const renderBody = () => (
    <div>
      <div className="content-body">
        {renderContent()}
      </div>
    </div>
  );

  const myTheme = createMuiTheme(theme);
  return (
    <React.Fragment>
      <MuiThemeProvider theme={myTheme}>
        <CssBaseline />
        <Menu />
        {renderBody()}
      </MuiThemeProvider>
    </React.Fragment>
  );
};

App.propTypes = {
  page: PropTypes.string,
  themeType: PropTypes.string,
};

App.defaultProps = {
  page: 'Schedules',
  themeType: 'light',
};

const mapStateToProps = state => ({
  page: state.tab.page,
  configurations: state.configurations,
  themeType: state.configurations.isDarkThemeActive ? 'dark' : 'light',
});

export default connect(mapStateToProps)(App);
