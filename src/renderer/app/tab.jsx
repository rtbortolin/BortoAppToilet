import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import { connect } from 'react-redux';
import { remote } from 'electron'; // eslint-disable-line

const logger = remote.getGlobal('logger');

const Tab = props => (
  <Card>
    <CardHeader
      title={props.tab.title}
      subtitle={props.tab.subtitle}
    />
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);


Tab.propTypes = {
  children: PropTypes.element,
  tab: PropTypes.shape({ title: '', subtitle: '' }).isRequired,
};

Tab.defaultProps = {
  children: (<span> missing children </span>),
};

const mapStateToProps = state => ({ tab: state.tab });

export default connect(mapStateToProps)(Tab);
