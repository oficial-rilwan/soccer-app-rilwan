import { useState } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputComp from 'lib/components/InputComp';
import Select from '@material-ui/core/Select';
import Menu from 'lib/components/Menu/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { SendOutlined, Add } from '@material-ui/icons';
import { authClient } from 'modules/authentication/requestClient';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { Redirect, useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  inviteSection: {
    backgroundColor: '#fbfbfe',
    height: 'inherit',
  },
  paper: {
    width: '48rem',
    height: 'auto',
    borderRadius: '6px',
    margin: '1rem',
  },
  heading: {
    fontFamily: 'OpenSansRegular',
    margin: '3.5rem 0rem',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '1.2rem 0rem',
    },
  },
  sectionWrapper: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '4rem',
    },
  },
  gridForm: {
    padding: '2rem 5rem',
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '.4rem 1.5rem',
    [theme.breakpoints.down('md')]: {
      padding: '2rem 3rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
      display: 'block',
    },
  },
  roleInpt: {
    marginLeft: '4rem',
    padding: '0.4rem 0rem',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  addMoreBtn: {
    width: '57%',
    margin: '3rem 4rem 0rem',
    borderRadius: '2px',
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
      margin: '3rem 0rem',
    },
  },
  dashboardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '13rem',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '8rem',
    },
  },
  dashboardBtn: {
    width: '50%',
    height: '2.7rem',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '11px',
    },
  },
  addMoreWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}));

export default function Invites() {
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = useState({
    data: {
      role: '',
      email: '',
      url: '',
    },
  });

  const handleSelectChange = (e) => {
    let { value } = e.target;
    switch (value) {
      case 'Sub Admin':
        setValues({
          ...values,
          data: {
            ...values.data,
            role: value,
            url: 'http://jureb-apt.herokuapp.com/invites/subadmin',
          },
        });
        break;
      case 'Staff':
        setValues({
          ...values,
          data: {
            ...values.data,
            role: value,
            url: 'http://jureb-apt.herokuapp.com/invites/staff',
          },
        });
        break;
      case 'HR admin':
        setValues({
          ...values,
          data: {
            ...values.data,
            role: value,
            url: 'http://jureb-apt.herokuapp.com/invites/hradmin',
          },
        });
        break;
    }
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;

    setValues({ ...values, data: { ...values.data, email: value } });
  };

  const handleBtnClick = () => {
    authClient
      .post('/api/v1/invite/team/invite', values.data)
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className={classes.inviteSection}>
      <Menu />
      <section className={classes.sectionWrapper}>
        <Paper elevation={13} className={classes.paper}>
          <Typography variant="h2" className={classes.heading}>
            Invite your Team
          </Typography>
          <div className={classes.gridForm}>
            <div className={classes.roleInpt}>
              <Typography variant="h6">Select Role</Typography>
              <SelectComp
                menuItem={[
                  { label: 'Hr Admin', value: 'HR admin' },
                  { label: 'Sub Admin', value: 'Sub Admin' },
                  { label: 'Staff', value: 'Staff' },
                ]}
                label="Role"
                value={values.data.role}
                handleSelectChange={handleSelectChange}
              />
            </div>
            <div>
              <InputComp
                label="Email Address"
                fullWidth
                onChange={handleChange('email')}
                helperText={
                  values.data.role
                    ? `The ${String(
                        values.data.role,
                      ).toLowerCase()} will receive an email invite`
                    : ''
                }
              />
            </div>
            <div className={classes.addMoreWrapper}>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                endIcon={<Add />}
                className={classes.addMoreBtn}>
                Add More
              </Button>
            </div>
            <div className={classes.addMoreWrapper}>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={handleBtnClick}
                endIcon={<SendOutlined />}
                className={classes.addMoreBtn}>
                Send Invites
              </Button>
            </div>
          </div>
          <div className={classes.dashboardWrapper}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              className={classes.dashboardBtn}
              onClick={() => history.push('/dashboard')}>
              View Dashboard
            </Button>
          </div>
        </Paper>
      </section>
    </div>
  );
}
