import { lazy, useEffect, useState } from 'react';
import {
  InputAdornment,
  useTheme,
  useMediaQuery,
  withStyles,
  makeStyles,
  IconButton,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import { Search } from '@material-ui/icons';
import {
  useLocation,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ReturnBtn from '../Employees/AddEmployees/components/ReturnBtn';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import {
  SuspendButton,
  CancelButton,
} from './components/ButtonActions/Actions';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { useSelector } from 'react-redux';
import SuspensionHeader from './components/SuspensionHeaader';
import Autocomplete from '@material-ui/lab/Autocomplete';
const Ongoing = lazy(() => import('./components/Ongoing'));
const Reinstated = lazy(() => import('./components/Reinstated'));
const ViewSuspension = lazy(() => import('./components/ViewSuspension'));

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
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '43rem',
    height: '43rem',
    maxWidth: 'inherit',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
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
    gridColumn: '2/8',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  linkWrapper: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
  },
}));

const longText = `This page shows all Open and Reinstated employees on suspension, you can use the labeled tabs to switch between the appropriate screens.`;

export default function Suspension() {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [tooltipOpen, setToolTipOpen] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };
  const handleTooltipOpen = () => {
    setToolTipOpen(true);
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
      suspensionData: {
        employeeToSuspendId: '',
        employeeToSuspendName: '',
        from: '',
        to: '',
        suspensionFor: '',
      },
    });
  };

  const [values, setValues] = useState({
    data: [],
    suspensionData: {
      employeeToSuspendName: '',
      employeeToSuspendId: '',
      from: '',
      to: '',
      suspensionFor: '',
      comment: '',
    },
    ongoingLength: '',
    reinstatedLength: '',
    reload: false,
  });

  const profile = useSelector((state) => state?.loginStats?.user?.profile);

  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const [searchTerm, setSearchTerm] = useState('');
  const [reload, setReload] = useState(false);

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({
      ...values,
      suspensionData: { ...values.suspensionData, [name]: value },
    });
  };

  const handleDateChange = (name) => (value) => {
    setValues({
      ...values,
      suspensionData: {
        ...values.suspensionData,
        [name]: value,
      },
    });
  };
  let minDate = new Date(values?.suspensionData?.from);
  minDate.setDate(minDate.getDate() + 1);

  const routes = [
    {
      title: 'Ongoing Suspension',
      path: `${url}/ongoing`,
      component: Ongoing,
    },
    {
      title: 'Reinstated Suspension',
      path: `${url}/reinstated`,
      component: Reinstated,
    },
    {
      title: 'View Suspension',
      path: `${url}/view/:id`,
      component: ViewSuspension,
    },
  ];
  const handleListItem = (id, firstName, lastName) => {
    setValues({
      ...values,
      suspensionData: {
        ...values.suspensionData,
        employeeToSuspendName: `${firstName} ${lastName}`,
        employeeToSuspendId: id,
      },
    });
  };

  const handleSuspend = () => {
    authClient
      .post(
        `/api/v1/employee/suspension/management/create?employeeId=${values?.suspensionData?.employeeToSuspendId}`,
        values?.suspensionData,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setSuccess(true);
          setReload(!reload);
          setValues({ ...values });
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const handler =
      values?.suspensionData?.employeeToSuspendName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${values?.suspensionData?.employeeToSuspendName}`,
          )
          .then(({ data }) => {
            setSearchData(data?.data);
          })
          .catch((e) => console.log(e));
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.suspensionData?.employeeToSuspendName]);

  return (
    <>
      <HeaderComp url="/dashboard/suspension" />
      {pathname.includes('view') ? (
        <ReturnBtn location="/dashboard/suspension" />
      ) : (
        <SuspensionHeader
          handleTooltipOpen={handleTooltipOpen}
          handleTooltipClose={handleTooltipClose}
          longText={longText}
          handleClickOpen={handleClickOpen}
          url={url}
          tooltipOpen={tooltipOpen}
          pathname={pathname}
          reload={reload}
        />
      )}
      <div>
        <Switch>
          {routes?.map(({ component: Ongoing, ...route }, i) => (
            <Route
              key={i}
              {...route}
              render={(props) => (
                <Ongoing
                  searchTerm={searchTerm}
                  values={values}
                  setValues={setValues}
                  currentLength={values?.ongoingLength}
                  reload={reload}
                  setReload={setReload}
                  {...props}
                />
              )}
            />
          ))}
          <Redirect
            from="/dashboard/suspension"
            to="/dashboard/suspension/ongoing"
          />
        </Switch>
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
          Suspension
        </DialogTitle>
        <DialogContent dividers>
          {success ? (
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Successful</DialogTypography>
            </div>
          ) : (
            <section>
              <div
                style={{
                  display: matchesXs ? 'block' : 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '1rem 2rem',
                }}>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchData}
                    getOptionLabel={(option) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    onChange={(e, v) => {
                      setValues({
                        ...values,
                        suspensionData: {
                          ...values.suspensionData,
                          employeeToSuspendName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                          employeeToSuspendId: v[0]?.employeeId,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('employeeToSuspendName')}
                        {...params}
                        variant="outlined"
                        size="small"
                        label=""
                        placeholder="Search employees"
                      />
                    )}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Issuer's Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <Typography
                    variant="h4"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                      margin: '.5rem 0',
                    }}>
                    {`${
                      profile?.firstName ||
                      user?.firstName ||
                      googleUser?.firstName
                    } ${
                      profile?.lastName ||
                      user?.lastName ||
                      googleUser?.lastName
                    }`}
                  </Typography>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Suspension For:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <SelectComp
                    label="Reason"
                    value={values?.suspensionData?.suspensionFor}
                    menuItem={[
                      { label: 'Fraud', value: 'Fraud' },
                      { label: 'Assault', value: 'Assault' },
                      { label: 'Punctuality', value: 'Punctuality' },
                      { label: 'Theft', value: 'Theft' },
                      { label: 'Others', value: 'Others' },
                    ]}
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '15rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    onChange={handleChange('suspensionFor')}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Date:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: '2/8',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: responsive ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <div style={{ width: '100%', marginRight: '1rem' }}>
                    <MaterialDatePicker
                      notched
                      handleDateChange={handleDateChange('from')}
                      value={values.suspensionData.from}
                      size="small"
                    />
                    <em
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: '#404040',
                      }}>
                      Start date
                    </em>
                  </div>
                  <div style={{ width: '100%' }}>
                    <MaterialDatePicker
                      notched
                      handleDateChange={handleDateChange('to')}
                      value={values.suspensionData.to}
                      minDate={minDate}
                      size="small"
                    />
                    <em
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: '#404040',
                      }}>
                      End date
                    </em>
                  </div>
                </div>
                <div className={classes.halfGrid}>
                  <InputForEmployeePage
                    placeholder="Additional comments"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={8}
                    onChange={handleChange('comment')}
                  />
                </div>
                <div className={classes.halfGrid}>
                  <div className={classes.actionsWrapper}>
                    <SuspendButton
                      onClick={handleSuspend}
                      style={{ margin: matchesXs ? '0' : '0 .6rem 0 0' }}>
                      Suspend
                    </SuspendButton>
                    <CancelButton
                      onClick={handleClose}
                      style={{
                        margin: matchesXs ? '1rem 0 1rem' : '0 0 0 .6rem',
                      }}>
                      Cancel
                    </CancelButton>
                  </div>
                </div>
              </div>
            </section>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
