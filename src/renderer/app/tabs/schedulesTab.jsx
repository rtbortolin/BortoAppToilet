import React, { Component } from 'react';

import SchedulesTable from '../../components/schedule/schedulesTable';
import Tab from '../tab';

class SchedulesTab extends Component {
  render() {
    return (
      <Tab>
        <SchedulesTable />
      </Tab>
    );
  }
}

export default SchedulesTab;
