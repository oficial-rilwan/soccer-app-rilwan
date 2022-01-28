import React from 'react';
import { lazy } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';
import { useState } from 'react';
import {
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Checkmark from 'lib/assets/images/Checkmark.svg';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { useEffect } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { LoaderComponent } from 'lib/components/Loaders/Loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import Loader from 'react-loaders';
import { useSelector } from 'react-redux';

const LeaveCard = lazy(() => import('./LeaveCard/LeaveCard'));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontWeight: 500,
    borderLeft: '55px solid #00DC7D',
    borderRadius: '10px',
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe2b',
  },
  dialogPaper: {
    width: '23rem',
    height: '22rem',
  },
  multiline: {
    fontFamily: 'Rubik',
  },
  actionApprove: {
    textTransform: 'none',
    fontFamily: 'Rubik',
    backgroundColor: '#1F53D7',
    borderRadius: '3px',
    color: '#fff',
  },
  actionReject: {
    width: '40%',
  },
  primaryBtn: {
    width: '40%',
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  checkmark: {
    position: 'relative',
    right: '27px',
    top: '3px',
  },
  checkmarkWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    right: '35px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
          fontWeight: 500,
          fontSize: '16.6787px',
          lineHeight: '20px',
        }}>
        {children}
      </Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}))(MuiDialogContent);

export default function Pending({ reload, setValues, values }) {
  const classes = useStyles();

  const [state, setState] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'left',
    employeeData: [],
    refresh: false,
    currentEmployeeId: '',
    disabled: false,
    rejectDisabled: false,
  });
  const { vertical, horizontal, open, message, approvedOn } = state;
  const [isLoading, setIsLoading] = useState(false);

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const userID = useSelector((state) => state?.auth?.user);

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  const handleAction = (id) => {
    setState({ ...state, disabled: true });
    authClient
      .put(
        `/api/v1/employee/leave/management/status?leaveId=${id}&leaveStatus=APPROVED`,
      )
      .then((res) => {
        if (res.status == 200) {
          setState({
            ...state,
            refresh: !state.refresh,
            message: 'Leave Approved',
            open: true,
            disabled: false,
          });
          setValues({ ...values, reload: !values.reload });
        }
      })
      .catch((e) => {
        setValues({ ...values, reload: !values.reload });
        setState({ ...state, disabled: false, refresh: !state.refresh });
        console.log(e);
      });
  };

  const [blur, setBlur] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState({
    id: '',
  });
  const [value, setValue] = useState({
    rejectMessage: '',
  });

  const handleRejectAction = () => {
    setState({ ...state, rejectDisabled: true });
    authClient
      .put(
        `/api/v1/employee/leave/management/status?leaveId=${state?.currentEmployeeId}&leaveStatus=REJECT`,
        value,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setState({
            ...state,
            refresh: !state.refresh,
            message: 'Leave Rejected',
            open: true,
          });
          setValues({ ...values, reload: !values.reload });
          setDialogOpen(false);
          setState({
            ...state,
            rejectDisabled: false,
          });
        }
      })
      .catch((e) => {
        setDialogOpen(false);
        setValues({ ...values, reload: !values.reload });
        setState({ ...state, rejectDisabled: false });
        console.log(e);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({ ...state, open: false, refresh: !state.refresh });
  };

  const handleDialogClose = (e) => {
    setDialogOpen(false);
    setBlur({
      ...blur,
      [user.id]: false,
    });
  };

  const handleDialogOpen = (id) => {
    setDialogOpen(true);
    setState({ ...state, currentEmployeeId: id });
  };

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/leave/management/fetch?page=1&limit=20&leaveStatus=PENDING&issuersId=${
          userID?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        setState({ ...state, employeeData: data?.data }), setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [reload]);

  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <section style={{ padding: '2rem 0' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            key={vertical + horizontal}>
            <SnackbarContent
              className={classes.root}
              message={
                <>
                  <div className={classes.checkmarkWrapper}>
                    <div className={classes.checkmark}>
                      <img src={Checkmark} alt="checkmark" />
                    </div>
                    {state?.message}
                  </div>
                </>
              }
            />
          </Snackbar>
          <Grid container spacing={4}>
            {state?.employeeData?.length > 0 ? (
              state?.employeeData?.map((item, i) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                  <Fade key={i}>
                    <LeaveCard
                      key={i}
                      {...item}
                      handleAction={handleAction}
                      handleRejectAction={handleRejectAction}
                      approvedOn={item.leaveStatus.approved}
                      blurCardId={blur}
                      handleDialogOpen={handleDialogOpen}
                      disabled={state?.disabled}
                    />
                  </Fade>
                </Grid>
              ))
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  margin: '45px',
                  fontStyle: 'italic',
                }}>
                <TypographyBold>
                  No Pending requests at the moment
                </TypographyBold>
              </div>
            )}
            <Dialog
              aria-labelledby="customized-dialog-title"
              open={dialogOpen}
              classes={{
                container: classes.dialogContainer,
                paper: classes.dialogPaper,
              }}
              disableBackdropClick>
              <DialogTitle
                id="customized-dialog-title"
                style={{
                  backgroundColor: '#ff5454',
                  color: '#fff',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                Reason for Rejection
              </DialogTitle>
              <DialogContent dividers>
                <div>
                  <TextField
                    multiline
                    rows={8}
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setValue({ ...value, rejectMessage: e.target.value })
                    }
                    InputProps={{
                      classes: {
                        inputMultiline: classes.multiline,
                      },
                    }}
                  />
                </div>
                <div className={classes.actionsWrapper}>
                  <PrimaryButton
                    className={classes.primaryBtn}
                    disabled={state?.rejectDisabled}
                    onClick={handleRejectAction}>
                    Send
                  </PrimaryButton>
                  <DefaultButton
                    onClick={handleDialogClose}
                    className={classes.actionReject}>
                    Cancel
                  </DefaultButton>
                </div>
              </DialogContent>
            </Dialog>
          </Grid>
        </section>
      )}
    </>
  );
}
