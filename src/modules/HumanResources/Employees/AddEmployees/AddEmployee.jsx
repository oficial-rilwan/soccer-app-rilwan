import { Typography, useMediaQuery, useTheme, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect, useHistory, useLocation, useRouteMatch } from 'react-router';
import Header from '../../../SiteLayout/Header/Header';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ReturnBtn from './components/ReturnBtn';
import { useEffect, useState, lazy } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import InputBase from '@material-ui/core/InputBase';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { useSelector } from 'react-redux';

const WorkInformation = lazy(() => import('./components/WorkInformation'));
const CompensationAndDeductions = lazy(() =>
  import('./components/CompensationAndDeductions'),
);
const PersonalInfo = lazy(() => import('./components/PersonalInfo'));

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

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    padding: '1rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
    },
    flexGrow: 1,
  },
  dialogTitle: {
    fontFamily: 'Rubik',
  },
  halfGrid: {
    gridColumn: '2/8',
  },
  title: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    padding: '1.2rem 0rem',
  },
  title2: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    padding: '0em 0rem 1rem',
  },
  formFields: {
    padding: '0 7rem',
    [theme.breakpoints.down('910')]: {
      padding: '0 3rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
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
  upload: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    backgroundColor: '#1F53D7',
    textTransform: 'none',
    width: '9rem',
    margin: '1rem 0',
  },
  footerText: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#1F53D7',
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
  container: {
    background: '#FCFFFF',
    borderRadius: '5px',
    border: '0.5px solid #DFDFDF',
    width: '57rem',
    justifyContent: 'center',
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '.5rem',
    },
  },

  sectionControl: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      paddingBottom: '6px',
    },
  },
  required: {
    color: '#FF0303',
    verticalAlign: 'sub',
    margin: '.3rem',
  },
  deductionList: {
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
  },
  mandatoryText: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    color: '#ff0303',
    fontSize: '13px',
    lineHeight: '15px',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  gridWrapper: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    gridTemplateColumns: 'repeat(2,1fr)',
    gap: '1rem 2rem',
    paddingTop: '1rem',
  },
  gridWrapper2: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    gridTemplateColumns: 'repeat(2,1fr)',
    gridTemplateRows: 'repeat(3,1fr)',
    // height: '20rem',
    gap: '1rem 2rem',
    paddingTop: '1rem',
  },
  employeeImgWrapper: {
    padding: '1rem 0 3rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '0 0px 0 21px',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 0',
      margin: 0,
    },
  },
  addressField: {
    borderRadius: 0,
  },
  notchedOutline: {
    borderColor: '#E7E8E8',
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  dialogPaper: {
    width: '32rem',
    height: '28rem',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'inherit',
  },
  menuItem: {
    height: '15rem',
  },
  random: {
    backgroundColor: '#EEF5FC',
  },
  btnRoot: {
    textTransform: 'none',
    fontFamily: 'Rubik',
    backgroundColor: '#1F53D7',
    margin: '2rem 0rem',
    '&.Mui-disabled': {
      opacity: '.5',
      backgroundColor: '#2543ecc9 !important',
      color: '#fff',
      cursor: 'not-allowed',
      pointerEvents: 'all',
    },
  },
}));

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function AddEmployee() {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state?.auth);
  const loginState = useSelector((state) => state?.loginStats);

  const classes = useStyles();

  const [checkbox, setCheckBox] = useState({
    pension: false,
    paye: false,
    nhf: false,
    nhis: false,
    assurance: false,
    gratuity: false,
  });

  const [employeeAddress, setEmployeeAddress] = useState({
    no: '',
    city: '',
    street: '',
  });

  const [dashboardData, setDashboardData] = useState({
    initials: '',
  });

  const [values, setValues] = useState({
    data: {
      image: '',
      gender: '',
      state: '',
      lga: '',
      phone: '',
      middleName: '',
      firstName: '',
      lastName: '',
      employeeID: '',
      department: '',
      designation: '',
      employmentType: '',
      NIN: '',
      TIN: '',
      employeeManager: '',
      address: '',
      email: '',
      dateOfHire: '',
      dateOfBirth: '',
      workLocation: '',
      vacationPolicy: '',
      deductions: [],
      bankName: '',
      accountNo: '',
      accountName: '',
      status: '',
      inviteButton: false,
      nextOfKin: '',
      nextOfKinPhone: '',
      nextOfKinRelationship: '',
      status: '',
      annualSalary: '',
      url: '',
      mobile: '',
      deductionTypes: [],
    },
  });
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    switch (name) {
      case 'annualSalary':
        setValues({
          ...values,
          data: {
            ...values.data,
            [name]: Number(value.replace(/,/g, '')).toLocaleString(),
          },
        });
        break;
      case 'no':
        setEmployeeAddress({ ...employeeAddress, [name]: value });
      case 'street':
        setEmployeeAddress({ ...employeeAddress, [name]: value });
      case 'city':
        setEmployeeAddress({ ...employeeAddress, [name]: value });
        break;
      default:
        setValues({ ...values, data: { ...values.data, [name]: value } });
        break;
    }
  };
  const [disable, setDisable] = useState(false);

  const handleBirthChange = (value) => {
    setValues({ ...values, data: { ...values.data, dateOfBirth: value } });
  };

  const handleBtnClick = () => {
    setDisable(true);
    let userData = new FormData();
    values.data.firstName &&
      userData.append('firstName', values.data.firstName),
      values.data.lastName && userData.append('lastName', values.data.lastName),
      values.data.middleName &&
        userData.append('middleName', values.data.middleName),
      values.data.accountNo &&
        userData.append('accountNo', values.data.accountNo),
      values.data.bankName && userData.append('bankName', values.data.bankName),
      values.data.state && userData.append('state', values.data.state),
      values.data.lga && userData.append('lga', values.data.lga),
      values.data.employeeID &&
        userData.append('employeeID', values.data.employeeID),
      values.data.department &&
        userData.append('department', values.data.department),
      values.data.designation &&
        userData.append('designation', values.data.designation),
      values.data.employeeManager &&
        userData.append('employeeManager', values.data.employeeManager),
      values.data.employmentType &&
        userData.append('employmentType', values.data.employmentType),
      values.data.TIN && userData.append('TIN', values.data.TIN),
      values.data.NIN && userData.append('NIN', values.data.NIN),
      employeeAddress.city &&
        employeeAddress.no &&
        employeeAddress.street &&
        userData.append(
          'address',
          `${employeeAddress?.no} ${employeeAddress?.street} ${employeeAddress?.city}`,
        ),
      values.data.workLocation &&
        userData.append('workLocation', values.data.workLocation),
      values.data.vacationPolicy &&
        userData.append('vacationPolicy', values.data.vacationPolicy),
      values.data.deductions &&
        userData.append('deductions', JSON.stringify(values.data.deductions)),
      values.data.mobile && userData.append('mobile', values.data.mobile),
      values.data.deductionTypes &&
        userData.append(
          'deductionTypes',
          JSON.stringify(values.data.deductionTypes),
        ),
      values.data.status && userData.append('status', values.data.status);
    values.data.inviteButton &&
      userData.append('inviteButton', values.data.inviteButton);
    values.data.status && userData.append('status', values.data.status);
    values.data.nextOfKin &&
      userData.append('nextOfKin', values.data.nextOfKin);
    values.data.nextOfKinPhone &&
      userData.append('nextOfKinPhone', values.data.nextOfKinPhone),
      values.data.nextOfKinRelationship &&
        userData.append(
          'nextOfKinRelationship',
          values.data.nextOfKinRelationship,
        );
    values.data.url && userData.append('url', values.data.url),
      values.data.accountName &&
        userData.append('accountName', values.data.accountName);
    values.data.gender && userData.append('gender', values.data.gender);
    values.data.dateOfHire &&
      userData.append('dateOfHire', values.data.dateOfHire),
      values.data.image && userData.append('image', values.data.image),
      values.data.email && userData.append('email', values.data.email),
      values.data.dateOfBirth &&
        userData.append('dateOfBirth', values.data.dateOfBirth);
    values.data.phone && userData.append('phone', values.data.phone),
      values.data.annualSalary &&
        userData.append(
          'annualSalary',
          values.data.annualSalary.replace(/\,/g, ''),
        );
    authClient
      .post('/api/v1/employee/create', userData)
      .then((response) => {
        if (response.status == 201) {
          setOpen(true);
          setTimeout(() => {
            handleClose();
            history.push(`/dashboard/employees`);
          }, 6500);
        }
      })
      .catch((e) => (setDisable(false), console.log(e)));
  };

  const handleInputChange = (name) => (e) => {
    let { files } = e.target;
    switch (name) {
      case 'image':
        setValues({
          ...values,
          data: { ...values.data, [name]: files[0] },
          checkImage: files[0] && URL.createObjectURL(files[0]),
          error_msg: '',
          title: '',
        });
        break;
      default:
        setValues({
          ...values,
          data: { ...values.data, [name]: files[0] },
          error_msg: '',
          title: '',
        });
        break;
    }
  };

  const handleHireChange = (value) => {
    setValues({ ...values, data: { ...values.data, dateOfHire: value } });
  };

  useEffect(() => {
    values?.data?.accountNo &&
      authClient
        .post('/api/v1/bank-account/resolve', {
          bankName: values.data.bankName,
          accountNumber: values.data.accountNo,
        })
        .then(({ data }) => {
          setValues({
            ...values,
            data: { ...values.data, accountName: data?.data?.accountName },
          });
        });
  }, [values.data.accountNo, values.data.bankName]);

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    authClient
      .get(
        `/api/v1/sub-admin/profile?subAdminId=${
          user?.subAdminId ||
          loginState?.user?.profile?.subAdminId ||
          loginState?.googleUser?.userId
        }`,
      )
      .then(({ data }) => {
        let { businessName } = data?.data;
        setValues({
          ...values,
          data: {
            ...values.data,
            employeeID:
              businessName
                ?.split(' ')
                .map((item) => item[0])
                .join('') + Math.floor(1000 + Math.random() * 9999),
          },
        });
      })
      .catch((e) => console.log(e));
  }, []);

  if (values.redirectToEmployee) {
    return <Redirect to="/dashboard/employees" />;
  }

  return (
    <>
      <Header path={path} url={'/dashboard/employees'} pathname={pathname} />
      <div className={classes.root}>
        <div className={classes.sectionControl}>
          <ReturnBtn location="/dashboard/employees" />
          <Typography variant="h2" className={classes.title}>
            Add Employee
          </Typography>
        </div>
        <div className={classes.contentWrapper}>
          <div style={{ width: '57rem' }}>
            <Typography variant="h3" className={classes.title2}>
              Personal Information
            </Typography>
          </div>
        </div>
        <PersonalInfo
          classes={classes}
          values={values}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
          setValues={setValues}
          matchesXs={matchesXs}
          imageName={values?.data?.image?.name}
          handleBirthChange={handleBirthChange}
        />
        <WorkInformation
          classes={classes}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          values={values}
          handleHireChange={handleHireChange}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handlePopClose={handlePopClose}
        />
        <CompensationAndDeductions
          classes={classes}
          checkbox={checkbox}
          setCheckBox={setCheckBox}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          values={values}
          setValues={setValues}
        />
        <div>
          <div className={classes.contentWrapper}>
            <div
              style={{ width: '57rem', display: 'flex', alignItems: 'center' }}>
              <span className={classes.required}>*</span>
              <Typography variant="h6" className={classes.mandatoryText}>
                Indicates mandatory field
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBtnClick}
            disabled={disable}
            disableElevation
            className={classes.btnRoot}>
            Save Employee
          </Button>
        </div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          classes={{
            container: classes.dialogContainer,
            paper: classes.dialogPaper,
          }}
          disableBackdropClick>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => history.push('/dashboard/employees')}>
            Add Employee
          </DialogTitle>
          <DialogContent dividers>
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Invite Sent</DialogTypography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
