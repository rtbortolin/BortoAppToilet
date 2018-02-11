import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { remote } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import appConfig from '../../../package.json';

const logger = remote.getGlobal('logger');

const { appName } = appConfig;

const MenuComponent = props => (
  <AppBar
    title={appName}
    iconElementRight={
      <IconButton tooltip="Settings" onClick={props.onSettingsClick}>
        <FontIcon className="material-icons">settings</FontIcon>
      </IconButton>}
  />
);

MenuComponent.propTypes = {
  onSettingsClick: PropTypes.func,
};

MenuComponent.defaultProps = {
  onSettingsClick: () => { logger.debug('default onSettingsClick'); },
};


export default MenuComponent;
