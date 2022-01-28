import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Loader from 'react-loaders';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { DefaultButton } from 'modules/components/Buttons/Defaults';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    paddingTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
    },
    overflow: 'hidden',
    flexGrow: 1,
    paddingBottom: '2rem',
  },
  gridWrapper: {
    flexGrow: 1,
  },
  sectionControl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  employeeName: {
    fontFamily: 'Rubik,sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
  },
  active: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#2F49D0',
    textDecoration: 'none',
  },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem 0 0',
    borderRadius: '5px',
    marginBottom: '2rem',
  },
  tableContainer: {
    backgroundColor: '#FCFFFF',
    borderRadius: '5px',
    border: '0.5px solid #DFDFDF',
    padding: '1rem',
    marginTop: '2rem',
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: 'pointer',
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  flexWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  container: {
    backgroundColor: '#FCFFFF',
    borderRadius: '5px',
    border: '0.5px solid #DFDFDF',
    padding: '1rem',
    overflowX: 'auto',
    width: '100%',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  dialogPaper: {
    width: '45rem',
    height: 'auto',
  },
}));

const columns = [
  { id: 'leaveType', label: 'Leave Type', width: 200 },
  { id: 'from', label: 'From', width: 220 },
  { id: 'to', label: 'To', width: 220 },
  { id: 'days', label: 'Total Days', width: 210 },
  { id: 'permission', label: 'Permission', width: 10 },
];

export default function LeaveStatus() {
  const classes = useStyles();
  const { isLoading, leaveData } = useSelector((state) => state?.leaveData);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [status, setStatus] = useState({
    name: '',
    from: '',
    to: '',
    days: '',
    issuersName: '',
    leaveReason: '',
    leaveType: '',
    daysAvailable: '',
    createdAt: '',
    rejectMessage: '',
  });

  const handleLeaveStatus = (row) => (e) => {
    setOpen(true);
    const {
      name,
      issuersName,
      from,
      to,
      days,
      leaveReason,
      leaveType,
      daysAvailable,
      createdAt,
      rejectMessage,
    } = row?.meta;
    setStatus({
      ...status,
      name,
      issuersName,
      from,
      to,
      days,
      leaveReason,
      leaveType,
      daysAvailable,
      createdAt,
      rejectMessage,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.gridWrapper}>
          {isLoading ? (
            <div className={classes.loader}>
              <Loader type="ball-rotate" color="#2F49D0" />
            </div>
          ) : (
            <Grid item xs={12} md={2}>
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {leaveData[0]?.meta?.name}
                </Typography>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li className={classes.active}>Leave Status</li>
                </ul>
              </div>
            </Grid>
          )}
          <Grid item xs={12} md={10}>
            {isLoading ? (
              <div className={classes.loader}>
                <Loader type="line-scale" color="#2F49D0" />
              </div>
            ) : (
              <>
                <div className={classes.container}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      minWidth: 650,
                    }}>
                    <div className={classes.flexWrapper}>
                      <div
                        style={{
                          background: '#E7D1EE',
                          borderRadius: '5px',
                          margin: '0 .5rem',
                          padding: '1rem 1.1rem',
                        }}>
                        <Typography
                          variant="h5"
                          style={{
                            fontFamily: 'Rubik',
                            fontSize: '16px',
                            fontWeight: 500,
                          }}>
                          {leaveData[0]?.meta?.daysAvailable}
                        </Typography>
                      </div>
                      <Typography
                        variant="h5"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '16px',
                          margin: '0 .5rem',
                          fontWeight: 500,
                        }}>
                        Leaves Available
                      </Typography>
                    </div>
                    <div style={{ borderRight: '2px solid #C4C4C4' }} />
                    <div className={classes.flexWrapper}>
                      <div
                        style={{
                          background: '#EED1D1',
                          borderRadius: '5px',
                          padding: '1rem 1.4rem',
                          margin: '0 .5rem',
                        }}>
                        <Typography
                          variant="h5"
                          style={{
                            fontFamily: 'Rubik',
                            fontSize: '16px',
                            fontWeight: 500,
                          }}>
                          {leaveData.length}
                        </Typography>
                      </div>
                      <Typography
                        variant="h5"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '16px',
                          fontWeight: 500,
                          margin: '0 .5rem',
                        }}>
                        Leaves Taken
                      </Typography>
                    </div>
                    <div style={{ borderRight: '2px solid #C4C4C4' }} />

                    <div className={classes.flexWrapper}>
                      <div
                        style={{
                          background: '#D1E2EE',
                          borderRadius: '5px',
                          margin: '0 .5rem',
                          padding: '1rem 1.4rem',
                        }}>
                        <Typography
                          variant="h5"
                          style={{
                            fontFamily: 'Rubik',
                            fontSize: '16px',
                            fontWeight: 500,
                          }}>
                          2
                        </Typography>
                      </div>
                      <Typography
                        variant="h5"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '16px',
                          margin: '0 .5rem',
                          fontWeight: 500,
                        }}>
                        This month
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className={classes.tableContainer}>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      stickyHeader
                      aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                width: column.width,
                                fontFamily: 'Rubik',
                                fontWeight: 500,
                                fontSize: '16px',
                              }}
                              className={classes.cellWrapper}>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaveData?.map((row, i) => (
                          <TableRow
                            hover
                            key={i}
                            className={classes.tableRow}
                            onClick={handleLeaveStatus(row)}>
                            {columns.map((column) => {
                              const value =
                                row?.meta[column.id] || row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    fontFamily: 'Rubik, sans-serif',
                                    backgroundColor: '#FCFFFF',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color:
                                      column.id == 'permission' &&
                                      row.permission == 'APPROVED'
                                        ? '#31BE00'
                                        : column.id == 'permission' &&
                                          row.permission == 'REJECTED'
                                        ? '#FF0303'
                                        : column.id == 'permission' &&
                                          row.permission == 'PENDING'
                                        ? '#FFB703'
                                        : '#000',
                                  }}>
                                  {column.id === 'permission'
                                    ? value.substring(0, 1) +
                                      value.substring(1).toLowerCase()
                                    : column.id == 'from' || column.id == 'to'
                                    ? `${
                                        new Date(value)
                                          .toLocaleDateString('en-GB')
                                          .substr(0, 6) +
                                        new Date(value)
                                          .toLocaleDateString('en-GB')
                                          .substr(8)
                                      }`
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </div>
      <Dialog
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
        open={open}
        disableBackdropClick>
        <DialogTitle>
          <TypographyBold style={{ fontSize: 22 }}>
            {status?.rejectMessage
              ? 'Rejected Leave Request'
              : 'Approved Leave Request'}
          </TypographyBold>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#F8F8F8', padding: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#282828b8',
            }}>
            <TypographyBold style={{ fontSize: 22, color: '#000' }}>
              {`${status.leaveType} Leave By ${status.name}`}
            </TypographyBold>
            <TypographyH5>{`${new Date(status.from).toLocaleDateString(
              'en-GB',
            )} - ${new Date(status.to).toLocaleDateString('en-GB')} (${
              status.days
            } days)`}</TypographyH5>
            <TypographyH5>{`Remaining Leave days - ${status.daysAvailable}`}</TypographyH5>
          </div>
          {status.leaveReason ? (
            <div
              style={{
                backgroundColor: '#27AE60',
                width: '23rem',
                borderRadius: '60px 60px 60px 0',
                padding: '30px 18px',
                margin: '2rem 0',
                color: '#fff',
              }}>
              <TypographyH5>{status.leaveReason}</TypographyH5>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <TypographyH5>No Leave Reason</TypographyH5>
            </div>
          )}
          {status.rejectMessage && (
            <div
              style={{
                backgroundColor: '#EB5757',
                width: '23rem',
                borderRadius: '60px 60px 0px',
                padding: '30px 18px',
                margin: '2rem 0 2rem auto',
                color: '#fff',
              }}>
              <TypographyH5>{status.rejectMessage}</TypographyH5>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5rem',
              color: '#282828b8',
            }}>
            <TypographyH5 variant="h4" style={{ fontSize: 16 }}>
              {status.rejectMessage
                ? `Leave Rejected By ${status.issuersName}`
                : `Leave Approved by ${status.issuersName} ${new Date(
                    status.createdAt,
                  ).toLocaleDateString('en-GB')}`}
            </TypographyH5>
          </div>
        </DialogContent>
        <DialogActions>
          <DefaultButton onClick={handleClose}>Close</DefaultButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
