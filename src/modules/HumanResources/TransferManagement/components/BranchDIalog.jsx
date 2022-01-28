import { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {
  makeStyles,
  withStyles,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  InputBase,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InviteCheck from 'lib/assets/images/invites_sent.png';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector } from 'react-redux';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import InputComponent from 'modules/HumanResources/Employees/AddEmployees/components/InputComponent';
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
    width: '45rem',
    height: '42.5rem',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
  },
  newBranch: {
    width: '33rem',
    height: '38rem',
    maxWidth: 'inherit',
    [theme.breakpoints.down('xs')]: {
      height: '34rem',
    },
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
  selectInput: {
    borderRadius: '0px !important',
  },
  addressField: {
    borderRadius: 0,
  },
}));

const SelectInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    borderColor: '#E7E8E8',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    color: '#6c6b6b',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      backgroundColor: '#fff',
    },
  },
}))(InputBase);

export default function BranchDialog({
  openBranch,
  setOpenBranch,
  branchSuccess,
  setBranchSuccess,
  setNewBranch,
  setRefresh,
  refresh,
  newBranch,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));
  const [values, setValues] = useState({
    data: {
      state: '',
      lga: '',
    },
  });

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const [branch, setBranch] = useState({
    employeeName: '',
    employeeId: '',
    workLocation: '',
    data: {
      reason: '',
      reportingDate: '',
      newBranch: '',
    },
  });

  const handleClose = () => {
    setBranch({
      ...branch,
      employeeName: '',
      employeeId: '',
      workLocation: '',
      data: {
        reason: '',
        reportingDate: '',
        newBranch: '',
      },
    });
    setOpenBranch(false);
  };
  const handleBranch = () => {
    authClient
      .post(
        `/api/v1/employee/transfer/management/branch/create?employeeId=${branch?.employeeId}`,
        branch?.data,
      )
      .then((response) => {
        if (response.status == 200 || 201) {
          setBranchSuccess(true);
          setRefresh(!refresh);
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const [searchData, setSearchData] = useState([]);

  const handleListItem = (id, firstName, lastName, workLocation) => {
    setBranch({
      ...branch,
      employeeName: `${firstName} ${lastName}`,
      employeeId: id,
      workLocation,
    });
  };
  const handleReportingDate = (value) => {
    setBranch({ ...branch, data: { ...branch.data, reportingDate: value } });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setBranch({
      ...branch,
      [name]: value,
      data: { ...branch.data, [name]: value },
    });
  };

  useEffect(() => {
    const handler =
      branch?.employeeName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${branch?.employeeName}`,
          )
          .then(({ data }) => {
            // setValues({ ...values });
            setSearchData(data?.data);
          })
          .catch((e) => {
            // setValues({ ...values });
            console.log(e);
          });
      }, 500);
    return () => clearTimeout(handler);
  }, [branch?.employeeName]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: newBranch ? classes.newBranch : classes.dialogPaper,
        }}
        open={openBranch}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {newBranch ? 'New Branch' : 'Transfer'}
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            display: 'flex',
            justifyContent: matchesXs
              ? 'center'
              : branchSuccess
              ? 'center'
              : 'flex-start',
            alignItems: 'center',
          }}>
          {branchSuccess ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '25rem',
              }}>
              <img src={InviteCheck} alt="invite_successful" />
              <Typography
                variant="h5"
                style={{
                  fontFamily: 'Rubik',
                  fontSize: '22.2621px',
                  lineHeight: '32px',
                  marginTop: '2rem',
                }}>
                Successful
              </Typography>
            </div>
          ) : (
            <section style={{ height: '100%', width: '100%' }}>
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
                <div style={{ gridColumn: '2 / 7' }}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchData}
                    getOptionLabel={(option) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    onChange={(e, v) =>
                      setBranch({
                        ...branch,
                        employeeId: v[0]?.employeeId,
                        employeeName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                        workLocation: v[0]?.workLocation,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('employeeName')}
                        {...params}
                        variant="outlined"
                        label=""
                        placeholder="Search Employees"
                        size="small"
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
                <div style={{ gridColumn: '2 / 7' }}>
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
                    }`}{' '}
                  </Typography>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Old Branch:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2 / 7' }}>
                  <InputForEmployeePage
                    size="small"
                    type="text"
                    disabled
                    style={{
                      width: '100%',
                      padding: 0,
                      margin: '.5rem 0 0',
                      backgroundColor: '#E0E0E0',
                      fontStyle: 'italic',
                    }}
                    value={branch.workLocation}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    New Branch:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/7' }}>
                  <InputComponent
                    placeholder="Choose branch"
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    value={branch.data.newBranch}
                    handleChange={handleChange('newBranch')}
                    handlePopClose={handlePopClose}
                    onHandleSelect={(e) =>
                      setBranch({
                        ...branch,
                        data: {
                          ...branch.data,
                          newBranch: e.target.innerText || '',
                        },
                      })
                    }
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Reporting Date:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: '2 / 7',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: responsive ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                  }}>
                  <div style={{ width: '100%' }}>
                    <MaterialDatePicker
                      handleDateChange={handleReportingDate}
                      value={branch.data?.reportingDate}
                      notched
                    />
                  </div>
                </div>
                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start', marginTop: '.7rem' }}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Reason:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2 / 7' }}>
                  <InputForEmployeePage
                    placeholder="Enter short note here"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={5}
                    onChange={handleChange('reason')}
                  />
                </div>
                <div style={{ gridColumn: '2 / 7' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      gap: matchesXs ? '1rem' : '1.3rem',
                      // justifyContent: 'space-between',
                    }}>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        backgroundColor: '#1F53D7',
                        color: '#fff',
                        textTransform: 'none',
                        width: matchesXs ? '100%' : '11rem',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        margin: matchesXs ? '0' : '0 .6rem 0 0',
                      }}
                      onClick={handleBranch}>
                      Process Transfer
                    </Button>
                    <Button
                      disableElevation
                      variant="contained"
                      style={{
                        borderRadius: '3px',
                        border: '1px solid #00000033',
                        backgroundColor: 'transparent',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        width: matchesXs ? '100%' : '9rem',
                        boxShadow: 'none',
                        margin: matchesXs ? '1rem 0 1rem' : '0 0 0 .6rem',
                      }}
                      onClick={handleClose}>
                      Cancel
                    </Button>
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
