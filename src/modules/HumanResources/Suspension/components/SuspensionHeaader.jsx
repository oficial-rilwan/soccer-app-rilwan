import {
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  InputAdornment,
  useMediaQuery,
  withStyles,
  Tooltip,
} from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { Link } from 'react-router-dom';
import { ReactComponent as ToolTipIcon } from 'lib/assets/images/tooltip.svg';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector } from 'react-redux';

const LeaveButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: '10px',
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EEF5FC',
      boxShadow: 'none',
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    color: '#828282',
  },
  active: {
    backgroundColor: '#EEF5FC',
    color: '#000',
  },
  maxWidth: {
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
    backgroundColor: '#394452',
    fontFamily: 'Rubik',
    fontSize: 12,
    padding: '.9rem',
    fontWeight: 'normal',
    color: '#fff',
    borderRadius: '11.8483px',
    boxShadow: '0px 1.8513px 5.92417px rgba(0, 0, 0, 0.25)',
  },
  tooltipArrow: {
    color: '#394452',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

export default function SuspensionHeader({
  handleTooltipOpen,
  longText,
  handleTooltipClose,
  handleClickOpen,
  url,
  pathname,
  tooltipOpen,
  reload,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState({
    ongoingLength: '',
    reinstatedLength: '',
  });

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/suspension/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        let ongoingLength = data?.data?.filter((item) => {
          if (item?.suspensionStatus == 'ONGOING') {
            return item;
          }
        });
        let reinstatedLength = data?.data?.filter((item) => {
          if (item?.suspensionStatus == 'REINSTATED') {
            return item;
          }
        });
        setValues({
          ...values,
          ongoingLength: ongoingLength?.length,
          reinstatedLength: reinstatedLength?.length,
        });
      })
      .catch((e) => console.log(e));
  }, [reload]);

  return (
    <>
      <div className={classes.titleWrapper}>
        <InputForEmployeePage
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            fontStyle: 'italic',
            backgroundColor: '#F5F9F7',
            padding: 0,
            width: matchesXs ? '100%' : '24rem',
          }}
          placeholder="Search Employees"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: '#828282' }} />
              </InputAdornment>
            ),
          }}
        />
        <PrimaryButton endIcon={<Add />} onClick={handleClickOpen}>
          Add New
        </PrimaryButton>
      </div>
      <div className={classes.linkWrapper}>
        <div>
          <Link to={`${url}/ongoing`} style={{ textDecoration: 'none' }}>
            <LeaveButton
              variant="contained"
              disableElevation
              className={
                pathname.substring(21) == `/ongoing`
                  ? classes.active
                  : classes.inactiveTab
              }>
              Ongoing ({values?.ongoingLength || 0})
            </LeaveButton>
          </Link>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <Link to={`${url}/reinstated`} style={{ textDecoration: 'none' }}>
            <LeaveButton
              variant="contained"
              disableElevation
              className={
                pathname.substring(21) == `/reinstated`
                  ? classes.active
                  : classes.inactiveTab
              }>
              Reinstated ({values?.reinstatedLength || 0})
            </LeaveButton>
          </Link>
        </div>
        <div style={matchesSm ? { flex: 0 } : { flex: 1 }}>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              title={longText}
              PopperProps={{
                disablePortal: true,
              }}
              classes={{
                tooltip: classes.maxWidth,
                arrow: classes.tooltipArrow,
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 400 }}
              onClose={handleTooltipClose}
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              placement="right"
              arrow={matchesXs ? false : true}
              disableTouchListener>
              <IconButton onClick={handleTooltipOpen}>
                <ToolTipIcon />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </div>
      </div>
    </>
  );
}
