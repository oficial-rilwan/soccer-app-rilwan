import { ReactComponent as Google } from '../../../../lib/assets/icons/google.svg';
import { ReactComponent as Facebook } from '../../../../lib/assets/icons/facebook.svg';
import backendUrl from '../../../../.config';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import AppleSignin from 'react-apple-signin-auth';
import userActions from '../../../../redux/actions/userActions';
import Loader from 'react-loaders';
import InputComp from 'lib/components/InputComp';
import { Redirect } from 'react-router';
import { useMediaQuery } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authActions from 'redux/actions/authActions';
import { createAccount } from 'site-constants';
import { Link } from 'react-router-dom';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { ReactComponent as Apple } from 'lib/assets/icons/apple.svg';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const { googleSignin, facebookSignin } = authActions;

const useStyles = makeStyles((theme) => ({
  contentSection: {
    margin: '.7rem 3rem',
    [theme.breakpoints.down('sm')]: {
      margin: '.7rem .3rem',
    },
  },
  formContainer: {
    padding: '.5rem 2.5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
  nameFields: {
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '.6rem',
    padding: '.4rem 0rem',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '.4rem 0rem',
    },
  },
  actBtn: {
    display: 'flex',
    fontSize: '.8rem',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  actIcon: {
    marginRight: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: '1.5rem',
    },
  },
  actionBtn: {
    backgroundColor: '#fff',
    border: '1px solid #F0F2F7',
    margin: '0.5rem 0rem',
    '&:hover': {
      backgroundColor: '#fff',
    },
    [theme.breakpoints.down('768')]: {
      padding: '0.5rem 0rem',
      margin: '0.5rem 0rem',
    },
  },
  accountSignin: {
    textAlign: 'center',
    margin: '.8rem 0 0',
  },
  createBtn: {
    marginTop: '.5rem',
    borderRadius: '5px',
    lineHeight: '1.9',
    textTransform: 'none',
    fontFamily: 'OpenSansRegular',
  },
  horizontalLine: {
    width: '100%',
    margin: 'auto',
    gridColumn: ' 4 / 6',
  },
  checkboxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  acknowledgeText: {
    textAlign: 'center',
    padding: '.8rem 0rem',
  },
  lineWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr repeat(3, 1fr) 1fr',
    justifyContent: 'space-between',
    padding: '.5rem 0',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 0',
    },
  },
  icon: {
    margin: '0 10px',
  },
}));

export default function CreateAccount({ nextView, setRoute, setUserDetails }) {
  const classes = useStyles();
  // const { signup } = userActions;
  const { login } = authActions;
  const dispatch = useDispatch();
  const theme = useTheme();
  const { schema } = createAccount;
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { handleSubmit, errors, setValue, setError, control, watch } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');

  const User = useSelector((state) => state?.auth);
  const GoogleData = useSelector((state) => state?.loginStats);
  const loginStats = useSelector((state) => state?.loginStats);
  let { isLoading, path } = User;

  const [values, setValues] = useState({
    data: {
      email: '',
      password: '',
      lastName: '',
      firstName: '',
      newsletter: false,
    },
    title: '',
    error_msg: '',
    confirmPassword: '',
    server_msg: '',
  });

  const [error, setErrors] = useState('');
  const [apiError, setApiError] = useState('');
  // useEffect(() => {
  //   if (User.nextTab == 'Profile' || GoogleData.nextTab == 'Profile') {
  //     nextView('Profile-Information');
  //   } else if (User.nextTab == 'Complete' || GoogleData.nextTab == 'Complete') {
  //     nextView('Complete-Profile');
  //   }
  // }, [User.nextTab, GoogleData.nextTab]);

  const componentClicked = () => {};

  const handleLogin = (googleData) => {
    const id_token = googleData?.tokenObj?.id_token;
    const access_token = googleData?.tokenObj?.access_token;
    dispatch(googleSignin({ id_token, access_token }, setErrors, 'Profile'));
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  // const handleAppleSignIn = (appleUserData) => {
  //   console.log(appleUserData);

  // const {user, authorization} = appleUserData;
  // dispatch(appleSignIn({ id_token, access_token }, setErrors));
  // };
  // const handleConfirmPassword = (e) => {
  //   let { value } = e.target;
  //   setValues({ ...values, confirmPassword: value });
  // };

  const handleClick = async (data) => {
    const values = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        `${backendUrl.baseUrl}/api/v1/user/auth/signup`,
        data,
      );
      res && setRoute('Verification');
      console.log(res, data);
      res && localStorage.setItem('jureb-user-info', JSON.stringify(values));
    } catch (error) {
      console.log(error?.response?.data?.message[0]?.email);
      setApiError(error?.response?.data?.message[0]?.email);
    }
    // setRoute('Verification');
  };

  useEffect(() => {
    apiError && window.scroll(0, 0);
  }, [apiError]);

  // if (User.verified || loginStats?.googleUser?.emailVerified) {
  //   return <Redirect to="/dashboard" />;
  // }
  // if (path == '/plans') {
  //   return <Redirect to={'/plans'} />;
  // }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '42rem',
            textAlign: 'center',
          }}>
          <Loader type="ball-rotate" color="#2F49D0" />
        </div>
      ) : (
        <section className={classes.contentSection}>
          <Typography
            variant="h3"
            style={{ textAlign: 'center', paddingTop: '.5rem' }}>
            Get Started with a Free Account
          </Typography>
          <Typography
            component="p"
            style={{
              textAlign: 'center',
              padding: matchesXs ? '1.5rem 0' : '.5rem',
            }}>
            You Selected the Free Plan: Get access to a demo account. Please
            note that a demo account has a watermark feature on all documents
          </Typography>
          {apiError && <Alert severity="error">{apiError}</Alert>}
          <form onSubmit={handleSubmit(handleClick)}>
            <div className={classes.formContainer}>
              <div className={classes.nameFields}>
                <Controller
                  name="firstName"
                  control={control}
                  render={(props) => {
                    const { ref } = props;
                    return (
                      <InputComp
                        required
                        label="First Name"
                        type="text"
                        size="medium"
                        name="firstName"
                        fullWidth
                        helperText={errors['firstName']?.message}
                        error={!!errors['firstName']}
                        inputRef={ref}
                        {...props}
                      />
                    );
                  }}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={(props) => {
                    const { ref } = props;
                    return (
                      <InputComp
                        required
                        label="Last Name"
                        type="text"
                        size="medium"
                        name="lastName"
                        fullWidth
                        helperText={errors['lastName']?.message}
                        error={!!errors['lastName']}
                        inputRef={ref}
                        {...props}
                      />
                    );
                  }}
                />
              </div>

              <Controller
                name="email"
                control={control}
                render={(props) => (
                  <InputComp
                    label="Email Address"
                    required
                    fullWidth
                    name="email"
                    size="medium"
                    type="email"
                    helperText={errors['email']?.message || error}
                    error={!!errors['email'] || error}
                    inputRef={props.ref}
                    {...props}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={(props) => (
                  <InputComp
                    label="Password"
                    fullWidth
                    required
                    type="password"
                    helperText={errors['password']?.message}
                    inputProps={{ minLength: 6 }}
                    placeholder="**********"
                    error={!!errors['password']}
                    inputRef={props.ref}
                    {...props}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={(props) => (
                  <InputComp
                    label="Confirm Password"
                    type="password"
                    required
                    fullWidth
                    placeholder="**********"
                    helperText={
                      watchConfirmPassword !== watchPassword
                        ? "Passwords don't match"
                        : errors['confirmPassword']
                        ? errors['confirmPassword'].message
                        : ''
                    }
                    error={
                      watchConfirmPassword !== watchPassword ||
                      !!errors['confirmPassword']
                    }
                    {...props}
                  />
                )}
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disableElevation
                className={classes.createBtn}>
                Create My Account
              </Button>
              <Typography component="p" className={classes.acknowledgeText}>
                By submitting this form, I agree that Jureb may contact me to
                help me complete the creation of my account.
              </Typography>
              <div className={classes.checkboxWrapper}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    color="primary"
                    onClick={() =>
                      setValues({
                        ...values,
                        data: {
                          ...values.data,
                          newsletter: !values.data.newsLetter,
                        },
                      })
                    }
                  />
                  <Typography component="p">
                    I’m not interested in update about products and services.
                  </Typography>
                </label>
              </div>
            </div>
          </form>

          <div className={classes.lineWrapper}>
            <hr
              style={{
                width: '100%',
                margin: 'auto',
                gridColumn: '1 / 3',
              }}
            />

            <Typography
              variant="h4"
              style={{ textAlign: 'center', gridColumn: 3 }}>
              or
            </Typography>
            <hr className={classes.horizontalLine} />
          </div>
          <div className={classes.actBtn}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign up with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <Button
                  variant="contained"
                  onClick={renderProps.onClick}
                  fullWidth
                  disableElevation
                  style={{ marginRight: matchesXs ? 0 : '1rem' }}
                  className={classes.actionBtn}>
                  <Google className={classes.icon} />
                  <Typography component="p">Sign up with Google</Typography>
                </Button>
              )}
            />
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={true}
              fields="name,email,picture"
              textButton="Sign up with Facebook"
              onClick={componentClicked}
              callback={responseFacebook}
              autoLoad={false}
              render={(renderProps) => (
                <Button
                  variant="contained"
                  onClick={renderProps.onClick}
                  fullWidth
                  disableElevation
                  style={{ marginLeft: matchesXs ? 0 : '1rem' }}
                  className={classes.actionBtn}>
                  <Facebook className={classes.icon} />
                  <Typography component="p">Sign up with Facebook</Typography>
                </Button>
              )}
            />
          </div>
          <div>
            <AppleSignin
              /** Auth options passed to AppleID.auth.init() */

              authOptions={{
                /** Client ID - eg: 'com.example.com' */
                clientId: 'com.jureb.signin',
                /** Requested scopes, seperated by spaces - eg: 'email name' */
                scope: 'email name',
                redirectURI: 'https://jureb.com',
                /** State string that is returned with the apple response */
                state: 'success state',
                /** Nonce */
                nonce: 'nonce1',
                usePopup: true,
              }} // REQUIRED
              /** General props */
              uiType="dark"
              /** className */
              className="apple-auth-btn"
              /** Removes default style tag */
              noDefaultStyle={false}
              /** Allows to change the button's children, eg: for changing the button text */
              buttonExtraChildren="Sign up with Apple"
              onSuccess={(response) => {
                console.log(response);
                // const user2 = response.user;
                const authorization = response.authorization;
                dispatch(appleSignIn({ user, authorization }, setErrors));
              }}
              onError={(error) => {
                console.log(error);
              }}
              render={(props) => (
                <Button
                  fullWidth
                  disableElevation
                  style={{
                    backgroundColor: '#000',
                    width: '100%',
                    color: '#fff',
                    textTransform: 'none',
                    margin: '.5rem 0',
                  }}
                  {...props}>
                  <Apple />
                  <TypographyH5 style={{ margin: '.5rem 2rem .5rem' }}>
                    Sign up with Apple
                  </TypographyH5>
                </Button>
              )}
            />
          </div>
          <Typography component="p" className={classes.accountSignin}>
            Already have an account?{' '}
            <Link
              style={{ textDecoration: 'none', color: '#2F49D0' }}
              to="/signin">
              Sign in
            </Link>
          </Typography>
        </section>
      )}
    </>
  );
}
