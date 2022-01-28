import { useState } from 'react';
import { FormControl, Paper, InputAdornment } from '@material-ui/core';
import Reveal from 'react-reveal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputComp from 'lib/components/InputComp';
import Select from '@material-ui/core/Select';
import Menu from 'lib/components/Menu/Menu';
import Button from '@material-ui/core/Button';
import { PublishRounded } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '46rem',
    height: 'auto',
    borderRadius: '6px',
    margin: '1rem',
    [theme.breakpoints.down('sm')]: {
      // width: '4rem',
    },
  },
  heading: {
    fontFamily: 'OpenSansRegular',
    margin: '3.5rem 0rem 0rem',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '1.2rem 0rem',
    },
  },
  formContainer: {
    padding: '.5rem 9rem',
    [theme.breakpoints.down('md')]: {
      padding: '.5rem 6rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '.5rem 2rem',
    },
  },
  nameFields: {
    display: 'grid',
    justifyContent: 'space-between',
    padding: '.8em 0rem 0rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '2rem',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  formFields: {
    padding: '.2rem 0rem',
  },
  gridForm: {
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '2rem',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  profilePic: {
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
  },
}));

export default function Invites() {
  const classes = useStyles();
  const [role, setRole] = useState('');

  const [values, setValues] = useState({
    data: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      telephone: '',
      taxNo: '',
      address: '',
      profile_pic: '',
      password: '',
    },
    error_msg: '',
    title: '',
    confirmPassword: '',
    server_msg: '',
  });

  const validate = (val, errMessage) => {
    // const valid = new RegExp(pattern).test(val);
    // const valid = val.length == 5;
    return valid ? '' : errMessage;
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;

    const error = validate(value, errMessage, pattern);
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  return (
    <>
      <Menu />
      <section
        style={{
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fbfbfe',
        }}>
        <Paper elevation={13} className={classes.paper}>
          <Typography variant="h2" className={classes.heading}>
            Join Dangote as an HR Admin
          </Typography>
          <div className={classes.formContainer}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              You were invited to join the Fresible Jureb account as an HR
              Admin. Fill in your details below to gain access
            </Typography>
            <div>
              <div className={classes.nameFields}>
                <InputComp
                  required
                  label="First Name"
                  type="text"
                  size="medium"
                  fullWidth
                  inputProps={{ maxLength: 27 }}
                  helperText={
                    values.error_msg.substring(0, 5) == 'First'
                      ? values.error_msg
                      : ''
                  }
                  error={values.title == 'firstName' ? true : false}
                  onChange={handleChange('firstName')}
                />
                <InputComp
                  required
                  label="Last Name"
                  type="text"
                  inputProps={{ maxLength: 27 }}
                  size="medium"
                  fullWidth
                  helperText={
                    values.error_msg.substring(0, 4) == 'Last'
                      ? values.error_msg
                      : ''
                  }
                  error={values.title == 'lastName' ? true : false}
                  onChange={handleChange('lastName')}
                />
              </div>
              <div className={classes.formFields}>
                <InputComp
                  label="Email Address"
                  required
                  fullWidth
                  size="medium"
                  type="email"
                  placeholder="Prefilled"
                  helperText={
                    values.error_msg.substring(0, 5) === 'Email'
                      ? values.error_msg
                      : false
                  }
                  error={values.title === 'email' ? true : false}
                  onChange={handleChange('email')}
                  inputProps={{ maxLength: 35 }}
                />
              </div>
              <div className={classes.gridForm}>
                <div style={{ padding: '.4rem 0' }}>
                  <FormControl fullWidth>
                    <Typography variant="h6">
                      Sex
                      <span
                        style={{
                          color: '#ed1818',
                          top: '2px',
                          position: 'relative',
                          left: '4px',
                        }}>
                        *
                      </span>
                    </Typography>
                    <SelectComp
                      label="Gender"
                      handleSelectChange={handleSelectChange('gender')}
                      value={values.data.gender}
                      menuItem={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                      ]}
                    />
                  </FormControl>
                </div>
                <div>
                  <InputComp
                    required
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    onChange={handleChange('dateOfBirth')}
                  />
                </div>
                <FormControl fullWidth>
                  <InputComp
                    required
                    fullWidth
                    label="Telephone Number"
                    type="text"
                    placeholder={'Phone number'}
                    inputProps={{ maxLength: 11 }}
                    onChange={handleChange('telephone')}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputComp
                    required
                    fullWidth
                    label="Tax identification Number"
                    type="text"
                    placeholder={'Tax number'}
                    onChange={handleChange('taxNo')}
                  />
                </FormControl>
              </div>
              <InputComp
                required
                fullWidth
                label="Home Address"
                type="text"
                placeholder={'Your home address'}
                onChange={handleChange('address')}
              />
              <input
                accept="image/*"
                type="file"
                style={{ display: 'none' }}
                id="profile_picture"
                onChange={handleChange('profile_pic')}
              />
              <label htmlFor="profile_picture">
                <InputComp
                  required
                  label="Upload Profile Picture"
                  fullWidth
                  placeholder={
                    values?.data?.profile_pic
                      ? values.data.profile_pic
                      : 'Upload profile picture'
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublishRounded />
                      </InputAdornment>
                    ),
                  }}
                  className={classes.profilePic}
                  disabled
                  helperText={
                    values.error_msg.substring(0, 7) == 'Profile'
                      ? values.error_msg
                      : ''
                  }
                  error={values.title == 'profile_pic' ? true : false}
                />
              </label>
              <InputComp
                required
                fullWidth
                label="Password"
                type="password"
                inputProps={{ maxLength: 35 }}
                helperText={
                  values.error_msg.substring(0, 8) === 'Password'
                    ? values.error_msg
                    : false
                }
                placeholder="**********"
                error={values.title === 'password' ? true : false}
                onChange={handleChange('password')}
              />
              <InputComp
                required
                fullWidth
                label="Confirm password"
                type="password"
                inputProps={{ maxLength: 35 }}
                helperText={
                  values.error_msg.substring(0, 9) === 'Passwords'
                    ? values.error_msg
                    : false
                }
                placeholder="**********"
                error={values.title === 'confirmPassword' ? true : false}
                onChange={handleChange('confirmPassword')}
              />
            </div>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              color="primary"
              style={{ margin: '2rem 0rem 0rem' }}
              onClick={() => console.log(values.data)}>
              Create My Account
            </Button>
            <span style={{ textAlign: 'center' }}>
              <Typography variant="h6" style={{ padding: '.6rem 0rem' }}>
                By submitting this form, I agree to the Jureb
                <a
                  href="/terms-and-conditions"
                  style={{ textDecoration: 'none', margin: '0 .3rem' }}>
                  terms and conditions
                </a>
              </Typography>
            </span>
          </div>
        </Paper>
      </section>
    </>
  );
}
