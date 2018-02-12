import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { remote } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import appConfig from '../../../package.json';
import { pageChange } from './actions';

const logger = remote.getGlobal('logger');

const { appName } = appConfig;

const MenuComponent = props => (
  <AppBar
    title={appName}
    iconElementRight={
      <IconButton tooltip="Settings" onClick={props.pageChange}>
        <FontIcon className="material-icons">settings</FontIcon>
      </IconButton>}
  />
);

MenuComponent.propTypes = {
  pageChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ pageChange }, dispatch);

export default connect(null, mapDispatchToProps)(MenuComponent);
