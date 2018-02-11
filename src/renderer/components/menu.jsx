import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import appConfig from '../../../package.json';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const { appName } = appConfig;

const AppBarExampleIcon = () => (
  <AppBar
    title={appName}
    iconElementRight={
      <IconButton>
        <FontIcon className="material-icons">settings</FontIcon>
      </IconButton>}
  />
);

export default AppBarExampleIcon;
