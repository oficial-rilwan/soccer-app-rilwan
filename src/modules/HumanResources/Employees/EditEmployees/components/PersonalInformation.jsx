import {
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  Checkbox,
  Button,
  Paper,
  Avatar,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect, useHistory, useLocation, useRouteMatch } from 'react-router';
import NaijaStates from 'naija-state-local-government';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputField from '../../AddEmployees/components/EmployeeInpt';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { useEffect, useState, useCallback, useRef } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import InputBase from '@material-ui/core/InputBase';
import { debounce } from 'lodash';
import { urlConstants } from 'lib/constants';
import animationData from 'modules/animations/mail.json';
import Loader from 'react-loaders';
import Lottie from 'react-lottie';
import { DialogTypography } from 'modules/components/Typography/Typography';
import {
  BirthDateInput,
  HireDateInput,
} from 'modules/components/DatePickers/Date';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  dialogTitle: {
    fontFamily: 'Rubik',
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
  respContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 0',
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
    width: '30rem',
    height: 'auto',
  },
  loader: {
    textAlign: 'center',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
  },
  menuItem: {
    height: '14rem',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: 'pointer',
  },
  imageDialog: {
    width: '20rem',
    height: '20rem',
    background: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  imageEdit: {
    width: 230,
    height: 230,
    borderRadius: '50%',
  },
  editBtn: {
    color: '#fff',
    border: '1px solid #fff',
    position: 'relative',
    bottom: 50,
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

export default function PersonalInformation({ match, ...props }) {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const menuList = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
  ];

  const [checkbox, setCheckBox] = useState({
    pension: false,
    paye: false,
    nhf: false,
    nhis: false,
    assurance: false,
    gratuity: false,
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
      employeeManager: '',
      designation: '',
      employmentType: '',
      NIN: '',
      TIN: '',
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
    },
    workRef: useRef(),
  });

  const [compensation, setCompensation] = useState({
    deductions: ['Pension', 'PAYE', 'NHF'],
    description: '',
  });
  const handleAddDeductions = () => {
    if (compensation?.description) {
      if (
        compensation?.deductions.includes(
          compensation?.description.toLowerCase() || compensation?.description,
        )
      ) {
        setCompensation({ ...compensation, description: '' });
      } else {
        setCompensation({
          ...compensation,
          deductions: [...compensation?.deductions, compensation?.description],
          description: '',
        });
      }
    } else {
      return null;
    }
  };

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [progress, setProgress] = useState(false);
  const history = useHistory();

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  const workRef = useRef();
  useEffect(() => {
    setIsLoading(true);
    setProgress(false);
    authClient
      .get(`${urlConstants.EMPLOYEE_DATA}${match?.params?.id}`)
      .then(({ data }) => {
        setIsLoading(false);
        let employeeData = data?.data;
        setValues({ ...values, data: { ...employeeData } });
      })
      .catch((e) => console.log(e));
    if (props?.history?.location?.state) {
      setValues({ ...values, workRef });
      values?.workRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      null;
    }
  }, [match?.params?.id]);

  const handleBtnClick = () => {
    setProgress(true);
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
      values.data.employmentType &&
        userData.append('employmentType', values.data.employmentType),
      values.data.TIN && userData.append('TIN', values.data.TIN),
      values.data.NIN && userData.append('NIN', values.data.NIN),
      values.data.address && userData.append('address', values.data.address),
      values.data.workLocation &&
        userData.append('workLocation', values.data.workLocation),
      values.data.vacationPolicy &&
        userData.append('vacationPolicy', values.data.vacationPolicy),
      values.data.deductions &&
        userData.append('deductions', values.data.deductions),
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
      values.data.employeeManager &&
        userData.append('employeeManager', values.data.employeeManager),
      values.data.accountName &&
        userData.append('accountName', values.data.accountName);
    values.data.gender && userData.append('gender', values.data.gender);
    values.data.dateOfHire &&
      userData.append('dateOfHire', values.data.dateOfHire),
      values?.data?.image && userData.append('image', values?.data?.image),
      values.data.email && userData.append('email', values.data.email),
      values.data.dateOfBirth &&
        userData.append('dateOfBirth', values.data.dateOfBirth);
    values.data.phone && userData.append('phone', values.data.phone),
      values.data.mobile && userData.append('mobile', values.data.mobile),
      values.data.annualSalary &&
        userData.append(
          'annualSalary',
          values.data.annualSalary.replace(/\,/g, ''),
        );
    authClient
      .put(`/api/v1/employee/update?employeeId=${match?.params?.id}`, userData)
      .then((response) => {
        if (response.status == 200) {
          setProgress(false);
          history.push(
            `/dashboard/employees/view/overview/${match?.params?.id}`,
          );
        }
      })
      .catch((e) => (console.log(e), setProgress(false)));
  };

  const [imageDialog, setImageDialog] = useState(false);

  const imageOpen = () => {
    setImageDialog(true);
  };

  const imageClose = () => {
    setImageDialog(false);
  };

  const handleInputChange = (name) => (e) => {
    let { files } = e.target;
    switch (name) {
      case 'image':
        setValues({
          ...values,
          data: { ...values.data, meta: '', [name]: files[0] },
          error_msg: '',
          title: '',
          checkImage: files[0] && URL.createObjectURL(files[0]),
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

  useEffect(() => {
    authClient
      .get('/api/v1/bank-account/banks')
      .then(({ data }) => setBanks(data?.data))
      .catch((e) => console.log(e));
  }, []);

  const handleBirthChange = (value) => {
    setValues({ ...values, data: { ...values.data, dateOfBirth: value } });
  };

  const handleHireChange = (value) => {
    setValues({ ...values, data: { ...values.data, dateOfHire: value } });
  };

  if (values.redirectToEmployee) {
    return <Redirect to="/dashboard/employees" />;
  }

  const fileInput = useRef();

  const handleEdit = () => {
    fileInput.current.click();
    imageClose();
  };

  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <>
          <div className={classes.contentWrapper}>
            <div style={{ width: '57rem' }}>
              <Typography variant="h3" className={classes.title2}>
                Personal Information
              </Typography>
            </div>
          </div>
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper className={classes.container} elevation={0}>
              <div className={classes.formFields}>
                <div className={classes.employeeImgWrapper}>
                  <input
                    accept="image/*"
                    type="file"
                    style={{ display: 'none' }}
                    id="profile_picture"
                    ref={fileInput}
                    onChange={handleInputChange('image')}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                      className={classes.large}
                      onClick={imageOpen}
                      src={
                        values?.checkImage
                          ? values.checkImage
                          : values?.data?.meta?.url
                      }
                    />
                  </div>
                  <Button
                    onClick={() => fileInput.current.click()}
                    variant="contained"
                    color="primary"
                    disableElevation
                    className={classes.upload}>
                    Upload Image
                  </Button>
                </div>
                <div
                  style={{
                    display: matchesXs ? 'block' : 'grid',
                    gridTemplateColumns: 'repeat(2,1fr)',
                    gap: '1rem 2rem',
                  }}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      First Name:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="First name"
                      size="small"
                      fullWidth
                      value={values?.data?.firstName}
                      onChange={handleChange('firstName')}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Middle Name:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="Middle name"
                      size="small"
                      fullWidth
                      value={values?.data?.middleName}
                      onChange={handleChange('middleName')}
                    />
                  </div>
                </div>
                <div className={classes.gridWrapper}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Last Name:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="Last name"
                      size="small"
                      value={values?.data?.lastName}
                      onChange={handleChange('lastName')}
                      fullWidth
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Date Of Birth:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <BirthDateInput
                      value={values?.data?.dateOfBirth}
                      handleDateChange={handleBirthChange}
                      maxDate
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Phone number:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="080XXXXXXXX"
                      size="small"
                      inputProps={{ maxLength: 11 }}
                      fullWidth
                      value={values?.data?.phone}
                      onChange={handleChange('phone')}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Mobile 2:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="080XXXXXXXX"
                      size="small"
                      inputProps={{ maxLength: 11 }}
                      fullWidth
                      value={values?.data?.mobile}
                      onChange={handleChange('mobile')}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Gender:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <SelectComp
                      label="Gender"
                      menuItem={menuList}
                      input={<SelectInput />}
                      handleSelectChange={handleSelectChange('gender')}
                      value={values?.data?.gender}
                      style={{ height: '2.4rem', backgroundColor: '#fff' }}
                    />
                  </div>
                  <div
                    className={classes.formFieldWrapper}
                    style={matchesXs ? { marginTop: '.5rem' } : {}}>
                    <Typography variant="h6" className={classes.formTitle}>
                      NIN:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="Enter NIN"
                      value={values?.data?.NIN}
                      size="small"
                      fullWidth
                      onChange={handleChange('NIN')}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      TIN:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="Enter TIN"
                      value={values?.data?.TIN}
                      size="small"
                      onChange={handleChange('TIN')}
                      fullWidth
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Home Address:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <div style={{ display: 'flex' }}>
                      <InputField
                        placeholder="House no"
                        size="small"
                        style={{ padding: 0 }}
                        onChange={handleChange('address')}
                        // value={values?.data?.address.substr(0)}
                        InputProps={{
                          className: classes.addressField,
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                        }}
                      />
                      <InputField
                        placeholder="Street"
                        size="small"
                        fullWidth
                        style={{ padding: 0 }}
                        InputProps={{
                          className: classes.addressField,
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                        }}
                        value={values?.data?.street}
                        onChange={handleChange('address')}
                      />
                      <InputField
                        placeholder="City"
                        size="small"
                        style={{ padding: 0 }}
                        InputProps={{
                          className: classes.addressField,
                          classes: {
                            notchedOutline: classes.notchedOutline,
                          },
                        }}
                        onChange={handleChange('address')}
                      />
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2,1fr)',
                      }}>
                      <Select
                        variant="outlined"
                        onChange={handleSelectChange('state')}
                        value={values?.data?.state}
                        input={
                          <SelectInput
                            classes={{ input: classes.selectInput }}
                          />
                        }
                        fullWidth
                        displayEmpty>
                        <MenuItem
                          disabled
                          value=""
                          style={{ padding: '.5rem' }}>
                          <em>State (Abia)</em>
                        </MenuItem>
                        {NaijaStates.states().map((state, i) => (
                          <MenuItem
                            key={i}
                            value={state}
                            style={{ padding: '.5rem' }}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>

                      <Select
                        variant="outlined"
                        onChange={handleSelectChange('lga')}
                        value={values?.data?.lga}
                        input={
                          <SelectInput
                            classes={{ input: classes.selectInput }}
                          />
                        }
                        fullWidth
                        displayEmpty>
                        <MenuItem
                          disabled
                          value=""
                          style={{ padding: '.5rem' }}>
                          <em>L.G.A</em>
                        </MenuItem>
                        {NaijaStates.lgas(
                          values.data.state ? values.data.state : 'Abia',
                        ).lgas.map((lga, i) => (
                          <MenuItem
                            key={i}
                            value={lga}
                            style={{ padding: '.5rem' }}>
                            {lga}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Email:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="Email address"
                      size="small"
                      value={values?.data?.email}
                      fullWidth
                      onChange={handleChange('email')}
                    />
                  </div>
                  <div
                    style={{ gridColumn: '2/8' }}
                    className={classes.formFieldWrapper}>
                    <Checkbox
                      color="primary"
                      checked={values?.data?.inviteButton}
                      onClick={() =>
                        setValues({
                          ...values,
                          data: {
                            ...values.data,
                            inviteButton: !values.data.inviteButton,
                          },
                        })
                      }
                    />
                    <Typography variant="h6" className={classes.footerText}>
                      Invite employee to onboard and enter their information.
                    </Typography>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Next of Kin:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      placeholder="Next of Kin"
                      size="small"
                      value={values?.data?.nextOfKin}
                      onChange={handleChange('nextOfKin')}
                      fullWidth
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Next of Kin Phone No:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      size="small"
                      value={values?.data?.nextOfKinPhone}
                      onChange={handleChange('nextOfKinPhone')}
                      fullWidth
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Relationship with Next of Kin:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <InputField
                      size="small"
                      value={values?.data?.nextOfKinRelationship}
                      onChange={handleChange('nextOfKinRelationship')}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </Paper>
          </section>
          <div style={{ margin: '3rem 0rem' }}>
            <div className={classes.contentWrapper}>
              <div style={{ width: '57rem' }}>
                <Typography variant="h3" className={classes.title2}>
                  Work Information
                </Typography>
              </div>
            </div>
            <section style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={classes.container}>
                <div className={classes.formFields}>
                  <div className={classes.gridWrapper2}>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Employee ID:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="JX1078"
                        size="small"
                        value={values?.data?.employeeID}
                        onChange={handleChange('employeeID')}
                        fullWidth
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Manager:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Manager name"
                        size="small"
                        onChange={handleChange('employeeManager')}
                        value={values?.data?.employeeManager}
                        fullWidth
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Department:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Enter Department"
                        size="small"
                        onChange={handleChange('department')}
                        value={values?.data?.department}
                        fullWidth
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Designation:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Enter Designation"
                        size="small"
                        onChange={handleChange('designation')}
                        value={values?.data?.designation}
                        fullWidth
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Employment Type:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <SelectComp
                        label="employment"
                        menuItem={[
                          { label: 'Full-time', value: 'Full-time' },
                          { label: 'Contract', value: 'Contract' },
                          { label: 'Part-time', value: 'Part-time' },
                        ]}
                        handleSelectChange={handleSelectChange(
                          'employmentType',
                        )}
                        input={<SelectInput />}
                        value={values?.data?.employmentType}
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Date Of Hire:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <HireDateInput
                        value={values?.data?.dateOfHire}
                        handleDateChange={handleHireChange}
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Work Location:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <Select
                        variant="outlined"
                        onChange={handleSelectChange('workLocation')}
                        value={values?.data?.workLocation}
                        input={<SelectInput />}
                        fullWidth
                        displayEmpty>
                        <MenuItem
                          disabled
                          value=""
                          style={{ padding: '.5rem' }}>
                          <em>Choose Location</em>
                        </MenuItem>
                        {NaijaStates.states().map((state, i) => (
                          <MenuItem
                            value={state.toLowerCase()}
                            key={i}
                            style={{ padding: '.5rem' }}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Vacation Policy:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <Select
                        variant="outlined"
                        onChange={handleSelectChange('vacationPolicy')}
                        value={values?.data ? values.data.vacationPolicy : ''}
                        input={<SelectInput />}
                        fullWidth
                        displayEmpty>
                        <MenuItem
                          disabled
                          value=""
                          style={{ padding: '.5rem' }}>
                          <em>Select policy</em>
                        </MenuItem>
                        <MenuItem
                          value={'7 working days a year'}
                          style={{ padding: '.5rem' }}>
                          7 working days a year
                        </MenuItem>
                        <MenuItem
                          value={'14 working days a year'}
                          style={{ padding: '.5rem' }}>
                          14 working days a year
                        </MenuItem>
                        <MenuItem
                          value={'21 working days a year'}
                          style={{ padding: '.5rem' }}>
                          21 working days a year
                        </MenuItem>
                        <MenuItem
                          value={'28 working days a year'}
                          style={{ padding: '.5rem' }}>
                          28 working days a year
                        </MenuItem>
                        <MenuItem
                          value={'30 working days a year'}
                          style={{ padding: '.5rem' }}>
                          30 working days a year
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div style={{ margin: '3rem 0rem, 0rem' }} ref={values?.workRef}>
            <div className={classes.contentWrapper}>
              <div style={{ width: '57rem' }}>
                <Typography variant="h3" className={classes.title2}>
                  Compensation and Deduction
                </Typography>
              </div>
            </div>
            <section style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={classes.container}>
                <div className={classes.formFields}>
                  <div className={classes.gridWrapper2}>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Annual Salary:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Enter Annual Salary"
                        type="text"
                        size="small"
                        value={Number(
                          values?.data?.annualSalary.replace(/,/g, ''),
                        ).toLocaleString()}
                        fullWidth
                        onChange={handleChange('annualSalary')}
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Bank Name:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <Select
                        variant="outlined"
                        onChange={handleSelectChange('bankName')}
                        value={values?.data?.bankName}
                        input={<SelectInput />}
                        MenuProps={{
                          classes: {
                            paper: classes.menuItem,
                          },
                        }}
                        fullWidth
                        displayEmpty>
                        <MenuItem
                          disabled
                          value=""
                          style={{ padding: '.5rem' }}>
                          <em>Choose Bank</em>
                        </MenuItem>
                        {banks &&
                          banks?.map((bank, i) => (
                            <MenuItem
                              value={bank?.name}
                              key={i}
                              style={{ padding: '.5rem' }}>
                              {bank?.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Account No:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Account no"
                        size="small"
                        fullWidth
                        value={values?.data?.accountNo}
                        inputProps={{ maxLength: 10 }}
                        onChange={debounce(handleChange('accountNo'), 1500)}
                      />
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Account Name:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Name of Account"
                        type="text"
                        size="small"
                        fullWidth
                        disabled
                        value={values?.data?.accountName}
                        onChange={handleChange('accountName')}
                        value={values.data.accountName || ''}
                      />
                    </div>

                    <div
                      className={classes.formFieldWrapper}
                      style={{ alignItems: 'flex-start' }}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Deductions:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      {compensation?.deductions?.map((item, i) => (
                        <label
                          key={i}
                          style={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox
                            color="primary"
                            checked={values?.data?.deductions?.includes(item)}
                            onClick={() => {
                              values?.data?.deductions?.includes(item)
                                ? setValues({
                                    ...values,
                                    data: {
                                      ...values.data,
                                      deductions: values.data.deductions.filter(
                                        (el) => el !== item,
                                      ),
                                    },
                                  })
                                : setValues({
                                    ...values,
                                    data: {
                                      ...values.data,
                                      deductions: [
                                        ...values.data.deductions,
                                        item,
                                      ],
                                    },
                                  });
                            }}
                            onChange={() =>
                              setCheckBox({
                                ...checkbox,
                                [item]: !checkbox?.[item],
                              })
                            }
                          />
                          <Typography
                            variant="h6"
                            className={classes.deductionList}>
                            {item == 'PAYE'
                              ? 'Pay As You Earn (PAYE)'
                              : item == 'NHF'
                              ? 'National Housing Fund (NHF)'
                              : item}
                          </Typography>
                        </label>
                      ))}
                      {/* <div
                        style={{
                          display: 'flex',
                          margin: '17px 11px 5px',
                          gap: '1rem',
                        }}>
                        <InputField
                          style={{ width: matchesXs ? '65%' : '50%' }}
                          placeholder="Description"
                          value={compensation?.description}
                          onChange={(e) =>
                            setCompensation({
                              ...compensation,
                              description: e.target.value,
                            })
                          }
                          size="small"
                        />
                        <InputField
                          style={{ width: matchesXs ? '25%' : '20%' }}
                          placeholder="%"
                          size="small"
                        />
                      </div> */}

                      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleAddDeductions}>
                          <AddCircleOutlineIcon style={{ color: '#1F53D7' }} />
                        </IconButton>
                        <TypographyH5 style={{ color: '#1F53D7' }}>
                          Add New
                        </TypographyH5>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            <div className={classes.contentWrapper}>
              <div
                style={{
                  width: '57rem',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <span className={classes.required}>*</span>
                <Typography variant="h6" className={classes.mandatoryText}>
                  Indicates mandatory field
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {progress ? (
              <div
                className={classes.loader}
                style={{ margin: '2rem 0', width: 25, height: 25 }}>
                <Loader type="ball-spin-fade-loader" color="#2F49D0" />
              </div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleBtnClick}
                style={{
                  textTransform: 'none',
                  fontFamily: 'Rubik',
                  backgroundColor: '#1F53D7',
                  margin: '2rem 0rem',
                }}>
                Save Employee
              </Button>
            )}
          </div>
          <Dialog
            onClose={imageClose}
            open={imageDialog}
            classes={{
              paper: classes.imageDialog,
            }}>
            <div className={classes.respContainer}>
              <Avatar
                className={classes.imageEdit}
                src={
                  values?.checkImage
                    ? values.checkImage
                    : values?.data?.meta?.url
                }
              />
              <Button
                onClick={handleEdit}
                size="small"
                variant="outlined"
                disableElevation
                className={classes.editBtn}>
                Edit
              </Button>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
