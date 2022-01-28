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
import { Grid, Typography } from '@material-ui/core';
import Links from './components/Links';
import BankDetails from './components/BankDetails';
import PersonalInformation from './components/PersonalInformation';
import Compensation from './components/Compensation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
}));

export default function EditEmployee() {
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
      title: 'Employee Personal Information',
      path: `${url}/personal-information/:id`,
      component: PersonalInformation,
    },
    {
      title: 'Compensation Details',
      path: `${url}/compensation/:id`,
      component: Compensation,
    },
    {
      title: 'Bank Details',
      path: `${url}/bank/:id`,
      component: BankDetails,
    },
  ];
  const classes = useStyles();
  const { firstName, lastName } = employeeContent?.data;
  return (
    <>
      <Header url={'/dashboard/employees'} path={path} pathname={pathname} />
      <div className={classes.root}>
        <div className={classes.sectionControl}>
          <ReturnBtn
            location={`/dashboard/employees/view/overview/${employeeContent?.data?.employeeId}`}
          />
        </div>
        <div style={{ paddingTop: '1rem' }}>
          <Grid container className={classes.gridWrapper}>
            <Grid item xs={12} md={2}>
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {firstName} {lastName}
                </Typography>
                <Links url={url} pathname={pathname} />
              </div>
            </Grid>
            <Grid item xs={12} md={10}>
              <Switch>
                {routes.map((route, i) => (
                  <Route key={i} {...route} />
                ))}
                <Redirect
                  from="/dashboard/employees/edit"
                  to={`/dashboard/employees/edit/personal-information/${employeeContent?.data?.employeeId}`}
                />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
