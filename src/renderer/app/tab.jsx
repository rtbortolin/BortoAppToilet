import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { connect } from 'react-redux';
import { remote } from 'electron'; // eslint-disable-line

const logger = remote.getGlobal('logger');

const Tab = props => (
  <Card>
    <CardHeader
      title={props.tab.title}
      subtitle={props.tab.subtitle}
    />
    <CardText expandable={false}>
      {props.children}
    </CardText>
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
