import React from 'react';
import Header from '../../../SiteLayout/Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import ReturnBtn from '../AddEmployees/components/ReturnBtn';
import {
  Switch,
  Route,
  useLocation,
  useRouteMatch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import OverView from './components/OverView';
import SalaryDetails from './components/SalaryDetails';
import EmployeeLinks from './components/EmployeeLinks';
import EmployeeFiles from './components/EmployeeFiles/EmployeeFiles';
import EmployeeStatus from './components/EmployeeStatus';
import FileData from './components/EmployeeFiles/FileData';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    padding: '1rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
    },
    overflow: 'hidden',
    flexGrow: 1,
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
    textTransform: 'capitalize',
  },
  gridBox2: {
    [theme.breakpoints.down('xs')]: {
      background: '#fff',
      border: 'none',
    },
    borderRadius: '5px',
    backgroundColor: '#F9F9F9',
    padding: '.3rem',
    border: '0.5px solid #dfdfdf',
  },
  gridBox1: {
    [theme.breakpoints.down('xs')]: {
      background: '#fff',
      border: 'none',
    },
    borderRadius: '5px',
  },
}));

export default function ViewEmployee() {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const { isLoading, employeeData } = useSelector(
    (state) => state?.employeeData,
  );
  const [employeeContent, setEmployeeContent] = useState({
    data: employeeData,
  });

  const routes = [
    {
      title: 'Employee Overview',
      path: `${url}/overview/:id`,
      component: OverView,
    },
    {
      title: 'Salary Details',
      path: `${url}/salary-info/:id`,
      component: SalaryDetails,
    },
    {
      title: 'Employee Files',
      path: `${url}/files/:id`,
      component: EmployeeFiles,
    },
    {
      title: 'Employee Status',
      path: `${url}/status/:id`,
      component: EmployeeStatus,
    },
  ];
  const classes = useStyles();
  console.log(pathname.substr(26).includes('overview'));
  return (
    <>
      <Header url={'/dashboard/employees'} path={path} pathname={pathname} />
      <div className={classes.root}>
        <div className={classes.sectionControl}>
          <ReturnBtn location="/dashboard/employees" />
          <Button
            endIcon={<Edit />}
            variant="contained"
            disableElevation
            style={{
              textTransform: 'none',
              fontFamily: 'Rubik',
              backgroundColor: '#2F49D0',
              borderRadius: '5px',
              width: '6.5rem',
            }}
            onClick={() =>
              history.push(
                `/dashboard/employees/edit/${employeeContent?.data?.employeeId}`,
              )
            }
            color="primary">
            Edit
          </Button>
        </div>
        <div style={{ paddingTop: '1rem' }}>
          <Grid container className={classes.gridWrapper}>
            <Grid item xs={12} md={2}>
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {employeeData?.firstName} {employeeData?.lastName}
                </Typography>
                <EmployeeLinks url={url} pathname={pathname} />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              className={
                pathname.substr(26).includes('overview')
                  ? classes.gridBox2
                  : classes.gridBox1
              }>
              <Switch>
                {routes.map((route, i) => (
                  <Route key={i} {...route} />
                ))}
                <Redirect
                  from="/dashboard/employees/view"
                  to={`/dashboard/employees/view/overview/${employeeContent?.data.employeeId}`}
                />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
