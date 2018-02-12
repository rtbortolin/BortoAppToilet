import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { connect } from 'react-redux';

import tmpMenu from './menu';
import Configuration from '../config/config-index';

import { remote } from 'electron'; // eslint-disable-line


import muiThemeable from 'material-ui/styles/muiThemeable';
const Menu = muiThemeable()(tmpMenu);


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
    if (page === 'Configurations') {
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
  const setBodyClassName = () => {
    if (props.configurations.isDarkThemeActive) {
      document.getElementsByTagName('body')[0].setAttribute('class', 'dark-background');
    } else {
      document.getElementsByTagName('body')[0].setAttribute('class', 'light-background');
    }
  };
  const renderBody = () => (
    <div>
      {setBodyClassName()}
      <Menu />
      <div className="content-body">
        {renderContent()}
      </div>
    </div >
  );

  const themeChange = () => {
    const theme = props.configurations.isDarkThemeActive ? getMuiTheme(darkBaseTheme) : getMuiTheme(lightBaseTheme);
    return theme;
  };
  return (
    <MuiThemeProvider muiTheme={themeChange()}>
      {renderBody()}
    </MuiThemeProvider>
  );
};

App.propTypes = {
  page: PropTypes.string,
};

App.defaultProps = {
  page: 'Schedules',
};

const mapStateToProps = state => ({ page: state.tab.page, configurations: state.configurations });

export default connect(mapStateToProps)(App);
