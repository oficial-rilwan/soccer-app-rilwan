import { lazy, useState } from 'react';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { KeyboardArrowDown } from '@material-ui/icons';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LinearProgress, useMediaQuery } from '@material-ui/core';
import { TypographyBold } from 'modules/components/Typography/Typography';
import {
  useHistory,
  useLocation,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ReturnBtn from '../Employees/AddEmployees/components/ReturnBtn';
const Terminate = lazy(() => import('./components/Terminate'));
const Retirement = lazy(() => import('./components/Retirement'));
const ViewRetirement = lazy(() => import('./components/ViewRetirement'));
const ViewTerminations = lazy(() => import('./components/ViewTermination'));
import TerminationDialog from './components/TerminationDialog';
import RetirementDialog from './components/RetirementDialog';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dropdownButton: {
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  terminateLinearBar: {
    width: '7rem',
    transform: 'translateX(0%) !important',
    borderRadius: 5,
  },
  retirementLinearBar: {
    width: '10rem',
    transform: 'translateX(100%) !important',
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      width: '10rem',
      transform: 'translateX(100%) !important',
    },
  },
  linearProgress: {
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
  },
  retirement: {
    fontFamily: 'Rubik',
    fontSize: 15,
    borderRadius: '7px 7px 0 0',
    backgroundColor: '#AAA8FF',
    '&:hover': {
      backgroundColor: '#AAA8FF',
    },
  },
  typography: {
    padding: '.5rem 0',
    cursor: 'pointer',
  },
  tabsWrapper: {
    margin: '1rem 0',
  },
  tabs: {
    display: 'flex',
    gap: '3rem',
  },
  listStyles: {
    paddingBottom: '0px',
    height: '4.75rem',
    overflowY: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: '6.5rem',
    },
  },
  menuStyles: {
    boxShadow:
      '6.96262px 16.5362px 18.2769px 0.870327px rgba(44, 43, 74, 0.29)',
  },
  menuItem: {
    fontFamily: 'Rubik',
    fontSize: 15,
    borderRadius: '5px 5px 5px',
    '&:hover': {
      backgroundColor: '#AAA8FF',
    },
  },
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  halfGrid: {
    gridColumn: '2/10',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  dialogPaper: {
    width: '39rem',
    height: '40rem',
    maxWidth: 'inherit',
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  dialogSuccess: {
    margin: '5rem 0 0',
  },
}));

export default function TerminatioManagement() {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reload, handleReload] = useState(false);
  const theme = useTheme();

  const routes = [
    {
      title: 'Termination management',
      path: `${url}/terminate`,
      component: Terminate,
      exact: true,
    },
    {
      title: 'Retirement management',
      path: `${url}/retirement`,
      component: Retirement,
      exact: true,
    },
    {
      title: 'Retirement management',
      path: `${url}/retirement/view/:id`,
      component: ViewRetirement,
    },
    {
      title: 'Termination management',
      path: `${url}/terminate/view/:id`,
      component: ViewTerminations,
    },
  ];

  const [openRetire, setOpenRetire] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setSuccess(false);
    setDialogOpen(true);
  };

  const handleBranchOpen = () => {
    setAnchorEl(null);
  };

  const handleRetireOpen = () => {
    setAnchorEl(null);
    setSuccess(false);
    setOpenRetire(true);
  };

  return (
    <>
      <HeaderComp url="/dashboard/termination" />
      {pathname.includes('/retirement/view') ? (
        <ReturnBtn location="/dashboard/termination/retirement" />
      ) : pathname.includes('/terminate/view') ? (
        <ReturnBtn location="/dashboard/termination/terminate" />
      ) : (
        <>
          <div className={classes.buttonWrapper}>
            <PrimaryButton
              variant="contained"
              endIcon={<KeyboardArrowDown />}
              className={classes.dropdownButton}
              onClick={handleClick}>
              Add New
            </PrimaryButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              style={{ marginTop: '2.8rem' }}
              className={classes.menuStyles}
              PopoverClasses={{
                paper: classes.popOverPaper,
              }}
              classes={{
                list: classes.listStyles,
              }}
              open={Boolean(anchorEl)}
              onClose={handleAnchorClose}>
              <MenuItem
                style={{ fontFamily: 'Rubik', fontSize: 15 }}
                className={classes.menuItem}
                onClick={handleClickOpen}>
                Termination
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleRetireOpen}>
                Retirement
              </MenuItem>
            </Menu>
          </div>
          <div className={classes.tabsWrapper}>
            <div className={classes.tabs}>
              <TypographyBold
                className={classes.typography}
                style={{
                  color: pathname.includes('/terminate') ? '#000' : '#828282',
                }}
                onClick={() =>
                  history.push('/dashboard/termination/terminate')
                }>
                Termination
              </TypographyBold>
              <TypographyBold
                className={classes.typography}
                style={{
                  color: pathname.includes('/retirement') ? '#000' : '#828282',
                  marginLeft: '3rem',
                }}
                onClick={() =>
                  history.push('/dashboard/termination/retirement')
                }>
                Retirement
              </TypographyBold>
            </div>
            <LinearProgress
              variant="determinate"
              value={10}
              classes={{
                bar: pathname.includes('/retirement')
                  ? classes.retirementLinearBar
                  : classes.terminateLinearBar,
              }}
              className={classes.linearProgress}
            />
          </div>
        </>
      )}
      <Switch>
        {routes.map(({ component: Component, ...route }, i) => (
          <Route
            key={i}
            {...route}
            render={(props) => <Component reload={reload} {...props} />}
          />
        ))}
        <Redirect
          from="/dashboard/termination"
          to="/dashboard/termination/terminate"
        />
      </Switch>
      <TerminationDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        classes={classes}
        setSuccess={setSuccess}
        success={success}
        handleReload={handleReload}
      />
      <RetirementDialog
        setDialogOpen={setOpenRetire}
        dialogOpen={openRetire}
        classes={classes}
        setSuccess={setSuccess}
        success={success}
        handleReload={handleReload}
      />
    </>
  );
}
