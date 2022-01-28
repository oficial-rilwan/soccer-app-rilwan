import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import { getHeader, getSidebarTrigger } from '@mui-treasury/layout';
import {
  Typography,
  IconButton,
  Badge,
  makeStyles,
  Button,
} from '@material-ui/core';
import { SettingsOutlined, NotificationsOutlined } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import authActions from 'redux/actions/authActions';
import { useDispatch } from 'react-redux';

const { logout } = authActions;

const useStyles = makeStyles((theme) => ({
  heading1: {
    fontFamily: 'Rubik, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '28px',
    color: '#000000',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  subHead: {
    fontFamily: 'Rubik, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    paddingTop: '.2rem',
    lineHeight: '19px',
    color: '#000000',
    [theme.breakpoints.down('sm')]: {
      //   fontSize: '13px',
      display: 'none',
    },
  },
  list_1: {
    // padding: '3rem',
    margin: '.4rem',
  },
  iconLabel: {
    backgroundColor: '#EEF5FC',
    padding: '.2rem',
  },
  popOver: {
    boxShadow:
      '0px 0px 0px rgba(89, 88, 97, 0.14), 0px 6px 13px rgba(97, 97, 97, 0.14)',
    borderRadius: '15px',
    width: '15rem',
    // height: '15rem',
    cursor: 'pointer',
  },
  logout: {
    color: '#EB5757',
    margin: '.4rem',
  },
}));

const SidebarTrigger = getSidebarTrigger(styled);
const Header = getHeader(styled);

export default function HeaderComp({ url }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // console.log({ url });
  const pathMap = {
    '/dashboard': {
      heading: 'Dashboard',
      subHead: 'Welcome! You are exploring your financial dashboard',
    },
    '/invoice': {
      heading: 'Invoice',
      subHead: 'You can manage all your invoices here.',
    },
    '/invoice/new': {
      heading: 'New Invoice',
      subHead: 'You can manage all your invoice information here.',
    },
    '/customers': {
      heading: 'Customers',
      subHead: 'You can manage all your Customers information here.',
    },
    '/inflow': {
      heading: 'Inflow',
      subHead: '',
    },
    '/outflow': {
      heading: 'Outflow',
      subHead: '',
    },
    '/outflow/form': {
      heading: 'Outflow',
      subHead: '',
    },
    '/quotation': {
      heading: 'Quotation',
      subHead: 'you can manage all your quotation information here.',
    },
    '/quotation/view': {
      heading: 'View Quote',
    },
    '/transactions': {
      heading: 'Transactions',
      subHead: 'you can manage all your expenses here.',
    },
    '/charts-of-accounts': {
      heading: 'Charts of Accounts',
      subHead: 'Get insight to your various accounts here',
    },
    '/employees': {
      heading: 'Employee',
      subHead: 'You can manage all your employees information here.',
    },
    '/leave': {
      heading: 'Leave Management',
      subHead: 'You can manage employee Leave applications from here.',
    },
    '/promotions': {
      heading: 'Promotion',
      subHead: 'You can manage all promoted employees here.',
    },
    '/payroll': {
      heading: 'Payroll Management',
      subHead: 'Manage all employees paid here.',
    },
    '/payslip': {
      heading: 'Payslip Management',
      subHead: 'You can manage all your employees payslips here.',
    },
    '/suspension': {
      heading: 'Suspension Management',
      subHead: 'Suspended Employees are managed here.',
    },
    '/transfer': {
      heading: 'Transfer Management',
      subHead: 'Transfered Employees can be managed from here.',
    },
    '/performance': {
      heading: 'Performance Management',
      subHead: 'You can access survey sent out for evaluation from here.',
    },
    '/termination': {
      heading: 'Termination Management',
      subHead: 'Employees that have been terminated can be accessed here',
    },
    '/query': {
      heading: 'Query Management',
      subHead: 'You can manage all queried employees from here.',
    },
    '/vendors': {
      heading: 'Vendors',
      subHead: 'You can manage all your vendors here.',
    },
    '/budget': {
      heading: 'Budget',
      subHead: 'Use this to stay on top of expenses to avoid overspend.',
    },
    '/product-and-services': {
      heading: 'Product and Services',
    },
    '/memo': {
      heading: 'Memo',
      subHead: 'Manage all sent Memo here',
    },
    '/memo/add': {
      heading: 'Memo',
      subHead: 'Manage all sent Memo here',
    },
    '/memo/view': {
      heading: 'Memo',
      subHead: 'View Memo',
    },
    '/fixed-assets': {
      heading: 'Fixed Assets',
      subHead: 'you can manage all your expenses here.',
    },
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const urlArr = url.split('/');
  const urlPath =
    urlArr.length < 4 ? '/' + urlArr[2] : '/' + urlArr[2] + '/' + urlArr[3];
  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = () => {
    dispatch(logout);
  };

  return (
    <Header
      style={{
        backgroundColor: '#fff',
        height: '4.5rem',
        margin: 0,
        width: '100%',
        marginBottom: '1rem',
      }}>
      <Toolbar style={{ justifyContent: 'space-between', padding: '0' }}>
        <SidebarTrigger sidebarId="unique_id" />
        <div style={{ flex: 1 }}>
          <Typography variant="h5" className={classes.heading1}>
            {pathMap[urlPath].heading}
          </Typography>
          <Typography component="p" className={classes.subHead}>
            {pathMap[urlPath].subHead}
          </Typography>
        </div>
        <div>
          <IconButton classes={{ label: classes.iconLabel }}>
            <Badge variant={'dot'} color="secondary">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <IconButton
            classes={{ label: classes.iconLabel }}
            onClick={handlePopover}>
            <Badge variant="standard" color="secondary">
              <SettingsOutlined />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{
              paper: classes.popOver,
            }}>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}>
              <li>
                <Button
                  disableElevation
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}>
                  <TypographyH5
                    style={{ textTransform: 'none' }}
                    className={classes.list_1}>
                    Settings
                  </TypographyH5>
                </Button>
              </li>
              <li>
                <Button
                  disableElevation
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}>
                  <TypographyH5
                    style={{ textTransform: 'none' }}
                    className={classes.list_1}>
                    Your Account
                  </TypographyH5>
                </Button>
              </li>
              <li>
                <Button
                  disableElevation
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}>
                  <TypographyH5
                    style={{ textTransform: 'none' }}
                    className={classes.list_1}>
                    Billings
                  </TypographyH5>
                </Button>
              </li>
              <li>
                <Button
                  disableElevation
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}>
                  <TypographyH5
                    style={{ textTransform: 'none' }}
                    className={classes.list_1}>
                    Help center
                  </TypographyH5>
                </Button>
              </li>
              <li>
                <Button
                  disableElevation
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}
                  onClick={handleLogout}>
                  <TypographyH5
                    style={{ textTransform: 'none' }}
                    className={classes.logout}>
                    Logout
                  </TypographyH5>
                </Button>
              </li>
            </ul>
          </Popover>
        </div>
      </Toolbar>
    </Header>
  );
}
