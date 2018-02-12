import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import appConfig from '../../../package.json';
import { pageChange, toggleDrawerOpen } from './actions';
import store from '../store';

const { appName } = appConfig;

function handleMinimize() {
  store.dispatch(toggleDrawerOpen());
  setTimeout(() => {
    ipcRenderer.send('minimize-window', true);
  }, 250);
}

function handleClose() {
  ipcRenderer.send('exit-app', true);
}

const MenuComponent = props => (
  <div>
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
      <MenuItem onClick={handleMinimize} >Minimize</MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>Exit</MenuItem>
    </Drawer>
  </div>
);

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
