import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import ScheduleTableRow from './scheduleTableRow';
import scheduleHelper from '../../../common/scheduleHelper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const SchedulesTable = (props) => {
  const classes = useStyles();

  let nextScheduleM = null;
  let nextScheduleF = null;

  const isNextSchedule = (schedule) => {
    const currentTime = scheduleHelper.getCurrentTime();
    if (schedule.endTime > currentTime) {
      if (nextScheduleM == null && schedule.gender === 'M') {
        nextScheduleM = schedule;
        return true;
      }
      if (nextScheduleF === null && schedule.gender === 'F') {
        nextScheduleF = schedule;
        return true;
      }
    }
    return false;
  };

  const schedules = () => {
    nextScheduleF = null;
    nextScheduleM = null;
    let result = [...props.schedules];
    result = result.sort((a, b) => a.startTime - b.startTime);
    return result;
  };

  return (
    <div className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Floor</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Time*</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules()
            .map(schedule => (
              <ScheduleTableRow
                key={schedule.id}
                schedule={schedule}
                isNextSchedule={isNextSchedule(schedule)}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

SchedulesTable.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SchedulesTable;
