import { useContext, useEffect, useState } from 'react';
import './SignIn.scss';
import Button from '@material-ui/core/Button';
import Error from '@material-ui/icons/Error';
import Google from '../../../lib/assets/icons/google.svg';
import Facebook from '../../../lib/assets/icons/facebook.svg';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Reveal from 'react-reveal/Reveal';
import { Link, Redirect, useHistory } from 'react-router-dom';
import InputComp from 'lib/components/InputComp';
import Menu from 'lib/components/Menu/Menu';
import GoogleLogin from 'react-google-login';
import AppleSignin from 'react-apple-signin-auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useSelector, useDispatch } from 'react-redux';
import authActions from 'redux/actions/authActions';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'site-constants';
import { ReactComponent as Apple } from 'lib/assets/icons/apple.svg';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import userActions from 'redux/actions/userActions';
import axios from 'axios';
import { LoginCall } from 'context/authContext/AuthApiCall';
import { LoginContext } from 'context/authContext/AuthContext';
import { Alert } from '@material-ui/lab';

const { clearHistory } = userActions;

const { schema } = signIn;

const { login, googleSignin, appleSignIn } = authActions;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fbfbfe',
    flexGrow: 1,
    height: '91vh',
    padding: '1.2rem 0rem',
    [theme.breakpoints.down('sm')]: {
      height: '94vh',
      padding: '2rem 0.5rem',
    },
  },
  container: {
    height: 'auto',
    alignItems: 'center',
  },
  card: {
    height: 'inherit',
    width: 550,
    borderRadius: 15,
  },
  wrapper: {
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1.3rem 0rem',
    },
  },
  contentSection: {
    margin: '2rem 3rem',
    [theme.breakpoints.down('sm')]: {
      margin: '2rem 1.5rem',
    },
  },
  formContainer: {
    padding: '1rem 1.5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '2.5rem 0rem',
    },
  },
  actIcon: {
    marginRight: '1.5rem',
  },
  error: {
    verticalAlign: 'middle',
    margin: theme.spacing(1),
  },
  disabled: {
    opacity: '.5',
    cursor: 'not-allowed !important',
    pointerEvents: 'all !important',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginStats = useSelector((state) => state?.loginStats);
  const [values, setValues] = useState({
    data: {
      email: '',
      password: '',
    },
    title: '',
    error_msg: '',
    server_msg: '',
  });

  const [error, setErrors] = useState('');

  const { handleSubmit, errors, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  // Login Form
  const history = useHistory();

  const {
    loginUser,
    loading,
    error: loginError,
    dispatch: loginDispatch,
  } = useContext(LoginContext);

  const handleBtnClick = async (data) => {
    // dispatch(login(data, setErrors));
    // setTimeout(() => {
    //   setErrors('');
    // }, 5000);
    console.log(data);
    LoginCall({ email: data.email, password: data.password }, loginDispatch);

    if (loginUser) {
      history.push('/dashboard');
    }
  };

  // ///////////////////////////

  const handleLogin = (googleData) => {
    const id_token = googleData?.tokenObj?.id_token;
    const access_token = googleData?.tokenObj?.access_token;
    dispatch(googleSignin({ id_token, access_token }, setErrors));
  };
  const handleAppleSignIn = (appleUser, id_token) => {
    console.log(appleUser);
    const { user, authorization } = appleUser;

    // dispatch(appleSignIn({ user, authorization }, setErrors));
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  const componentClicked = () => {};

  useEffect(() => {
    dispatch(clearHistory());
  }, []);

  // Still need to review this actually

  if (loginStats?.redirect || loginStats.googleUser?.emailVerified) {
    // This logic checks to see if the user's google mail is registered in the database
    return <Redirect to="/dashboard" />;
  }
  if (loginStats?.googleUser?.emailVerified == false) {
    // If the email is not registered, it redirects to signup to handle profile creation
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <Menu />
      <Reveal>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container justify="center" className={classes.container}>
              <Paper elevation={13} className={classes.card}>
                <div className={classes.wrapper}>
                  <section className={classes.contentSection}>
                    <Typography variant="h3" style={{ textAlign: 'center' }}>
                      Welcome Back
                    </Typography>

                    {loginError && (
                      <Alert style={{ marginBottom: '1rem' }} severity="error">
                        {loginError.message}
                      </Alert>
                    )}

                    <div className={classes.formContainer}>
                      <form onSubmit={handleSubmit(handleBtnClick)}>
                        <Controller
                          name="email"
                          control={control}
                          render={(props) => (
                            <InputComp
                              label="Email Address"
                              required
                              type="email"
                              helperText={errors['email']?.message}
                              fullWidth
                              inputRef={props?.ref}
                              error={!!errors['email']}
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
                              required
                              fullWidth
                              type="password"
                              refs={props?.ref}
                              helperText={errors['password']?.message}
                              error={!!errors['password']}
                              {...props}
                            />
                          )}
                        />

                        {error && (
                          <Typography
                            component={'p'}
                            color="error"
                            style={{ textAlign: 'center' }}>
                            <Error className={classes.error} />
                            {error}
                          </Typography>
                        )}
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          type="submit"
                          disableElevation
                          // disabled={loginStats?.isLoading}
                          classes={{
                            disabled: classes.disabled,
                          }}
                          style={{
                            margin: '1rem 0rem',
                          }}>
                          Sign In
                        </Button>
                      </form>

                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: 'MontessaratRegular',
                          textAlign: 'center',
                        }}>
                        Forgot Password?
                        <a
                          href="#"
                          style={{
                            textDecoration: 'none',
                            marginLeft: '.3rem',
                          }}>
                          <Link to={'/forgot-password'}>Click here</Link>
                        </a>
                      </Typography>
                      <hr />
                      <Typography variant="h5" style={{ textAlign: 'center' }}>
                        Or
                      </Typography>
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
                              disabled={loginStats?.isLoading}
                              classes={{
                                disabled: classes.disabled,
                              }}
                              disableElevation
                              className="action-btn">
                              <img
                                className={classes.actIcon}
                                src={Google}
                                alt="Google"
                              />
                              <Typography component="p">
                                Sign in with Google
                              </Typography>
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
                              disabled={loginStats?.isLoading}
                              classes={{
                                disabled: classes.disabled,
                              }}
                              className="action-btn">
                              <img
                                className={classes.actIcon}
                                src={Facebook}
                                alt="Facebook"
                              />
                              <Typography component="p">
                                Sign in with Facebook
                              </Typography>
                            </Button>
                          )}
                        />
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
                              const user = response.user;
                              const authorization = response.authorization;
                              dispatch(
                                appleSignIn({ user, authorization }, setErrors),
                              );
                            }}
                            onError={(error) => console.log(error)}
                            render={(props) => (
                              <Button
                                fullWidth
                                disableElevation
                                style={{
                                  backgroundColor: '#000',
                                  color: '#fff',
                                  textTransform: 'none',
                                  margin: '.5rem 0',
                                }}
                                {...props}>
                                <Apple />
                                <TypographyH5
                                  style={{ margin: '.5rem 2rem .5rem' }}>
                                  Sign in with Apple
                                </TypographyH5>
                              </Button>
                            )}
                          />
                        </div>
                        <Typography
                          variant="h6"
                          style={{
                            textAlign: 'center',
                            marginTop: '1rem',
                            fontFamily: 'MontessaratRegular',
                          }}>
                          Don't have an account yet?
                          <Link
                            to="/signup"
                            style={{
                              textDecoration: 'none',
                              marginLeft: '.3rem',
                            }}>
                            Sign Up
                          </Link>
                        </Typography>
                      </div>
                    </div>
                  </section>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Reveal>
    </>
  );
}
