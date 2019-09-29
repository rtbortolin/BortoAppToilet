import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';

import Menu from './menu';
import ConfigurationTab from '../containers/config/config-index';
import SchedulesTab from '../containers/schedules/schedulesTab';

class App extends Component {
  constructor(props) {
    super(props);

    this.theme = {
      palette: {
        type: props.themeType,
      },
    };
    this.myTheme = createMuiTheme(this.theme);
  }

  renderContentBody() {
    const { page } = this.props;
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
  }

  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={this.myTheme}>
          <CssBaseline />
          <Menu />
          <div className="content-body">
            {this.renderContentBody()}
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

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
