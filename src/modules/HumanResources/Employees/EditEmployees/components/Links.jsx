import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

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

export default function EmployeeLinks({ url }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <>
      <div>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li className={classes.listStyles}>
            <Link
              className={
                pathname.includes('/personal-information')
                  ? classes.active
                  : classes.inactive
              }
              to={`${url}/personal-information/${pathname.substr(-24)}`}>
              Personal Information
            </Link>
          </li>
          <li className={classes.listStyles}>
            <Link
              className={
                pathname.includes(`/compensation`)
                  ? classes.active
                  : classes.inactive
              }
              to={`${url}/compensation/${pathname.substr(-24)}`}>
              Compensation
            </Link>
          </li>
          <li className={classes.listStyles}>
            <Link
              to={`${url}/bank/${pathname.substr(-24)}`}
              className={
                pathname.includes(`/bank`) ? classes.active : classes.inactive
              }>
              Bank Details
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
