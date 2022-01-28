import {
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  InputAdornment,
  Tooltip,
  useMediaQuery,
  Dialog,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Search, Add } from '@material-ui/icons';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import { ReactComponent as ToolTipIcon } from 'lib/assets/images/tooltip.svg';
import { useEffect, useState } from 'react';
import ReturnBtn from '../Employees/AddEmployees/components/ReturnBtn';
import Pending from './components/Pending.jsx';
import Closed from './components/Closed';
import ViewQuery from './components/ViewQuery';
import Lottie from 'react-lottie';
import successAnimation from 'modules/animations/sucessful.json';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { CancelButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import { SuspendButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import CloseIcon from '@material-ui/icons/Close';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import queryActions from 'redux/actions/queryActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';

const useStyles = makeStyles((theme) => ({
  inactiveTab: {
    backgroundColor: '#fff',
    color: '#828282',
  },
  active: {
    backgroundColor: '#EEF5FC',
    color: '#000',
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
  retirement: {
    fontFamily: 'Rubik',
    fontSize: 15,
    borderRadius: '7px 7px 0 0',
    backgroundColor: '#AAA8FF',
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

const longText = `This page shows all Pending and closed query, you can use the labeled 
tabs to switch between the appropriate screens. You can view current employees on query `;

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

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
    padding: '1rem 4rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

export default function QueryManagement() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);

  const routes = [
    {
      title: 'Pending Query',
      path: `${url}/pending`,
      component: Pending,
    },
    {
      title: 'Closed Query',
      path: `${url}/closed`,
      component: Closed,
    },
    {
      title: 'View Query',
      path: `${url}/view/:id`,
      component: ViewQuery,
    },
  ];

  const [success, setSuccess] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [tooltipOpen, setToolTipOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reload, handleReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };
  const handleTooltipOpen = () => {
    setToolTipOpen(true);
  };

  const handleClickOpen = () => {
    setSuccess(false);
    setDialogOpen(true);
  };

  const [values, setValues] = useState({
    data: {
      employeeToqueryId: '',
      employeeToqueryName: '',
      queryFor: '',
      queryDate: '',
      comment: '',
    },
  });

  const handleClose = () => {
    setDialogOpen(false);
    setValues({
      ...values,
      data: {
        ...values?.data,
        employeeToqueryId: '',
        employeeToqueryName: '',
        queryFor: '',
        queryDate: '',
        comment: '',
      },
    });
  };

  const handleListItem = (id, firstName, lastName) => {
    setValues({
      ...values,
      data: {
        ...values.data,
        employeeToqueryName: `${firstName} ${lastName}`,
        employeeToqueryId: id,
      },
    });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values?.data, [name]: value } });
  };

  const handleQueryDate = (value) => {
    setValues({ ...values, data: { ...values.data, queryDate: value } });
  };

  const handleQuery = () => {
    authClient
      .post(
        `/api/v1/employee/query/management/create?employeeId=${values?.data?.employeeToqueryId}`,
        values?.data,
      )
      .then((res) => {
        if (res.status === 200 || 201) {
          setSuccess(true);
          handleReload(true);
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    const handler =
      values?.data?.employeeToqueryName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${values?.data?.employeeToqueryName}`,
          )
          .then(({ data }) => {
            console.log(data?.data)
            setSearchData(data?.data);
          });
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.data?.employeeToqueryName]);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/query/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        let pendingLength = data?.data?.filter((item) => {
          if (item?.queryStatus == 'PENDING') {
            return item;
          }
        });
        let closedLength = data?.data?.filter((item) => {
          if (item?.queryStatus == 'CLOSED') {
            return item;
          }
        });
        setValues({
          ...values,
          pendingLength: pendingLength?.length,
          closedLength: closedLength?.length,
        });
      });
  }, []);

  return (
    <>
      <HeaderComp url="/dashboard/query" />
      {pathname.includes('view') ? (
        <ReturnBtn location="/dashboard/query" />
      ) : (
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
          </div>
          <div className={classes.linkWrapper}>
            <div>
              <Link to={`${url}/pending`} style={{ textDecoration: 'none' }}>
                <LeaveButton
                  variant="contained"
                  disableElevation
                  className={
                    pathname.substring(16) == `/pending`
                      ? classes.active
                      : classes.inactiveTab
                  }>
                  Pending ({values?.pendingLength})
                </LeaveButton>
              </Link>
            </div>
            <div>
              <Link to={`${url}/closed`} style={{ textDecoration: 'none' }}>
                <LeaveButton
                  variant="contained"
                  disableElevation
                  className={
                    pathname.substring(16) == `/closed`
                      ? classes.active
                      : classes.inactiveTab
                  }>
                  Closed ({values?.closedLength})
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
            <PrimaryButton endIcon={<Add />} onClick={handleClickOpen}>
              Add New
            </PrimaryButton>
          </div>
        </>
      )}

      <div>
        <Switch>
          {routes?.map(({ component: Pending, ...route }, i) => (
            <Route
              key={i}
              {...route}
              render={(props) => (
                <Pending
                  reload={reload}
                  values={values}
                  setValues={setValues}
                  searchTerm={searchTerm}
                  {...props}
                />
              )}
            />
          ))}
          <Redirect from="/dashboard/query" to="/dashboard/query/pending" />
        </Switch>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={dialogOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Query
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
              <DialogTypography style={{ textAlign: 'center' }}>
                Successful
              </DialogTypography>
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
                  {/* <InputForEmployeePage
                    placeholder="Search Employees"
                    size="small"
                    fullWidth
                    style={{
                      fontStyle: 'italic',
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ color: '#828282' }} />
                        </InputAdornment>
                      ),
                    }}
                    value={values?.data?.employeeToqueryName}
                    onChange={handleChange('employeeToqueryName')}
                  /> */}

                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchData}
                    getOptionLabel={(option) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    onChange={(e, v) =>
                      setValues({
                        data: {
                          ...values.data,
                          employeeToqueryId: v[0]?.employeeId,
                          employeeToqueryName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                        },
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('employeeToqueryName')}
                        {...params}
                        variant="outlined"
                        size="small"
                        label=""
                        placeholder="Search Employees"
                      />
                    )}
                  />
                  {values?.data?.employeeToqueryName.length > 0 && (
                    <Paper
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        minWidth: matchesXs ? '88%' : matchesSm ? '73%' : '55%',
                      }}>
                      <ul
                        style={{
                          listStyleType: 'none',
                          padding: 0,
                          margin: 0,
                        }}>
                        {searchData?.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              handleListItem(
                                item?.employeeId,
                                item?.firstName,
                                item?.lastName,
                              )
                            }>
                            <TypographyH5
                              style={{
                                padding: '0.7rem 2rem',
                                borderBottom: '1px solid #9e9e9ead',
                                textTransform: 'capitalize',
                              }}>
                              {item?.firstName} {item?.lastName}
                            </TypographyH5>
                          </li>
                        ))}
                      </ul>
                    </Paper>
                  )}
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Date:
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: '2/10',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: responsive ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <div style={{ width: '100%' }}>
                    <MaterialDatePicker
                      value={values?.data?.queryDate}
                      handleDateChange={handleQueryDate}
                      notched
                    />
                  </div>
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
                    Query For:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <SelectComp
                    label="Query"
                    value={values?.data?.queryFor}
                    menuItem={[
                      { label: 'Insubordination', value: 'insubordination' },
                      { label: 'Assault', value: 'assault' },
                      { label: 'Punctuality', value: 'punctuality' },
                      { label: 'Theft', value: 'theft' },
                    ]}
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '15rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    onChange={handleChange('queryFor')}
                  />
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
                    value={values?.data?.comment}
                    fullWidth
                    multiline
                    rows={8}
                    onChange={handleChange('comment')}
                  />
                </div>
                <div className={classes.halfGrid}>
                  <div className={classes.actionsWrapper}>
                    <SuspendButton disableElevation onClick={handleQuery}>
                      Send Query
                    </SuspendButton>
                    <CancelButton
                      disableElevation
                      onClick={handleClose}
                      style={{ marginTop: matchesXs && '1rem' }}>
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
