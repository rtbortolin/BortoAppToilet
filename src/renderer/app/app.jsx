import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
//import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { connect } from 'react-redux';

import tmpMenu from './menu';
import ConfigurationTab from '../config/config-index';
import SchedulesTab from './tabs/schedulesTab';

import { remote } from 'electron'; // eslint-disable-line


//import muiThemeable from 'material-ui/styles/muiThemeable';

const Menu = tmpMenu;


const logger = remote.getGlobal('logger');

const App = (props) => {
  const getThemeType = () => {
    // eslint-disable-next-line react/prop-types
    const newPaletteType = props.configurations.isDarkThemeActive ? 'dark' : 'light';
    return newPaletteType;
  };

  const [theme, setTheme] = useState({
    palette: {
      type: 'light',
    },
  });

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

  const setBodyClassName = () => {
    /*
    if (props.configurations.isDarkThemeActive) {
      document.getElementsByTagName('body')[0].setAttribute('class', 'dark-background');
    } else {
      document.getElementsByTagName('body')[0].setAttribute('class', 'light-background');
    }
     */
  };
  const renderBody = () => (
    <div>
      {setBodyClassName()}
      <Menu />
      <div className="content-body">
        {renderContent()}
      </div>
    </div>
  );

  const themeChange = () => {
    const muiTheme = createMuiTheme(theme);
    return muiTheme;
  };
  return (
    <MuiThemeProvider theme={themeChange()}>
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
