import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Reveal';
import LinearProgress from '@material-ui/core/LinearProgress';
import CreateAccount from './CreateAccount';
import ProfileInformation from './ProfileInformation';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CompleteAccount from './CompleteAccount/CompleteAccount';
import { LS } from 'lib';
import Menu from '../../../lib/components/Menu/Menu';
import './Signup.scss';
import { useSelector } from 'react-redux';
import { Reveal } from 'react-reveal';
// import Loader from 'react-loaders';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fbfbfe',
    flexGrow: 1,
    height: 'auto',
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
    width: 650,
    borderRadius: '15px',
  },
  wrapper: {
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
  tabSection: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  progress: {
    margin: '.3rem',
    borderRadius: '5px',
    height: '7px',
  },
  linearPrimaryColor: {
    backgroundColor: '#edeeef',
  },
  linearBar: {
    borderRadius: '5px',
  },
  active: {
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: '.7rem',
    },
  },
  inActive: {
    fontWeight: 'normal',
    [theme.breakpoints.down('xs')]: {
      fontSize: '.7rem',
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [progress, setProgress] = useState(30);

  const [tabs, setTabs] = useState({
    activeTab: '',
  });

  const [user, setUser] = useState({
    data: {
      userId: '',
      email: '',
      telephone: '',
    },
    facebookData: {
      email: '',
      userId: '',
    },
  });

  const [phone, setPhone] = useState('');
  // const UserData = useSelector((state) => state?.auth);

  // const nextView = (title) => {
  //   switch (title) {
  //     case 'Verification':
  //       setTabs({ ...tabs, activeTab: title });
  //       // LS.save('currentPath', title);
  //       break;
  //     case 'Organization-Information':
  //       setProgress(100);
  //       // LS.save('currentPath', title);
  //       setTabs({ ...tabs, activeTab: title });
  //       break;
  //   }
  // };

  const setUserDetails = (data) => {
    setUser({
      ...user,
      data: {
        ...user.data,
        userId: data.subAdminId ? data.subAdminId : data.user.userId,
        email: data.email ? data.email : data.user.email,
      },
    });
  };

  const setFacebookData = (data) => {
    setUser({
      ...user,
      facebookData: {
        ...user.facebookData,
        userId: data.data.data.user.userId,
        email: data.data.data.user.email,
      },
    });
  };

  const setUserPhone = (data) => {
    setPhone(data);
  };
  LS.save('currentPath', '');

  // const [spacing, setSpacing] = useState(2);

  // const backInitialView = () => {
  //   setTabs({ ...tabs, activeTab: '' });
  // };

  // const loginState = useSelector(
  //   (state) => state?.loginStats?.googleUser?.emailVerified,
  // );

  // const auth = useSelector((state) => state?.auth.token);
  // const userAuth = useSelector((state) => state?.loginStats?.token);

  // if (loginState || auth || userAuth || true) {
  //   return <Redirect to="/dashboard" />;
  // }
  const [route, setRoute] = useState('register');
  const progressBar = () => {
    if (route === 'Verification') {
      setProgress(55);
    } else if (route === 'OrgInformation') {
      setProgress(100);
    }
  };

  useEffect(() => {
    progressBar();
    window.scroll(0, 0);
  }, [route]);
  return (
    <>
      <Menu />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.container}>
            <Paper elevation={13} className={classes.card}>
              <div className={classes.wrapper}>
                <div className={classes.tabSection}>
                  <Typography
                    variant="h5"
                    className={route == '' ? classes.active : classes.inActive}>
                    Create Account
                  </Typography>
                  <Typography
                    variant="h5"
                    className={
                      route == 'Verification'
                        ? classes.active
                        : classes.inActive
                    }>
                    Verification
                  </Typography>
                  <Typography
                    variant="h5"
                    className={
                      route == ' Organization Information'
                        ? classes.active
                        : classes.inActive
                    }>
                    Organization Information
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  className={classes.progress}
                  classes={{
                    colorPrimary: classes.linearPrimaryColor,
                    bar: classes.linearBar,
                  }}
                  value={progress}
                />
                {route === 'register' && (
                  <Zoom>
                    <CreateAccount
                      // nextView={nextView}
                      setUserDetails={setUserDetails}
                      setFacebookData={setFacebookData}
                      setRoute={setRoute}
                    />
                  </Zoom>
                )}
                {route === 'Verification' && (
                  <Slide>
                    <CompleteAccount
                      userDetails={user.data}
                      facebookData={user.facebookData}
                      phone={phone}
                      setRoute={setRoute}
                    />
                  </Slide>
                )}
                {route === 'OrgInformation' && (
                  <Reveal>
                    <ProfileInformation
                      // nextView={nextView}
                      userId={user.data.userId}
                      facebookData={user.facebookData}
                      setUserDetails={setUserPhone}
                      setRoute={setRoute}
                    />
                  </Reveal>
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
