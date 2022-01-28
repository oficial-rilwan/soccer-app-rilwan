import {
  Dialog,
  IconButton,
  TextField,
  Paper,
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
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

export default function TerminationDialog({
  setDialogOpen,
  dialogOpen,
  classes,
  setSuccess,
  success,
  handleReload,
}) {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const [searchData, setSearchData] = useState([]);
  const [values, setValues] = useState({
    data: {
      employeeToTerminateId: '',
      employeeToTerminateName: '',
      reason: '',
      expectedDate: '',
      comment: '',
    },
  });

  const handleClose = () => {
    setDialogOpen(false);
    setValues({
      ...values,
      data: {
        ...values?.data,
        employeeToTerminateId: '',
        employeeToTerminateName: '',
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
        employeeToTerminateName: `${firstName} ${lastName}`,
        employeeToTerminateId: id,
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

  const handleTerminate = () => {
    authClient
      .post(
        `/api/v1/employee/terminate/management/create?employeeId=${values?.data?.employeeToTerminateId}`,
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
      values?.data?.employeeToTerminateName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${values?.data?.employeeToTerminateName}`,
          )
          .then(({ data }) => {
            setSearchData(data?.data);
          })
          .catch((e) => console.log(e));
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.data?.employeeToTerminateName]);

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
          {success ? 'Termination Process' : 'Termination'}
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
                          employeeToTerminateName: `${v[0]?.firstName} ${v[0]?.lastName}`,
                          employeeToTerminateId: v[0]?.employeeId,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('employeeToTerminateName')}
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
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Termination:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <SelectComp
                    label="Reason"
                    value={values?.data?.reason}
                    menuItem={[
                      { label: 'Fraud', value: 'fraud' },
                      { label: 'Assault', value: 'assault' },
                      { label: 'Punctuality', value: 'punctuality' },
                      { label: 'Theft', value: 'theft' },
                      { label: 'Others', value: 'others' },
                    ]}
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '15rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    onChange={handleChange('reason')}
                  />
                </div>
                <div className={classes.halfGrid}>
                  <InputForEmployeePage
                    placeholder="Additonal Comment..."
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
                    <SuspendButton
                      onClick={handleTerminate}
                      style={{
                        margin: matchesXs ? '0' : '0 .6rem 0 0',
                      }}>
                      Terminate
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
