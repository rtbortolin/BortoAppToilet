import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import { startWithWindowsChange, isDarkThemeActiveChange } from './actions';

import Tab from '../app/tab';

const ConfigurationIndex = props => (
  <Tab>
    <List style={{ width: 500 }}>
      <Subheader>General</Subheader>
      <ListItem
        primaryText="Start with Windows"
        rightToggle={
          <Toggle
            onToggle={props.handleStartWithWindowsChange}
            toggled={props.configurations.startWithWindows}
          />
        }
      />
      <ListItem
        primaryText="Dark Theme"
        rightToggle={
          <Toggle
            onToggle={props.handleIsDarkThemeActiveChange}
            toggled={props.configurations.isDarkThemeActive}
          />
        }
      />
    </List>
  </Tab>
);

ConfigurationIndex.propTypes = {
  configurations: PropTypes.shape({ startWithWindows: false, isDarkThemeActive: false }).isRequired,
  handleStartWithWindowsChange: PropTypes.func.isRequired,
  handleIsDarkThemeActiveChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ configurations: state.configurations });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    handleStartWithWindowsChange: startWithWindowsChange,
    handleIsDarkThemeActiveChange: isDarkThemeActiveChange,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationIndex);
