import { useEffect, useState } from 'react';
import './forgotPassword.scss';
import Button from '@material-ui/core/Button';
import Error from '@material-ui/icons/Error';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Reveal from 'react-reveal/Reveal';
import { Link, Redirect } from 'react-router-dom';
import InputComp from 'lib/components/InputComp';
import Menu from 'lib/components/Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import authActions from 'redux/actions/authActions';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { findEmail } from 'site-constants';
import { ReactComponent as Apple } from 'lib/assets/icons/apple.svg';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import userActions from 'redux/actions/userActions';
import { ReactComponent as EmailSent } from '../../../lib/assets/images/emailSent.svg';

const { resetPassword } = authActions;
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
        height: '78vh',
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
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '.7rem 3rem',

        [theme.breakpoints.down('sm')]: {
            margin: '.7rem .3rem',
        },
    },
    formContainer: {
        padding: '1rem 1.5rem',
        [theme.breakpoints.down('xs')]: {
            padding: '2.5rem 0rem',
        },
    },
    accountSignin: {
        textAlign: 'center',
        margin: '.8rem 0 0',
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

export default function emailSent() {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
    const { schema } = findEmail;

    const classes = useStyles();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        data: {
            email: '',
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
    const handleBtnClick = (email) => {
        dispatch(resetPassword(email, setErrors));
        setTimeout(() => {
            setErrors('');
        }, 5000);
    };
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
                                    <EmailSent/>
                                        <div className={classes.formContainer}>
                                            <Typography
                                                component="p"
                                                style={{
                                                    textAlign: 'center',
                                                    padding: matchesXs ? '1.5rem 0' : '.5rem',
                                                    fontSize: '.8rem',
                                                    fontFamily: 'OpenSansRegular',
                                                    fontWeight: '400',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0.00938em',
                                                    margin: '0',
                                                }}>
                                                We have sent an email to your inbox with directions on how to reset your password.
                                            </Typography>
                                            <Link
                                                style={{ textDecoration: 'none', color: '#1F53D7' }}
                                                to="/signin">
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    fullWidth
                                                    type="Send"
                                                    disableElevation
                                                    //   disabled={loginStats?.isLoading}
                                                    classes={{
                                                        disabled: classes.disabled,
                                                    }}
                                                    style={{
                                                        margin: '1rem 0rem',
                                                    }}>

                                                    Back to Login
                                                </Button>
                                            </Link>
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
