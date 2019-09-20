import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
//import IconButton from '@material-ui/core/IconButton';
//import FontIcon from '@material-ui/core/Icon';
//import Divider from '@material-ui/core/Divider';
//import Drawer from '@material-ui/core/Drawer';
//import MenuItem from '@material-ui/core/MenuItem';

import appConfig from '../../../package.json';
import { pageChange, toggleDrawerOpen } from './actions';
import store from '../store';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuComponent = () => {
  const { appName } = appConfig;
  const classes = useStyles();

  const handleMinimize = () => {
    store.dispatch(toggleDrawerOpen());
    setTimeout(() => {
      ipcRenderer.send('minimize-window', true);
    }, 250);
  };

  const handleSettingsClick = () => {
    store.dispatch(pageChange());
    console.log('oi');
  };

  const handleClose = () => {
    ipcRenderer.send('exit-app', true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleSettingsClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {appName}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleSettingsClick}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

/*


    <AppBar
      title={appName}
      onLeftIconButtonClick={props.toggleDrawerOpen}
      iconElementRight={
        <IconButton tooltip="Settings" onClick={props.pageChange}>
          <FontIcon className="material-icons">settings</FontIcon>
        </IconButton>}
    />
    <Drawer
      docked={false}
      open={props.isDrawerOpen}
      onRequestChange={props.toggleDrawerOpen}
    >
      <MenuItem onClick={handleMinimize} >Minimize to tray</MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>Close app</MenuItem>
    </Drawer>

 */

/*
MenuComponent.propTypes = {
  pageChange: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};
*/
const mapStateToProps = state => ({ isDrawerOpen: state.tab.isDrawerOpen });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    pageChange,
    toggleDrawerOpen,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
