import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import CheckMark from '../../lib/assets/icons/checkmark.svg';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputComp from 'lib/components/InputComp';
import CloseModal from '../../lib/assets/icons/Path.svg';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Menu from 'lib/components/Menu/Menu';
import { Redirect, useHistory } from 'react-router-dom';
import userActions from 'redux/actions/userActions';
import './Payments.scss';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector, useDispatch } from 'react-redux';

const { userVerified } = userActions;

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '55rem',
    height: 'auto',
    borderRadius: '15px',
    margin: '1rem',
  },
  gridCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    margin: '2rem 3rem',
    borderRadius: '5px',
    height: '30rem',

    [theme.breakpoints.down('752')]: {
      display: 'block',
      margin: '0rem 3rem',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: '0rem 2rem',
    },
  },
  gridCardsContents: {
    padding: '0rem 2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0rem',
    },
  },
  atmCardWrapper: {
    backgroundColor: '#FBFBFB',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('752')]: {
      display: 'none',
    },
  },
  atmCard: {
    background: 'linear-gradient(225deg, #539BEE 0%, #5D75DE 100%)',
    boxShadow: '0px 2px 9px rgba(74, 144, 226, 0.5)',
    borderRadius: '9px',
    height: '12.3rem',
    width: '90%',
  },
  atmCardNo: {
    border: '1px solid #fff',
    borderRadius: '5px',
    width: '75%',
    height: '2.5rem',
    margin: '4.8rem 1.2rem 0rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading1: {
    fontFamily: 'MontessaratBold',
    padding: '2rem 0rem',
    [theme.breakpoints.down('752')]: {
      textAlign: 'center',
      padding: '1rem 0rem',
    },
  },
  subText: {
    padding: '1rem 4.5rem',
    [theme.breakpoints.down('752')]: {
      padding: '.8rem 0rem',
      fontSize: '0.799rem',
    },
  },
  cardFields: {
    padding: '.3rem 0rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gap: '1rem',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      padding: '.3rem 0rem',
    },
    [theme.breakpoints.down('760')]: {
      gap: '.7rem',
    },
  },
  cardDetails: {
    [theme.breakpoints.down('xs')]: {
      padding: '.4rem 0rem',
    },
  },
  discountStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gap: '.4rem',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  actBtnWrapper: {
    margin: '0rem 5rem',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '7rem 2rem 0rem',
    },
  },
  paymentIcon: {
    [theme.breakpoints.down('xs')]: {
      width: '14rem',
    },
  },
  paymentText: {
    textAlign: 'center',
    fontFamily: 'MontessaratSemiBold',
    fontSize: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1rem',
    },
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Payments(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  // const { userDetails } = props.location.state;
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    data: {
      nameOnCard: '',
      securityCode: '',
      expiresOn: '',
      cardNumber: '',
    },
  });

  const UserData = useSelector((state) => state?.auth);
  let { subAdminId } = UserData.user;
  let { data } = UserData;

  const handlePayment = () => {
    authClient
      .post(`/api/v1/card/create?subAdminId=${subAdminId}`, {
        nameOnCard: values.data.nameOnCard,
        securityCode: values.data.securityCode,
        expiresOn: values.data.expiresOn,
        cardNumber: String(values.data.cardNumber).split(' ').join(''),
      })
      .then((response) => {
        if (response.status == 201) {
          // dispatch(userVerified());
          setOpen(true);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleChange = (name) => (event) => {
    let { value } = event.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  // if (UserData.verified) {
  //   return <Redirect to="/dashboard" />;
  // }

  let today = new Date();
  today.setDate(today.getDate() + 30);

  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;

  const history = useHistory();

  if (values.redirectToDashboard) {
    return <Redirect to="/dashboard" />;
  }

  if (redirect) {
    return <Redirect to={'/plans'} />;
  }

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
          <div
            style={{
              margin: '0.9rem 1.6rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <IconButton onClick={() => setRedirect(true)}>
              <img
                src={CloseModal}
                alt={'Close Modal'}
                style={{ width: '1rem' }}
              />
            </IconButton>
          </div>
          <Typography
            variant="h1"
            style={{
              textAlign: 'center',
              fontSize: '1.7rem',
              fontFamily: 'OpenSansRegular',
            }}>
            Payment
          </Typography>
          <Typography
            variant="h4"
            style={{ textAlign: 'center', margin: '.4rem 0rem' }}>
            Start your 30 days free trial
          </Typography>
          <div className={classes.gridCards}>
            <div className={classes.gridCardsContents}>
              <Typography variant="h4" className={classes.heading1}>
                Add your payment on record
              </Typography>
              <InputComp
                labelStyle={{
                  fontFamily: 'MontessaratSemiBold',
                  fontSize: '11px',
                }}
                label="Name on Card"
                style={{ padding: '.4rem 0rem' }}
                fullWidth
                onChange={handleChange('nameOnCard')}
              />
              <InputComp
                label="Card Number"
                labelStyle={{
                  fontFamily: 'MontessaratSemiBold',
                  fontSize: '11px',
                }}
                style={{ padding: '.4rem 0rem' }}
                fullWidth
                onChange={handleChange('cardNumber')}
                inputProps={{ maxLength: '19' }}
              />
              <div className={classes.cardFields}>
                <div className={classes.cardDetails}>
                  <InputComp
                    label="Expires on"
                    labelStyle={{
                      fontFamily: 'MontessaratSemiBold',
                      fontSize: '11px',
                    }}
                    placeholder="MM/YY"
                    inputProps={{ maxLength: '5' }}
                    fullWidth
                    onChange={handleChange('expiresOn')}
                  />
                </div>
                <div className={classes.cardDetails}>
                  <InputComp
                    labelStyle={{
                      fontFamily: 'MontessaratSemiBold',
                      fontSize: '11px',
                    }}
                    label="Security Code (CVC)"
                    placeholder="CVC"
                    inputProps={{ maxLength: '3' }}
                    fullWidth
                    onChange={handleChange('securityCode')}
                  />
                </div>
              </div>
              <div className={classes.discountStats}>
                <InputComp
                  labelStyle={{
                    fontFamily: 'MontessaratSemiBold',
                    fontSize: '11px',
                  }}
                  label="Discount Code"
                  placeholder="Discount code"
                  fullWidth
                />
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: 'MontessaratSemiBold',
                    fontSize: '10px',
                    alignSelf: 'self-end',
                  }}>
                  15% Discount Code Applied
                </Typography>
              </div>
              <div
                style={{
                  margin: '1.5rem 0rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '.5rem',
                }}>
                <Button
                  variant="outlined"
                  disableElevation
                  style={{
                    height: '2.6rem',
                    border: 'none',
                    fontFamily: 'MontessaratSemiBold',
                    fontSize: '12px',
                  }}
                  onClick={() => setRedirect(true)}
                  fullWidth>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  style={{
                    backgroundColor: '#4A90E2',
                    height: '2.6rem',
                    fontFamily: 'MontessaratSemiBold',
                    fontSize: '12px',
                  }}
                  onClick={handlePayment}>
                  Pay Now
                </Button>
                <Dialog open={open} disableBackdropClick>
                  <DialogContent>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '19rem',
                      }}>
                      <img
                        src={CheckMark}
                        alt="Check Box"
                        className={classes.paymentIcon}
                      />
                    </div>
                    <Typography variant="h2" className={classes.paymentText}>
                      Payment Successful
                    </Typography>
                    <div
                      style={{
                        height: '6rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        style={{
                          backgroundColor: '#4A90E2',
                          height: '2.6rem',
                          fontFamily: 'MontessaratSemiBold',
                          fontSize: '12px',
                        }}
                        onClick={() =>
                          setValues({ ...values, redirectToDashboard: true })
                        }>
                        Continue to dashboard
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className={classes.atmCardWrapper}>
              <div className={classes.atmCard}>
                <div className={classes.atmCardNo}>
                  <Typography
                    variant="h3"
                    style={{ textAlign: 'center', color: '#fff' }}>
                    {values.data.cardNumber}
                  </Typography>
                </div>
                <div
                  style={{
                    margin: '1.7rem 1.2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <Typography
                    variant="h6"
                    style={{
                      textTransform: 'uppercase',
                      color: '#fff',
                      fontFamily: 'OpenSansSemiBold',
                    }}>
                    {values.data.nameOnCard}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      textTransform: 'uppercase',
                      color: '#fff',
                      fontFamily: 'OpenSansSemiBold',
                    }}>
                    {values.data.expiresOn}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.actBtnWrapper}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              style={{
                backgroundColor: '#4A90E2',
                width: '70%',
                height: '2.7rem',
                fontFamily: 'OpenSansRegular',
                textTransform: 'none',
                fontSize: '1rem',
              }}
              onClick={() => history.push('/dashboard')}>
              Skip and Pay Later
            </Button>
            <Typography variant="h5" className={classes.subText}>
              You will be charged for the sum of{' '}
              {data.duration == 'Monthly' && data.planType == 'Advance'
                ? '15,000'
                : data.duration == 'Annually' && data.planType == 'Advance'
                ? '165,000'
                : data.duration == 'Monthly' && data.planType == 'Basic'
                ? '5,000'
                : data.duration == 'Annually' && data.planType == 'Basic'
                ? '55,000'
                : data.duration == 'Monthly' && data.planType == 'Standard'
                ? '10,000'
                : data.duration == 'Annually' && data.planType == 'Standard'
                ? '110,000'
                : ''}{' '}
              naira on the{' '}
              {`${today.getUTCDate()} of ${monthName(
                today,
              )}, ${today.getUTCFullYear()}`}
              . You can cancel anytime before then.
            </Typography>
          </div>
        </Paper>
      </section>
    </>
  );
}
