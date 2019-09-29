import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

  const schedules = () => props.schedules.sort((a, b) => a.startTime - b.startTime);

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
              <TableRow key={schedule.id}>
                <TableCell align="center">
                  {schedule.gender === 'M' ? 'Male' : 'Female'}
                </TableCell>
                <TableCell align="center">{schedule.floor}</TableCell>
                <TableCell align="center">{schedule.startTime}</TableCell>
                <TableCell align="center">{schedule.endTime}</TableCell>
              </TableRow>
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

/*
import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';


import './scheduleTable.css';

/*
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
*/
/*
class ScheduleTable extends Component {
  constructor(props) {
    super(props);

    this.pacoquinha = this.pacoquinha.bind(this);
  }

  pacoquinha() {
    this.state = 'oi';
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Gender
              </TableCell>
              <TableCell>
                Floor
              </TableCell>
              <TableCell>
                Start Time
              </TableCell>
              <TableCell>
                End Time
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    );
  }
}

export default ScheduleTable;
*/
