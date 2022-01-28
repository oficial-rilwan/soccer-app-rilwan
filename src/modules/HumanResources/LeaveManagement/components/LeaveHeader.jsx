import {
  ClickAwayListener,
  IconButton,
  Tooltip,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { ReactComponent as ToolTipIcon } from 'lib/assets/images/tooltip.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { Add } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  maxWidth: {
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
    backgroundColor: '#394452',
    fontFamily: 'Rubik',
    fontSize: 12,
    lineHeight: 1.5,
    padding: '.9rem',
    fontWeight: 'normal',
    color: '#fff',
    borderRadius: '11.8483px',
    boxShadow: '0px 1.8513px 5.92417px rgba(0, 0, 0, 0.25)',
  },
  tooltipArrow: {
    color: '#394452',
  },
  linkWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    color: '#828282',
  },
  active: {
    backgroundColor: '#EEF5FC',
    color: '#000',
  },
  link: {
    margin: '0 1.5rem 0 0',
  },
}));

const LeaveButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    backgroundColor: '#EEF5FC',
    borderRadius: '10px',
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EEF5FC',
      boxShadow: 'none',
    },
  },
})(Button);

const longText = `This page shows all Pending, Approved and Dismissed Leaves, you can use the labeled tabs to switch between the appropriate screens. You can accept or reject leave application by staff as well as view current employees on leave`;

export default function LeaveHeader({
  url,
  pathname,
  handleTooltipClose,
  handleTooltipOpen,
  handleClickOpen,
  tooltipOpen,
  reload,
}) {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [values, setValues] = useState({
    approvedLength: '',
    rejectedLength: '',
    pendingLength: '',
  });

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/leave/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        const approvedLength = data?.data?.filter(
          (item) => item.leaveStatus == 'APPROVED',
        );
        const pendingLength = data?.data?.filter(
          (item) => item.leaveStatus == 'PENDING',
        );

        const rejectedLength = data?.data?.filter(
          (item) => item.leaveStatus == 'REJECT',
        );
        setValues({
          ...values,
          pendingLength: pendingLength.length,
          approvedLength: approvedLength.length,
          rejectedLength: rejectedLength.length,
        });
      })
      .catch((e) => console.log(e));
  }, [reload]);

  return (
    <>
      <div className={classes.linkWrapper}>
        <div className={classes.link}>
          <Link
            to={`${url}/pending`}
            style={{
              textDecoration: 'none',
            }}>
            <LeaveButton
              variant="contained"
              disableElevation
              className={
                pathname.substring(16) == `/pending`
                  ? classes.active
                  : classes.inactiveTab
              }>
              {`Pending (${values?.pendingLength || 0})`}
            </LeaveButton>
          </Link>
        </div>
        <div className={classes.link}>
          <Link
            to={`${url}/approved`}
            style={{
              textDecoration: 'none',
            }}>
            <LeaveButton
              variant="contained"
              className={
                pathname.substring(16) == `/approved`
                  ? classes.active
                  : classes.inactiveTab
              }>
              {`Approved (${values?.approvedLength || 0})`}
            </LeaveButton>
          </Link>
        </div>
        <div className={classes.link}>
          <Link
            to={`${url}/rejected`}
            style={{
              textDecoration: 'none',
            }}>
            <LeaveButton
              variant="contained"
              className={
                pathname.substring(16) == `/rejected`
                  ? classes.active
                  : classes.inactiveTab
              }>
              {`Rejected (${values?.rejectedLength || 0})`}
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
        <div style={{ padding: matchesXs ? 0 : '0 10px' }}>
          <PrimaryButton endIcon={<Add />} onClick={handleClickOpen}>
            Add New
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}

LeaveHeader.propTypes = {
  url: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
