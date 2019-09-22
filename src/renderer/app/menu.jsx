import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuIcon from '@material-ui/icons/Menu';
import MinimizeIcon from '@material-ui/icons/Minimize';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';

import appConfig from '../../../package.json';
import { pageChange, toggleDrawerOpen } from './actions';


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

const MenuComponent = (props) => {
  const { appName } = appConfig;
  const classes = useStyles();

  const handleMinimize = () => {
    setTimeout(() => {
      ipcRenderer.send('minimize-window', true);
    }, 250);
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
            onClick={props.toggleDrawerOpen}
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
            onClick={props.pageChange}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        docked="false"
        open={props.isDrawerOpen}
        onClick={props.toggleDrawerOpen}
      >
        <Divider />
        <List>
          <ListItem button key="Minimize" onClick={handleMinimize}>
            <ListItemIcon><MinimizeIcon /></ListItemIcon>
            <ListItemText primary="Minimize to tray" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Close" onClick={handleClose}>
            <ListItemIcon><CloseIcon /></ListItemIcon>
            <ListItemText primary="Close app" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

MenuComponent.propTypes = {
  pageChange: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isDrawerOpen: state.tab.isDrawerOpen });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    pageChange,
    toggleDrawerOpen,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
