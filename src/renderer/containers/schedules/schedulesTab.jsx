import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { remote } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import SchedulesTable from '../../components/schedule/schedulesTable';
import * as actions from './schedulesActions';
import Tab from '../../app/tab';

const logger = remote.getGlobal('logger');

class SchedulesTab extends Component {
  static get defaultProps() {
    return {
      dispatch: () => {
        logger.warn('dispatch method not defined yet');
      },
      schedules: [],
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      schedules: PropTypes.arrayOf(PropTypes.object),
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.subscribeSchedulesUpdate());
    this.props.dispatch(actions.getSchedules());
  }

  componentWillUnmount() {
    actions.unsubscribeSchedulesUpdate();
  }

  render() {
    return (
      <Tab>
        <SchedulesTable schedules={this.props.schedules} />
      </Tab>
    );
  }
}

const mapStateToProps = state => ({ schedules: state.schedulesStore.schedules });

export default connect(mapStateToProps)(SchedulesTab);
