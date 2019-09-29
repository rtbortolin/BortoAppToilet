import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import React from 'react';

const ScheduleTableRow = (props) => {
  const { schedule, isNextSchedule } = props;

  const getNextScheduleStyleClassName = () => {
    if (isNextSchedule) {
      if (schedule.gender === 'M') {
        return 'nextScheduleM';
      }
      return 'nextScheduleF';
    }
    return '';
  };
  return (
    <TableRow key={schedule.id} className={getNextScheduleStyleClassName()}>
      <TableCell align="center">
        {schedule.gender === 'M' ? 'Male' : 'Female'}
      </TableCell>
      <TableCell align="center">{schedule.floor}</TableCell>
      <TableCell align="center">{schedule.startTime}</TableCell>
      <TableCell align="center">{schedule.endTime}</TableCell>
    </TableRow>
  );
};

ScheduleTableRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  schedule: PropTypes.object.isRequired,
  isNextSchedule: PropTypes.bool.isRequired,
};

export default ScheduleTableRow;
