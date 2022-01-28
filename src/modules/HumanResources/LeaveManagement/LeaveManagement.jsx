import { lazy, useCallback, useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  useMediaQuery,
  TextField,
  Paper,
  Snackbar,
} from '@material-ui/core';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Search } from '@material-ui/icons';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import ReturnBtn from '../Employees/AddEmployees/components/ReturnBtn';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import Lottie from 'react-lottie';
import { DialogTypography } from 'modules/components/Typography/Typography';
import successAnimation from 'modules/animations/sucessful.json';
import { Suspense } from 'react';
import { LoaderComponent } from 'lib/components/Loaders/Loaders';
import LeaveHeader from './components/LeaveHeader';
const Approved = lazy(() => import('./components/ApprovedLeave'));
const RejectedLeave = lazy(() => import('./components/RejectedLeave'));
const Pending = lazy(() => import('./components/PendingLeave'));
const LeaveStatus = lazy(() => import('./components/LeaveStatus'));
import Popover from '@material-ui/core/Popover';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { debounce } from 'lodash';
import { authClient } from 'modules/authentication/requestClient';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.5),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '48rem',
    height: '40rem',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
  },
  section: {
    [theme.breakpoints.between(375, 566)]: {
      padding: '0 1.6rem',
    },
  },
  leaveType: {
    fontFamily: 'Rubik',
    fontSize: '17px',
    fontWeight: 'normal',
    margin: '0 2rem 0 0',
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 .5rem .5rem',
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '2.2rem 5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1.2rem 7rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

export default function LeaveManagement(props) {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [error, setError] = useState('');
  const matchesResponsive = useMediaQuery(theme.breakpoints.between(450, 600));
  const [snackOpen, setSnackOpen] = useState(false);

  const [values, setValues] = useState({
    data: {
      name: '',
      from: '',
      to: '',
      leaveType: '',
    },
    success: false,
    employeeId: '',
    reload: false,
  });

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setSuccess(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValues({
      ...values,
      data: {
        ...values.data,
        name: '',
        from: '',
        to: '',
        leaveReason: '',
        leaveType: '',
      },
    });
  };
  const [tooltipOpen, setToolTipOpen] = useState(false);

  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };

  const handleTooltipOpen = () => {
    setToolTipOpen(true);
  };

  const [searchData, setSearchData] = useState([]);

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  const routes = [
    {
      title: 'Pending Leave',
      path: `${url}/pending`,
      component: Pending,
    },
    {
      title: 'Approved Leave',
      path: `${url}/approved`,
      component: Approved,
    },
    {
      title: 'Rejected Leave',
      path: `${url}/rejected`,
      component: RejectedLeave,
    },
    {
      title: 'Leave Status',
      path: `${url}/status/:id`,
      component: LeaveStatus,
    },
  ];

  const [success, setSuccess] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    const handler =
      values?.data?.name &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${
              values?.data?.name
            }&createdBy=${
              user?.subAdminId || googleUser?.userId || authUserId
            }`,
          )
          .then(({ data }) => {
            console.log({ data });
            setSearchData(data?.data);
          });
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.data?.name]);

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  const handleBtnClick = () => {
    authClient
      .post(
        `/api/v1/employee/leave/management/create?employeeId=${values?.employeeId}`,
        values?.data,
      )
      .then((response) => {
        if (response.status == 201 || 200) {
          setValues({ ...values, success: true, reload: !values.reload });
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setSnackOpen(true);
          setError(e.response.data.error);
        }
        console.error(e);
      });
  };

  const handleDateFrom = (val) => {
    setValues({ ...values, data: { ...values.data, from: val } });
  };

  const handleDateTo = (val) => {
    setValues({ ...values, data: { ...values.data, to: val } });
  };

  let minToDate = new Date(values.data.from);
  minToDate.setDate(minToDate.getDate() + 1);

  const classes = useStyles();
  return (
    <>
      <HeaderComp path={path} url={url} pathname={pathname} />
      <section className={classes.section}>
        {pathname.includes('status') ? (
          <ReturnBtn />
        ) : (
          <LeaveHeader
            url={url}
            pathname={pathname}
            handleTooltipClose={handleTooltipClose}
            handleTooltipOpen={handleTooltipOpen}
            handleClickOpen={handleClickOpen}
            tooltipOpen={tooltipOpen}
            reload={values.reload}
          />
        )}
        <div>
          <Suspense fallback={<LoaderComponent />}>
            <Switch>
              {routes.map(({ component: Pending, ...route }, i) => (
                <Route
                  key={i}
                  {...route}
                  render={(props) => (
                    <Pending
                      reload={values?.reload}
                      setValues={setValues}
                      values={values}
                      {...props}
                    />
                  )}
                />
              ))}
              <Redirect from="/dashboard/leave" to="/dashboard/leave/pending" />
            </Switch>
          </Suspense>
        </div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          disableBackdropClick
          classes={{
            paper: classes.dialogPaper,
          }}
          open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Leave Application
          </DialogTitle>
          <DialogContent dividers>
            {values?.success ? (
              <div className={classes.dialogSuccess}>
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={300}
                  isClickToPauseDisabled={true}
                />
                <DialogTypography>Successful</DialogTypography>
              </div>
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: 'Rubik',
                      fontSize: '15px',
                      lineHeight: '17px',
                      fontWeight: 500,
                      marginTop: '.7rem',
                    }}>
                    Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <div>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={searchData}
                      getOptionLabel={(option) =>
                        `${option?.firstName} ${option?.lastName}`
                      }
                      onChange={(e, v) =>
                        setValues({
                          ...values,
                          employeeId: v[0]?.employeeId,
                          data: {
                            ...values.data,
                            name: `${v[0]?.firstName} ${v[0]?.lastName}`,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          onChange={handleChange('name')}
                          {...params}
                          variant="outlined"
                          size="small"
                          label=""
                          placeholder="Search employees"
                        />
                      )}
                    />
                  </div>

                  <div
                    style={{
                      margin: '1rem 0',
                      display: matchesResponsive ? 'flex' : 'block',
                      alignItems: 'center',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: matchesXs ? 'flex-start' : 'center',
                        // gap: matchesXs ? '.5rem' : '2.5rem',
                        flexDirection: matchesXs ? 'column' : 'row',
                      }}>
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '17px',
                          fontWeight: 'normal',
                        }}>
                        From:
                      </Typography>
                      <HireDateInput
                        style={{
                          marginLeft: matchesXs ? 0 : '50px',
                          marginRight: matchesResponsive ? '27px' : 0,
                        }}
                        disablePast
                        handleDateChange={handleDateFrom}
                        value={values?.data?.from}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: matchesXs ? 'flex-start' : 'center',
                        // gap: matchesXs ? '.5rem' : '4rem',
                        flexDirection: matchesXs ? 'column' : 'row',
                        paddingTop: matchesResponsive ? 0 : '.5rem',
                      }}>
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '17px',
                          fontWeight: 'normal',
                        }}>
                        To:
                      </Typography>
                      <HireDateInput
                        style={{ marginLeft: matchesXs ? 0 : '71px' }}
                        value={values?.data?.to}
                        handleDateChange={handleDateTo}
                        minDate={minToDate}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: matchesXs ? 'flex-start' : 'center',
                      flexDirection: matchesXs ? 'column' : 'row',
                    }}>
                    <Typography variant="h4" className={classes.leaveType}>
                      Leave Type:
                    </Typography>
                    <SelectComp
                      label="Leave type"
                      style={{
                        width: matchesXs ? '100%' : '60%',
                        height: '2.5rem',
                      }}
                      value={values?.data?.leaveType}
                      onChange={handleChange('leaveType')}
                      menuItem={[
                        {
                          label: 'Bereavement',
                          value: 'Bereavement',
                        },
                        {
                          label: 'Casual',
                          value: 'Casual',
                        },
                        {
                          label: 'Compensatory',
                          value: 'Compensatory',
                        },
                        {
                          label: 'Maternity',
                          value: 'Maternity',
                        },
                        {
                          label: 'Paternity',
                          value: 'Paternity',
                        },
                        {
                          label: 'Public holiday',
                          value: 'Public holiday',
                        },
                        {
                          label: 'Religious',
                          vaddalue: 'Religious',
                        },
                        {
                          label: 'Sick',
                          value: 'Sick',
                        },
                        {
                          label: 'Others',
                          value: 'Other',
                        },
                      ]}
                    />
                  </div>
                  <div style={{ padding: '1rem 0' }}>
                    <TextField
                      multiline
                      rows={8}
                      placeholder="Type reason here"
                      style={{
                        fontStyle: 'italic',
                      }}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange('leaveReason')}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      gap: matchesXs ? '1rem' : 0,
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        backgroundColor: '#1F53D7',
                        color: '#fff',
                        textTransform: 'none',
                        width: matchesXs ? '100%' : '40%',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                      }}
                      onClick={handleBtnClick}>
                      Apply Leave
                    </Button>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        border: '1px solid #00000033',
                        backgroundColor: 'transparent',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        width: matchesXs ? '100%' : '40%',
                        boxShadow: 'none',
                        marginTop: matchesXs && '1rem',
                      }}
                      onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
        <Snackbar
          open={snackOpen}
          autoHideDuration={5000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </section>
    </>
  );
}
