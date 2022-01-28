import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import Questions from './components/Questions';
import Configurations from './components/Configuration';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: 'Rubik,sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
  },
  listStyles: {
    padding: '1.2rem 0 .5rem',
  },
  active: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#2F49D0',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  inactive: {
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#878181',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '2rem',
    borderRadius: '5px',
    marginBottom: '2rem',
  },
}));
export default function PerformanceSurvey() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const routes = [
    {
      title: 'Performance Survey Questions',
      path: `${url}/questions`,
      component: Questions,
    },
    {
      title: 'Performance Configurations',
      path: `${url}/configuration`,
      component: Configurations,
    },
  ];

  const [employeeRecord, setEmployeeRecord] = useState([]);

  const setProgress = (data) => {
    setEmployeeRecord(data);
    employeeRecord && history.push(`${url}/questions`);
  };

  return (
    <>
      <HeaderComp url="/dashboard/performance" />
      <ReturnBtn location="/dashboard/performance-evaluation" />
      <div style={{ paddingTop: '2rem' }}>
        <Grid container>
          <Grid item xs={12} md={2}>
            <div>
              <Typography variant="h3" className={classes.heading}>
                Create Survey
              </Typography>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li className={classes.listStyles}>
                  <Link
                    className={
                      pathname.includes('/configuration')
                        ? classes.active
                        : classes.inactive
                    }
                    to={`${url}/configuration`}>
                    Configuration
                  </Link>
                </li>
                <li className={classes.listStyles}>
                  <span
                    className={
                      pathname.includes('/questions')
                        ? classes.active
                        : classes.inactive
                    }
                    onClick={
                      employeeRecord.length > 0 &&
                      history.push(`${url}/questions`)
                    }>
                    Questions
                  </span>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={10}>
            <Switch>
              {routes.map(({ component: Component, ...route }, i) => (
                <Route
                  key={i}
                  {...route}
                  render={(props) => (
                    <Component
                      setProgress={setProgress}
                      employeeRecord={employeeRecord}
                      {...props}
                    />
                  )}
                />
              ))}
              <Redirect
                from="/dashboard/performance-evaluation/survey"
                to="/dashboard/performance-evaluation/survey/configuration"
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
