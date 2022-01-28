import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
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
  },
  inactive: {
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#878181',
    textDecoration: 'none',
  },
}));

export default function EmployeeLinks({ url, match }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { isLoading, employeeData } = useSelector(
    (state) => state?.employeeData,
  );
  const [employeeContent, setEmployeeContent] = useState({
    data: employeeData,
  });
  // console.log(pathname);
  return (
    <>
      <div>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li className={classes.listStyles}>
            <Link
              className={
                pathname.includes('/overview')
                  ? classes.active
                  : classes.inactive
              }
              to={`${url}/overview/${pathname.substr(-24)}`}>
              Overview
            </Link>
          </li>
          <li className={classes.listStyles}>
            <Link
              className={
                pathname.includes(`/salary-info`)
                  ? classes.active
                  : classes.inactive
              }
              to={`${url}/salary-info/${pathname.substr(-24)}`}>
              Salary Details
            </Link>
          </li>
          <li className={classes.listStyles}>
            <Link
              to={`${url}/files/${pathname.substr(-24)}`}
              className={
                pathname.includes(`/files`) ? classes.active : classes.inactive
              }>
              Employee Files
            </Link>
          </li>
          <li className={classes.listStyles}>
            <Link
              className={
                pathname.includes(`/status`) ? classes.active : classes.inactive
              }
              to={`${url}/status/${pathname.substr(-24)}`}>
              Employment Status
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
