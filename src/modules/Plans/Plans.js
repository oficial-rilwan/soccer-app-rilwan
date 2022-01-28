import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Zoom } from 'react-reveal';
import { Button, IconButton, Paper, Switch } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import Menu from '../../lib/components/Menu/Menu';
import './Plans.scss';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector, useDispatch } from 'react-redux';
import userActions from 'redux/actions/userActions';
import Modal from 'lib/components/Modal/Modal';
import { GridContainer, GridItem } from 'modules/components/Grid';
import { ReactComponent as Card } from 'lib/assets/icons/card.svg';
import JurebLogo from '../../lib/assets/icons/brand_logo.png';
import { ReactComponent as Free } from 'lib/assets/icons/free.svg';
import { ReactComponent as ArrowRightWhite } from 'lib/assets/icons/arrowLeftwhite.svg';
import { ReactComponent as ArrowRight } from 'lib/assets/icons/arrowLeft.svg';
import { Close } from '@material-ui/icons';

const { plansData } = userActions;

const useStyles = makeStyles((theme) => ({
  textWrapper: {
    width: '35rem',
    height: '5.5rem',
    backgroundColor: '#5C83EE',
    borderRadius: ' 0px 0px 10px 10px;',
  },
  modal: { background: '#FFFFFF' },
  cardText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontweight: 'normal',
    fontsize: '17.5px',
    marginRight: '5px',
  },
  actionBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: '0px 8px 24px 0.694947px rgba(51, 63, 81, 0.15)',
    padding: '10px 10px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  modalSubText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '9px',
    textAlign: 'center',
    color: '#878181',
    marginBottom: '30px',
  },

  ModalHeader: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '25px',
    textAlign: 'center',
    color: '#000000',
    textAlign: 'center',
    marginBottom: '30px',
  },

  heading1: {
    textAlign: 'center',
    padding: '1rem',
  },
  heading2: {
    padding: '.7rem 0rem 0rem',
    color: '#fff',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 0rem 0rem',
    textAlign: 'center',
  },
  cardHolder: {
    flexGrow: 1,
  },
  listItem: {
    margin: '.5rem 0rem',
  },
  paper: {
    width: '18rem',
    height: '25rem',
    textAlign: 'center',
    padding: '2rem',
    cursor: 'pointer',
    borderRadius: '10px',
    ' &:hover': {
      boxShadow:
        '10px 7px 8px -4px rgba(0, 0, 0, 0.2) 10px 13px 19px 2px rgba(0, 0, 0, 0.14) 0px 8px 24px 4px rgba(0, 0, 0, 0.12)',
    },
    [theme.breakpoints.down(768)]: {
      width: '17rem',
      height: '24rem',
    },
    [theme.breakpoints.down(768)]: {
      width: '15rem',
      height: '25.5rem',
    },
  },
}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(36px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#5C83EE',
        border: '1px solid #ccc',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

// Styled Components
const Header = styled.div`
  width: 100%;
  font-family: 'Rubik';
`;
const Logo = styled.div`
  & .top-logo {
    max-width: 100px;
    object-fit: cover;
    margin-top: 14px;
    margin-left: 20px;
    @media (max-width: 900px) {
      display: none;
    }
  }
`;
const Banner = styled.div`
  width: 25rem;
  height: 108px;
  background-color: #5c83ee;
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  @media (max-width: 500px) {
    width: 100%;
  }
  & p {
    color: #fff;
  }
  & p:nth-child(1) {
    margin-bottom: 10px;
  }
  & p:nth-child(2) {
    font-size: 20px;
  }
`;

const Content = styled.div`
  margin-top: 120px;
  display: flex;
  font-family: 'Rubik';
  flex-direction: column;
  align-items: center;
  width: 100%;
  & img {
    width: 140px;
  }
  & h1 {
    font-size: 36px;
    line-height: 43px;
    text-align: center;
    font-weight: 400;
    color: #242e4c;
  }
  & div {
    display: flex;
    column-gap: 12px;
    align-items: center;
  }
`;
const PlanWrapper = styled.div`
  max-width: 1000px;
  padding-left: 12px;
  padding-right: 12px;
  margin: 0 auto;
  margin-top: 27px;
`;
const Plan = styled.div`
  margin-bottom: 1.5rem;
  & .standard-plan {
    border: 10px solid #1f53d7;
    background: #ffffff;
    position: relative;
    box-shadow: 5px 10px 40px #e0e5ff;
    border-radius: 15px;
    font-family: 'Rubik';
    padding: 2rem;
    color: #111;
    & .popular {
      position: absolute;
      top: -1.5rem;
      padding: 0.5rem 2.5rem;
      background-color: #1f53d7;
      color: #fff;
      font-size: 24px;
      font-weight: 500;
      border-radius: 40px;
      left: 50%;
      transform: translate(-50%);
    }
    & .plan-header {
      & p {
        font-weight: 300;
        font-size: 14px;
        line-height: 17px;
        color: #242e4c;
      }
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      text-align: center;
      & h4 {
        font-weight: 500;
        font-size: 25px;
        line-height: 30px;
        margin: 0;
      }
      & h1 {
        font-weight: 500;
        font-size: 36px;
        line-height: 43px;
        & span {
          font-weight: 400;
          font-size: 18px;
          line-height: 1.5;
        }
      }
    }
  }
  & .regular {
    background: #ffffff;
    border: 1px solid #979797;
    box-shadow: 5px 10px 40px #e0e5ff;
    border-radius: 10px;
    font-family: 'Rubik';
    padding: 2rem;
    margin-top: 1.2rem;
    color: #111;
    & .plan-header {
      & p {
        font-weight: 300;
        font-size: 14px;
        line-height: 17px;
        color: #242e4c;
      }
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      text-align: center;
      & h4 {
        font-weight: 500;
        font-size: 25px;
        line-height: 30px;
        margin: 0;
      }
      & h1 {
        font-weight: 500;
        font-size: 36px;
        line-height: 43px;
        & span {
          font-weight: 400;
          font-size: 18px;
          line-height: 1.5;
        }
      }
    }
  }
  & ul {
    margin-bottom: 3rem;
    & li {
      margin-bottom: 1.5rem;
    }
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: 'center';
  row-gap: 1rem;
  background: #ffffff;
  border: none;
  width: 100%;
  & button {
    padding: 1rem 2rem;
    outline: none;
    border-radius: 3px;
    border: none;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
  }
  & button:nth-child(1) {
    border: 1px solid #1f53d7;
    color: #1f53d7;
    background-color: #fff;
  }
  & button:nth-child(2) {
    border: 1px solid #1f53d7;
    background-color: #1f53d7;
    color: #fff;
  }
`;

export default function Plans() {
  let dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const classes = useStyles();

  const [values, setValues] = useState({
    data: { planType: '', duration: '', month: true },
  });
  // const [planTypes, setPlanTypes] = useState({plans:[{}]})
  const UserData = useSelector((state) => state?.auth);
  const GoogleData = useSelector((state) => state?.loginStats);
  let { user } = UserData;
  const handleClick = (name) => {
    console.log('clicked handle click');
    switch (name) {
      case 'Basic':
        setValues({
          ...values,
          data: {
            ...values.data,
            planType: `${name}`,
            duration: values.data.month ? 'Monthly' : 'Annually',
          },
        });
        break;
      case 'Standard':
        setValues({
          ...values,
          data: {
            ...values.data,
            planType: `${name}`,
            duration: values.data.month ? 'Monthly' : 'Annually',
          },
        });
        break;
      case 'Advance':
        setValues({
          ...values,
          data: {
            ...values.data,
            planType: `${name}`,
            duration: values.data.month ? 'Monthly' : 'Annually',
          },
        });
        break;
    }
  };
  // console.log({ showModal });
  const history = useHistory();

  const JurebModal = () => (
    <Modal
      background="#FFFFFF"
      open={showModal}
      className={classes.modal}
      handleClose={() => setModal(false)}>
      <div onClick={() => setModal(false)} style={{ textAlign: 'end' }}>
        <IconButton>
          <Close />
        </IconButton>
      </div>
      <GridContainer style={{ position: 'relative', zIndex: 99 }}>
        <GridItem xs={12}>
          <h1 className={classes.ModalHeader}>
            How would you want to proceed?
          </h1>
        </GridItem>
        <GridItem xs={12} sm={6} onClick={() => history.push('/dashboard')}>
          <div className={classes.actionBox}>
            <Free />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <p className={classes.cardText}>Continue With Free Trial</p>
              <ArrowRight />
            </div>
          </div>
          <p className={classes.modalSubText}>
            This takes you striaght to your dashboard to start your free trial.
            please note that free trial is restricted to only the basic plan,
            and lasts for 30 days,after which all feature will be disabled,
            until you make payment for your new plan.
          </p>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <div
            className={classes.actionBox}
            style={{
              background: 'linear-gradient(270deg, #1A73E9 0%, #6C92F4 100%)',
            }}>
            <Card />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <p className={classes.cardText}>Pay Now</p>
              <ArrowRightWhite />
            </div>
          </div>
          <p className={classes.modalSubText}>
            You will be redirected to Paystack’s weblink to make payments for
            your selected plan, after payment has been confirmed you will be
            redirected back to your dashboard on Jureb
          </p>
        </GridItem>
      </GridContainer>
    </Modal>
  );

  // useEffect(() => {
  //   if (values.data.planType.length > 0) {
  //     setValues({ ...values, plansLoading: true });
  //     authClient
  //       .put(
  //         `/api/v1/sub-admin/update/plan?subAdminId=${
  //           UserData?.user?.subAdminId || GoogleData?.googleUser?.authId
  //         }`,
  //         values.data,
  //       )
  //       .then((response) => {
  //         if (response.status == 200) {
  //           dispatch(plansData(values.data));
  //           setValues({ ...values, redirect: true });
  //         }
  //       })
  //       .catch((e) => console.error(e.message));
  //   } else {
  //     return null;
  //   }
  // }, [values.data.planType]);

  // if (UserData.verified) {
  //   return <Redirect to="/dashboard" />;
  // }

  // if (values.redirect) {
  //   return <Redirect to={{ pathname: '/payments', state: { user, values } }} />;
  // }
  const plans = [
    {
      title: 'Simple Start',
      price: [2000, '2,000', '20,000'],
      heading: 'Suitable for Nano & Micro Scale Enterprises in Nigeria',
      content: [
        '1 sole user and accountant',
        '1gb of storage space',
        'Limit of 5 Staff',
        '50 customer records',
        '10 invoices per month',
      ],
    },
    {
      title: 'Standard',
      price: [5000, '5,000', '50,000'],
      heading: 'Suitable for Small Scale Enterprises in Nigeria',
      content: [
        '1 super-user and 3 sub-admins',
        '30 sub-users (staff)',
        'Unlimited Customer Records',
        '10gb storage space',
        'Unlimited Purchase Orders',
        'Unlimited Invoices and Quotations',
        'Basic KPI Analysis',
        'Basic Tax Calculators',
        'More…,',
      ],
    },
    {
      title: 'Premium',
      price: [10000, '10,000', '100,000'],
      heading: 'Suitable for Medium Scale Enterprises in Nigeria',
      content: [
        '  1 super-user and 20 sub-admins',
        'Unlimited sub-users (staff)',
        'Unlimited storage space',
        'Unlimited customers records',
        'Unlimited Purchase Order',
        'Unlimited Invoices and Quotation',
        'Advance KPI Analysis',
        'Advance Tax Calculators',
        'Tax Experts',
        'More…',
      ],
    },
  ];
  const [state, setState] = useState({
    checkedA: false,
  });
  // const [price, setPrice] = useState(0)

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <JurebModal />
      <Header>
        <Logo>
          <img className="top-logo" src={JurebLogo} alt="Jureb" />
        </Logo>

        <Banner>
          <div>
            <p>Your current plan:</p>
            <p>Basic Trial • 30 days free</p>
          </div>
        </Banner>
      </Header>
      <Content>
        <img src={JurebLogo} alt="Jureb" />
        <h1>Choose a plan</h1>
        <div>
          <span>Billed monthly</span>
          <span>
            {' '}
            <IOSSwitch
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
            />
          </span>
          <span>Billed anually</span>
        </div>
      </Content>

      <PlanWrapper>
        <Grid container spacing={2} justifyContent={'center'}>
          {plans.map((plan, i) => {
            return (
              <Grid
                style={{ height: '100%' }}
                key={i}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}>
                <Plan>
                  <div
                    className={
                      plan.title === 'Standard' ? 'standard-plan' : 'regular'
                    }>
                    <div className="plan-header">
                      <h4>{plan.title}</h4>
                      <h1>
                        &#x20A6;
                        {state.checkedA === false
                          ? plan.price[1]
                          : plan.price[2]}
                        <span>
                          /{state.checkedA === false ? 'month' : 'year'}
                        </span>
                      </h1>
                      <p>{plan.heading}</p>
                    </div>
                    <ul>
                      {plan.content.map((item, i) => {
                        return <li key={i}>{item}</li>;
                      })}
                    </ul>
                    <ButtonGroup>
                      <button onClick={() => setModal(true)}>Free Trial</button>
                      <button onClick={() => setModal(true)}>Buy Now</button>
                    </ButtonGroup>
                    {plan.title === 'Standard' && (
                      <div className="popular">POPULAR</div>
                    )}
                  </div>
                </Plan>
              </Grid>
            );
          })}
        </Grid>
      </PlanWrapper>

      {/* <Menu /> */}
      {/* <div style={{ backgroundColor: '#fbfbfe' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={classes.textWrapper}>
            <div className={classes.heading1}>
              <Typography variant="h5" style={{ color: '#fff' }}>
                Your current plan:
              </Typography>
              <Typography variant="h4" className={classes.heading2}>
                Basic Trial • 30 days free
              </Typography>
            </div>
          </div>
        </div>
        <section className={classes.contentContainer}>
          <div>
            <Typography
              variant="h2"
              style={{
                fontFamily: 'OpenSansSemiBold',
              }}>
              Choose a plan
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">Billed monthly</Typography>
              <Switch
                color="primary"
                onClick={() =>
                  setValues({
                    ...values,
                    data: { ...values.data, month: !values.data.month },
                  })
                }
              />
              <Typography variant="h6">Billed anually</Typography>
            </div>
          </div>
        </section>
        <section style={{ padding: '2rem 0rem' }}>
          <Grid container className={classes.cardHolder}>
            <Grid item xs={12}>
              <Container>
                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    <Zoom>
                      <Paper elevation={3} className={classes.paper}>
                        <Typography
                          variant="h4"
                          style={{
                            fontFamily: 'OpenSansSemiBold',
                            fontSize: '1.3rem',
                          }}>
                          Basic
                        </Typography>
                        <Typography
                          variant="h3"
                          style={{
                            fontFamily: 'OpenSansSemiBold',
                            lineHeight: '2.7',
                            letterSpacing: '0.050em',
                            color: '#242E4C',
                          }}>
                          ₦
                          {values.data.month
                            ? '5,000'
                            : Number(5000 * 11).toLocaleString()}
                          /{values.data.month ? 'month' : 'year'}
                        </Typography>
                        <Typography variant="h6">
                          Suitable for Micro & Small Scale Enterprises in
                          Nigeria
                        </Typography>
                        <ul className="list_1">
                          <li className={classes.listItem}>
                            <Typography variant="h6">1 sole user</Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              1gb of storage space
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">Limit of staff</Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              50 customer records
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              10 invoices per month
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Email support/knowledge base
                            </Typography>
                          </li>
                        </ul>
                        <Button
                          variant="outlined"
                          disableElevation
                          className="plan-btn"
                          fullWidth
                          onClick={() => {
                            setModal(true);
                            handleClick('Basic');
                          }}
                          // disabled={values.plansLoading ? true : false}
                        >
                          Choose Plan
                        </Button>
                      </Paper>
                    </Zoom>
                  </Grid>
                  <Grid item>
                    <Zoom>
                      <Paper elevation={3} className={classes.paper}>
                        <Typography
                          variant="h4"
                          style={{
                            fontFamily: 'OpenSansSemiBold',
                            fontSize: '1.3rem',
                          }}>
                          Standard
                        </Typography>
                        <Typography
                          variant="h3"
                          style={{
                            fontFamily: 'OpenSansSemiBold',
                            lineHeight: '2.7',
                            letterSpacing: '0.050em',
                            color: '#242E4C',
                          }}>
                          ₦
                          {values.data.month
                            ? '10,000'
                            : Number(10000 * 11).toLocaleString()}
                          /{values.data.month ? 'month' : 'year'}
                        </Typography>
                        <Typography variant="h6">
                          Suitable for Small Scale Enterprises in Nigeria
                        </Typography>
                        <ul className="list_2">
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              All basic features, plus:
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">3 sub-admins</Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Limit of 30 staffs and 100 customers
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              10gb storage space
                            </Typography>
                          </li>
                        </ul>
                        <Button
                          variant="outlined"
                          disableElevation
                          className="plan-btn-2"
                          fullWidth
                          onClick={() => {
                            setModal(true);
                            handleClick('Standard');
                          }}
                          // disabled={values.plansLoading ? true : false}
                        >
                          Choose Plan
                        </Button>
                      </Paper>
                    </Zoom>
                  </Grid>
                  <Grid item>
                    <Zoom>
                      <Paper elevation={3} className={classes.paper}>
                        <Typography
                          variant="h4"
                          style={{
                            fontFamily: 'OpenSansSemiBold',
                            fontSize: '1.3rem',
                          }}>
                          Advance
                        </Typography>
                        <Typography
                          variant="h3"
                          style={{
                            fontFamily: 'OpenSansSemiBold',
                            lineHeight: '2.7',
                            letterSpacing: '0.050em',
                            color: '#242E4C',
                          }}>
                          ₦
                          {values.data.month
                            ? '15,000'
                            : Number(15000 * 11).toLocaleString()}
                          /{values.data.month ? 'month' : 'year'}
                        </Typography>
                        <Typography variant="h6">
                          Suitable for Medium Scale Enterprises in Nigeria
                        </Typography>
                        <ul className="list_3">
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              All standard features, plus:
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Limit of 20 sub admins
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Unlimited number of staffs
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Unlimited customers
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Unlimited storage space
                            </Typography>
                          </li>
                          <li className={classes.listItem}>
                            <Typography variant="h6">
                              Email support/knowledge base
                            </Typography>
                          </li>
                        </ul>
                        <Button
                          variant="outlined"
                          disableElevation
                          className="plan-btn"
                          fullWidth
                          onClick={() => {
                            setModal(true);
                            handleClick('Advance');
                          }}
                          // disabled={values.plansLoading ? true : false}
                        >
                          Choose Plan
                        </Button>
                      </Paper>
                    </Zoom>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </section>
      </div> */}
    </>
  );
}
