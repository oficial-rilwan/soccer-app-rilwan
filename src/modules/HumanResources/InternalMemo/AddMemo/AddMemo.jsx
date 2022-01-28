import {
  Dialog,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  useMediaQuery,
  Select,
  Typography,
} from '@material-ui/core';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import InputField from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { useHistory } from 'react-router';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authClient } from 'modules/authentication/requestClient';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => ({
  gridWrapper2: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    gridTemplateColumns: 'repeat(2,1fr)',
    gridTemplateRows: 'repeat(3,1fr)',
    gap: '1rem 2rem',
    padding: '1rem 0',
  },
  formFields: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: '0 1rem',
      margin: 0,
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      padding: 0,
      marginRight: '8rem',
      marginTop: '1.5rem',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginRight: '23rem',
      marginTop: '1.5rem',
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
  formWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
  },
  selectInput: {
    borderRadius: '0px !important',
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
  required: {
    color: '#FF0303',
    verticalAlign: 'sub',
    margin: '.3rem',
  },
  notchedOutline: {
    borderColor: '#E7E8E8',
  },
  halfGrid: {
    gridColumn: '2/4',
  },
  addressField: {
    borderRadius: 0,
  },
  primaryButton: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  defaultButton: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
  },
  dialogPaper: {
    width: '35rem',
    height: '37rem',
    maxWidth: 'inherit',
    [theme.breakpoints.down('xs')]: {
      minWidth: '314px',
    },
  },
  noMargin: {
    margin: 0,
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
    marginTop: 8,
  },
});

const SelectInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    width: '100%',
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

export default function AddMemo() {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const matchesResponsive = useMediaQuery(theme.breakpoints.between(450, 600));
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const [employeeId, setEmployeeId] = useState('');
  const user = useSelector((state) => state?.auth?.user);
  const [departments, setDepartments] = useState();
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    memoData: {
      memoId: '',
      title: '',
      date: '',
      issuer: `${profile?.firstName ||
        user?.firstName ||
        googleUser?.firstName
        } ${profile?.lastName ||
        user?.lastName ||
        googleUser?.lastName
        }`,
      recipients: {
        department: '',
        departmentId: '',
      },
      body: '',
    },
  });
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();
  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({
      ...values,
      memoData: { ...values.memoData, [name]: value },
    });
  };

  const handleDateChange = (val) => {
    setValues({ ...values, memoData: { ...values.memoData, date: val } });
  };

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({
      ...values,
      memoData: {
        ...values.memoData,
        recipients: { ...values.memoData.recipients, [name]: value },
      },
    });
  };

  //fetch departments
  useEffect(() => {
    authClient
      .get('/api/v1/employee/department/management/fetch')
      .then(({ data }) => {
        let recipients = data.data;
        setDepartments(recipients);
      });
  }, []);

  //submit new memo payload

  const handleSubmit = () => {
    const { title, body, date, recipients } = values?.memoData;
    authClient
      .post(`/api/v1/memo/create`, {
        title,
        body,
        date,
        recipients,
      })
      .then((res) => {
        if (res.status === 200 || 201) {
          const { issuerName } = res?.data;
          setValues({ ...values, memoData: { ...values.memoData, issuer: issuerName } });
          setSuccess(true);
          setTimeout(() => {
            history.push('/dashboard/memo')
            handleClose();
          }, 3500);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <HeaderComp path={path} url="/dashboard/memo/add" pathname={pathname} />
      <ReturnBtn />
      <div>
        <Grid container>
          <Grid item xs={12} md={2}>
            <div style={{ margin: '.5rem 0' }}>
              <TypographyBold style={{ fontSize: 20 }}>
                Memo Details
              </TypographyBold>
            </div>
          </Grid>
          <Grid item xs={12} md={10}>
            <div
              style={{
                height: 'auto',
                backgroundColor: '#FCFFFF',
                border: '1px solid #EAEAEA',
                borderRadius: '5px',
                margin: '3.5rem 0px 1rem 0',
              }}>
              <div className={classes.formFields}>
                <div className={classes.gridWrapper2}>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 className={classes.formTitle}>
                      Memo Title:
                      <span className={classes.required}>*</span>
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2/10', alignSelf: 'center' }}>
                    <InputField
                      placeholder="Enter Here"
                      fullWidth
                      size="small"
                      name="title"
                      onChange={handleChange('title')}
                      value={values?.memoData?.title}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography
                      variant="h4"
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: '17px',
                        fontWeight: 'normal',
                      }}>
                      Date:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/10' }}>
                    <HireDateInput
                      style={{
                        marginLeft: matchesXs ? 0 : '0px',
                        marginRight: matchesResponsive ? '27px' : 0,
                        width: '100%',
                        borderColor: '#E7E8E8'
                      }}
                      disablePast
                      name="date"
                      handleDateChange={handleDateChange}
                      value={values.memoData.date}
                    />
                  </div>
                  <div className={classes.formWrapper}>
                    <TypographyH5 className={classes.formTitle}>
                      Issuer:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2/10' }}>
                    <Typography
                      variant="h4"
                      name="issuer"
                      value={values?.memoData?.issuer}
                      style={{
                        fontFamily: 'Rubik',
                        fontWeight: 500,
                        fontSize: 16,
                        margin: '0',
                      }}>
                      {`${profile?.firstName ||
                        user?.firstName ||
                        googleUser?.firstName
                        } ${profile?.lastName ||
                        user?.lastName ||
                        googleUser?.lastName
                        }`}
                    </Typography>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <TypographyH5 className={classes.formTitle}>
                      Recipients:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2/10' }}>
                    <Select
                      labelId="departments-label"
                      variant="outlined"
                      name="department"
                      fullWidth={matchesXs ? true : false}
                      style={{
                        marginRight: matchesXs ? 0 : '1.5rem',
                        marginLeft: '0',
                        width: '80%',
                        marginTop: tabUp ? 0 : '.5rem',
                        textTransform: 'capitalize',
                      }}
                      onChange={handleSelectChange('department')}
                      value={values.memoData.recipients.department}
                      input={<SelectInput />}
                      displayEmpty>
                      <MenuItem disabled value="" className={classes.menuItem}>
                        <em>Select</em>
                      </MenuItem>
                      {departments?.map((item, i) => (
                        <MenuItem
                          value={item.deptName}
                          onClick={() =>
                            setValues({
                              ...values,
                              memoData: {
                                ...values.memoData,
                                recipients: {
                                  ...values.memoData.recipients,
                                  departmentId: item.employeeDeptId,
                                },
                              },
                            })
                          }
                          key={i}
                          className={classes.menuItem}>
                          {item.deptName}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className={classes.formWrapper}>
                    <TypographyH5 className={classes.formTitle}>
                      Body:
                    </TypographyH5>
                  </div>
                  <div style={{ gridColumn: '2/10' }}>
                    <InputForEmployeePage
                      placeholder="Enter Here"
                      fullWidth
                      name="body"
                      onChange={handleChange('body')}
                      value={values?.memoData?.body}
                      style={{
                        fontStyle: 'italic',
                        padding: ' 0',
                      }}
                      size="small"
                      type="text"
                      fullWidth
                      multiline
                      rows={12}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: '2/10',
                      display: 'flex',
                      marginBottom: '1rem',
                    }}>
                    <PrimaryButton
                      style={{ marginRight: '15px', height: '45px' }}
                      onClick={handleSubmit}>
                      Send Memo
                    </PrimaryButton>
                  </div>

                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={success}
          classes={{
            container: classes.dialogContainer,
            paper: classes.dialogPaper,
          }}
          disableBackdropClick>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => history.push('/dashboard/memo')}>
            Add Memo
          </DialogTitle>
          <DialogContent dividers>
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Memo Sent</DialogTypography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
