import {
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { DialogTypography } from 'modules/components/Typography/Typography';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { CancelButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import { SuspendButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react';
import { Search } from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { useSelector } from 'react-redux';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
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

export default function RetirementDialog({
  setDialogOpen,
  dialogOpen,
  classes,
  setSuccess,
  success,
  handleReload,
}) {
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));

  const [searchData, setSearchData] = useState([]);
  const [values, setValues] = useState({
    data: {
      employeeToRetireId: '',
      employeeToRetireName: '',
      reason: '',
      expectedDate: '',
    },
  });

  const handleClose = () => {
    setDialogOpen(false);
    setValues({
      ...values,
      data: {
        ...values?.data,
        employeeToRetireId: '',
        employeeToRetireName: '',
        reason: '',
        expectedDate: '',
        comment: '',
      },
    });
  };

  const handleListItem = (id, firstName, lastName) => {
    setValues({
      ...values,
      data: {
        ...values.data,
        employeeToRetireName: `${firstName} ${lastName}`,
        employeeToRetireId: id,
      },
    });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values?.data, [name]: value } });
  };

  const handleDateChange = (name) => (value) => {
    setValues({
      ...values,
      data: {
        ...values.data,
        [name]: value,
      },
    });
  };

  const handleRetirement = () => {
    authClient
      .post(
        `/api/v1/employee/retire/management/create?employeeId=${values?.data?.employeeToRetireId}`,
        values?.data,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setSuccess(true);
          handleReload(true);
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const handler =
      values?.data?.employeeToRetireName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${values?.data?.employeeToRetireName}`,
          )
          .then(({ data }) => {
            setSearchData(data?.data);
          })
          .catch((e) => console.log(e));
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.data?.employeeToRetireName]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={dialogOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {success ? 'Retirement Process' : 'Retirement'}
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
                        data: {
                          ...values.data,
                          employeeToRetireName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                          employeeToRetireId: v[0]?.employeeId,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('employeeToRetireName')}
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
                    Effective date:
                    <span className={classes.required}>*</span>
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
                    {/* <InputForEmployeePage
                      size="small"
                      type="date"
                      value={values?.data?.expectedDate}
                      style={{
                        width: matchesXs ? '100%' : '11rem',
                        padding: 0,
                        margin: '.5rem 0 0',
                      }}
                      onChange={handleChange('expectedDate')}
                    /> */}
                    <MaterialDatePicker
                      notched
                      disablePast
                      size="medium"
                      handleDateChange={handleDateChange('expectedDate')}
                      value={values.data.expectedDate}
                    />
                  </div>
                </div>
                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start' }}>
                  <Typography
                    variant="h6"
                    className={classes.formTitle}
                    style={{ padding: '1rem 0' }}>
                    Retirement:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <InputForEmployeePage
                    placeholder="Type reason here"
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
                    onChange={handleChange('reason')}
                  />
                </div>
                <div className={classes.halfGrid}>
                  <div className={classes.actionsWrapper}>
                    <SuspendButton
                      onClick={handleRetirement}
                      style={{
                        margin: matchesXs ? '0' : '0 .6rem 0 0',
                      }}>
                      Retire
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
