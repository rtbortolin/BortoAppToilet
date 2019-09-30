import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { List, ListItem, ListItemText, ListSubheader, ListItemSecondaryAction, Switch } from '@material-ui/core';
//import Toggle from 'material-ui/Toggle';

import { startWithWindowsChange, isDarkThemeActiveChange, isToShowMaleChange, isToShowFemaleChange } from './actions';

import Tab from '../../app/tab';

const ConfigurationIndex = props => (
  <Tab>
    <List style={{ width: 500 }}>
      <ListSubheader>General</ListSubheader>
      <ListItem>
        <ListItemText primary="Start with Windows" />
        <ListItemSecondaryAction>
          <Switch
            onChange={props.handleStartWithWindowsChange}
            checked={props.configurations.startWithWindows}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Dark Theme" />
        <ListItemSecondaryAction>
          <Switch
            onChange={props.handleIsDarkThemeActiveChange}
            checked={props.configurations.isDarkThemeActive}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListSubheader>Filters</ListSubheader>
      <ListItem>
        <ListItemText primary="Show Male" />
        <ListItemSecondaryAction>
          <Switch
            onChange={props.handleShowMaleChange}
            disabled={!props.configurations.showFemale}
            checked={props.configurations.showMale}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="Show Female" />
        <ListItemSecondaryAction>
          <Switch
            onChange={props.handleShowFemaleChange}
            disabled={!props.configurations.showMale}
            checked={props.configurations.showFemale}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Tab>
);

ConfigurationIndex.propTypes = PropTypes.shape({
  configurations: PropTypes.shape({
    startWithWindows: false,
    isDarkThemeActive: false,
    showMale: true,
    showFemale: true,
  }).isRequired,
  handleStartWithWindowsChange: PropTypes.func.isRequired,
  handleIsDarkThemeActiveChange: PropTypes.func.isRequired,
  handleShowMaleChange: PropTypes.func.isRequired,
  handleShowFemaleChange: PropTypes.func.isRequired,
}).isRequired;

const mapStateToProps = state => ({ configurations: state.configurations });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    handleStartWithWindowsChange: startWithWindowsChange,
    handleIsDarkThemeActiveChange: isDarkThemeActiveChange,
    handleShowMaleChange: isToShowMaleChange,
    handleShowFemaleChange: isToShowFemaleChange,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationIndex);
