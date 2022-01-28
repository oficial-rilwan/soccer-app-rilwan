import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { authClient } from 'modules/authentication/requestClient';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    padding: '0rem 0rem 1.5rem',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  stats: {
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: 500,
    color: '#474747',
  },
  subStats: {
    fontFamily: 'Rubik',
    fontSize: '18px',
    paddingTop: '.5rem',
    textTransform: 'capitalize',
  },
  employeeContent: {
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: '400',
  },
  c2a: {
    marginTop: '.5rem',
    textTransform: 'none',
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    backgroundColor: '#fff',
  },
  statsContainer: {
    marginTop: '1rem',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  historyWrapper: {
    overflowX: 'auto',
  },
  history: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 300,
  },
}));
export default function EmployeeStatus({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = theme.breakpoints.down('xs');
  const matchesSm = theme.breakpoints.down('sm');
  const [values, setValues] = useState('');
  const history = useHistory();

  const handleClick = (value) => {
    setValues(value);
  };

  const [details, setDetails] = useState({});
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    authClient
      .get(`/api/v1/employee/fetch?employeeId=${match?.params?.id}`)
      .then(({ data }) => setDetails(data?.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/history/management/fetch?employeeId=${match?.params.id}`,
      )
      .then(({ data }) => setStatuses(data?.data))
      .catch((e) => console.log(e));
  }, []);

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const statusMap = ['SALARY', 'ACTIVE'];
  return (
    <>
      <Paper
        elevation={2}
        style={{
          backgroundColor: '#FCFFFF',
          padding: '1rem',
          height: 'auto',
          border: '0.5px solid #DFDFDF',
        }}>
        <Typography variant="h3" className={classes.title}>
          Make your changes here
        </Typography>
        <div>
          <Typography
            variant="h5"
            className={classes.stats}
            style={{ paddingTop: '.5rem' }}>
            Status:{' '}
            <span style={{ color: '#1F53D7' }}>{details.employmentStatus}</span>
          </Typography>
          <div style={{ border: '1px solid #C4C4C4', margin: '.5rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" className={classes.subStats}>
              Work start date
            </Typography>
            <Typography variant="h5" className={classes.subStats}>
              {new Date(details?.dateOfHire).toLocaleDateString('en-GB')}
            </Typography>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Typography
              variant="h5"
              className={classes.stats}
              style={{ paddingTop: '1rem' }}>
              Change Status
            </Typography>
            <div style={{ border: '1px solid #C4C4C4', margin: '.5rem 0' }} />
            <div className={classes.statsContainer}>
              <Typography variant="h6" className={classes.employeeContent}>
                For employee resignation or termination
              </Typography>
              <Button
                variant="outlined"
                className={classes.c2a}
                disableElevation
                onClick={() => history.push('/dashboard/termination')}>
                Start Offboarding
              </Button>
            </div>
            <div className={classes.statsContainer}>
              <Typography variant="h6" className={classes.employeeContent}>
                For employee going on leave
              </Typography>
              <Button
                variant="outlined"
                className={classes.c2a}
                disableElevation
                onClick={() =>
                  history.push({
                    pathname: `/dashboard/leave`,
                    state: {
                      id: match?.params?.id,
                      name: 'Marow Macaulay',
                    },
                  })
                }>
                Place on Leave
              </Button>
            </div>
            <div className={classes.statsContainer}>
              <Typography variant="h6" className={classes.employeeContent}>
                For employee going on Transfer
              </Typography>
              <Button
                variant="outlined"
                disableElevation
                className={classes.c2a}
                onClick={() => history.push('/dashboard/transfer')}>
                Transfer Employee
              </Button>
            </div>
            <div className={classes.statsContainer}>
              <Typography variant="h6" className={classes.employeeContent}>
                For employee on Suspension
              </Typography>
              <Button
                variant="outlined"
                disableElevation
                className={classes.c2a}
                onClick={() => history.push('/dashboard/suspension')}>
                Suspend Employee
              </Button>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="h5"
                className={classes.stats}
                style={{ paddingTop: '.5rem' }}>
                History
              </Typography>
              <Typography
                variant="h5"
                className={classes.stats}
                style={{ paddingTop: '.5rem' }}>
                Date
              </Typography>
            </div>
            <div style={{ border: '1px solid #C4C4C4', margin: '.5rem 0' }} />
            <div className={classes.historyWrapper}>
              {statuses?.map((item, i) => (
                <div className={classes.history} key={i}>
                  <Typography variant="h5" className={classes.subStats}>
                    {item.type.toLowerCase()}
                  </Typography>
                  <Typography variant="h5" className={classes.subStats}>
                    {weekDays[new Date(item.from).getUTCDay()] +
                      ' ' +
                      months[new Date(item.from).getUTCMonth()] +
                      ' ' +
                      new Date(item.from).getDate() +
                      ' ' +
                      new Date(item.from).getUTCFullYear()}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
