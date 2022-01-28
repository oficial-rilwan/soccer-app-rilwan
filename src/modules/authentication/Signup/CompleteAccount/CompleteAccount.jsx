import { useState } from 'react';
import backendUrl from '../../../../.config';
import MailBox from '../../../../lib/assets/icons/mailbox.svg';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import InputComp from 'lib/components/InputComp';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../../redux/actions/userActions';
import Loader from 'react-loaders';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { completeProfileData } from 'site-constants';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  contentSection: {
    margin: '.7rem 3rem',
    [theme.breakpoints.down('sm')]: {
      margin: '.7rem .3rem',
    },
  },
  imgCard: {
    marginTop: '4rem',
    textAlign: 'center',
  },
  error: {
    verticalAlign: 'middle',
    margin: theme.spacing(1),
  },
}));

export default function CompleteAccount({ setRoute }) {
  let { completeProfile } = userActions;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { schema } = completeProfileData;
  const {
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      otp: '',
    },
  });

  const [values, setValues] = useState({
    data: {
      otp: '',
    },
    error: '',
  });
  const [OTPData, setOTPData] = useState('');

  // const [redirectToPlans, setRedirectToPlans] = useState(false);
  const [error, setErrors] = useState('');
  const UserData = useSelector((state) => state?.auth);
  const GoogleData = useSelector((state) => state?.loginStats);

  // dispatch(
  //   completeProfile(
  //     GoogleData?.googleUser?.userId || UserData?.user?.subAdminId,
  //     data,
  //     setErrors,
  //   ),
  // );
  const userInfo = JSON.parse(localStorage.getItem('jureb-user-info'));
  const handleBtnClick = async (data) => {
    try {
      const res = await axios.put(
        `${backendUrl.baseUrl}/api/v1/user/auth/otp-verification`,
        { code: data.otp, email: userInfo.email },
      );
      try {
        const authToken = await axios.post(
          `${backendUrl.baseUrl}/api/v1/user/auth/auth-tokens`,
          { email: userInfo.email, password: userInfo.password },
        );
        authToken &&
          localStorage.setItem(
            'jureb-user-token',
            JSON.stringify(authToken?.data?.data?.accessToken),
          );
        console.log(authToken);
        authToken && setRoute('OrgInformation');
      } catch (error) {
        console.log(error?.response?.data);
      }
      console.log(res);
    } catch (error) {
      setOTPData(error?.response?.data?.message);
      console.log(error?.response?.data);
      console.log(error?.response?.data);
    }
    // setRoute('OrgInformation');
  };

  // if (UserData?.path == '/plans') {
  //   return <Redirect to={'/plans'} />;
  // }
  useEffect(() => {
    OTPData && window.scroll(0, 0);
  }, [OTPData]);
  return (
    <>
      {GoogleData?.isLoading || UserData?.isLoading ? (
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
          <div className={classes.imgCard}>
            <img src={MailBox} alt="Mail-box" />
          </div>
          {OTPData && (
            <Alert style={{ marginBottom: '1rem' }} severity="error">
              {OTPData}
            </Alert>
          )}
          <form onSubmit={handleSubmit(handleBtnClick)}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              {`Check your email address ${userInfo?.email} for your OTP.`}
            </Typography>
            <div style={{ margin: '1rem 0rem' }}>
              <Controller
                name="otp"
                control={control}
                render={({ ref, ...props }) => {
                  return (
                    <InputComp
                      required
                      variant="outlined"
                      placeholder="Enter OTP..."
                      fullWidth
                      label="OTP Verification"
                      error={
                        values.error.substring(0, 3) == 'OTP' ||
                        !!errors['otp'] ||
                        error
                      }
                      helperText={
                        values.error || errors['otp']?.message || error
                      }
                      inputRef={ref}
                      inputProps={{ maxLength: 6 }}
                      {...props}
                    />
                  );
                }}
              />
            </div>
            <Typography variant="h6" style={{ textAlign: 'center' }}>
              Did not receive an OTP?
              <a
                // onClick={handleBtnClick}
                style={{
                  textDecoration: 'none',
                  marginLeft: '.3rem',
                  cursor: 'pointer',
                }}>
                Request again
              </a>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disableElevation
              type="submit"
              style={{ margin: '.7rem 0rem' }}>
              Proceed
            </Button>
            <Typography variant="h6" style={{ textAlign: 'center' }}>
              By submitting this form, I agree that Jureb may contact me to help
              me complete the creation of my account.
            </Typography>
          </form>
        </section>
      )}
    </>
  );
}
