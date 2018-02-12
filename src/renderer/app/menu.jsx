import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import appConfig from '../../../package.json';
import { pageChange, toggleDrawerOpen } from './actions';

const { appName } = appConfig;

function handleClose() {

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
      width={200}
      open={props.isDrawerOpen}
      onRequestChange={props.toggleDrawerOpen}
    >
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
