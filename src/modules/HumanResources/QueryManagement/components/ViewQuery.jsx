import {
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import { ReactComponent as Smiley } from 'lib/assets/icons/smiley.svg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { KeyboardArrowDown } from '@material-ui/icons';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import Employee2 from 'lib/assets/images/employee2.png';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryActions from 'redux/actions/queryActions';
import Loader from 'react-loaders';

const { fetchQueryData } = queryActions;

const useStyles = makeStyles((theme) => ({
  employeeName: {
    fontFamily: 'Rubik,sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    textTransform: 'capitalize',
  },
  active: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#2F49D0',
    textDecoration: 'none',
  },
  textContainer: {
    border: '0.5px solid #DFDFDF',
    borderRadius: '5px 5px 0 0',
    background: '#fcffff',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: '600px',
    height: '570px',
  },
  btnRoot: {
    fontFamily: 'Rubik',
    backgroundColor: '#1F53D7',
    borderRadius: '3px',
    color: '#fff',
    padding: '8px 25px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1F53D7',
    },
  },
  typography: {
    // padding: theme.spacing(1),
    boxShadow:
      '0px 4px 8px rgba(97, 97, 97, 0.14), 0px 8px 16px rgba(97, 97, 97, 0.14)',
    borderRadius: 8,
  },
  listItem: {
    padding: '10px',
    fontFamily: 'Rubik',
    cursor: 'pointer',
    fontSize: 13,
    '&:hover': {
      backgroundColor: '#E0E0E0',
      //   opacity: '.5',
      borderRadius: 4,
    },
  },
}));

export default function ViewQuery({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState({
    meta: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading, queryData } = useSelector((state) => state?.queryData);
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [newMessage, setnewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setinput] = useState('');
  const [close, setClose] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const loginState = useSelector((state) => state?.loginStats);
  const [userData, setUserData] = useState({
    values: {
      queryDate: '',
      queryType: '',
      employeeName: '',
    },
  });
  const [values, setValues] = useState({
    employeeData: {
      employeeId: queryData?.employeeToqueryId,
      employeeName: queryData?.employeeToqueryName,
      employeeImage: queryData?.employeeToqueryImage,
    },
    data: {
      queryDate: queryData?.queryDate,
      queryType: queryData?.queryFor,
      queryComment: queryData?.comment,
      message: queryData?.message,
    },
  });
  const [err, setErr] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //fetch messages
  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/query/management/messages?queryId=${match.params.id}`,
      )
      .then((res) => {
        setMessages(res?.data?.data);
      });
  }, [messages]);

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setinput(value);
    setnewMessage(input);
  };
  useEffect(() => {
    dispatch(fetchQueryData(match.params.id, setErr));
  }, []);

  //submit new message for query
  const sendMessage = () => {
    let emptyString = new RegExp('^$');
    if (newMessage != emptyString) {
      setTimeout(() => {
        authClient
          .post(
            `/api/v1/employee/query/management/send?queryId=${match.params.id}&employeeId=${queryData[0]?.employeeToqueryId}`,
            { newMessage },
          )
          .then((res) => {
            let { status } = res;
            console.log(res?.data);
            if (status == 200 || 201)
              setMessages({ messages: messages.push(newMessage) });
            setAnchorEl(false);
            setinput('');
          });
      }, 1500);
      return () => {
        clearTimeout();
      };
    }
  };

  const sendCloseMessage = () => {
    let emptyString = new RegExp('^$');
    if (newMessage != emptyString) {
      setTimeout(() => {
        authClient
          .post(
            `/api/v1/employee/query/management/send?queryId=${match.params.id}&employeeId=${queryData[0]?.employeeToqueryId}`,
            { newMessage, status: 'CLOSED' },
          )
          .then((res) => {
            let { status } = res;
            if (status == 200 || 201) setMessage(newMessage);
            setAnchorEl(null);
            setinput('');
          });
      }, 1500);
      return () => {
        clearTimeout();
        setnewMessage(null);
      };
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //submit close response for query
  const handleCloseQuery = () => {
    setTimeout(() => {
      authClient
        .put(
          `/api/v1/employee/query/management/send?queryId=${match.params.id}`,
        )
        .then((res) => {
          console.log(res.data);
          let sentMessage = res?.data?.message;
          console.log(sentMessage);
          setMessages(sentMessage);
          setClose(true);
          setAnchorEl(false);
        });
    }, 1500);
    return () => clearTimeout();
    setAnchorEl(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const matchesResponsive = useMediaQuery(theme.breakpoints.down(448));

  //fetch curent signed in sub-admin
  useEffect(() => {
    authClient
      .get(
        `/api/v1/sub-admin/profile?subAdminId=${
          user?.subAdminId ||
          loginState?.user?.profile?.subAdminId ||
          loginState?.googleUser?.userId
        }`,
      )
      .then(({ data }) => {
        let { meta } = data?.data;
        setDashboard({ ...dashboard, meta });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Grid container style={{ padding: '1.5rem 0' }} spacing={4}>
        <Grid item xs={12} md={2}>
          <div>
            <Typography variant="h3" className={classes.employeeName}>
              {queryData[0]?.employeeToqueryName}
            </Typography>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li className={classes.active}>Query Status</li>
            </ul>
          </div>
        </Grid>
        {isLoading ? (
          <div className={classes.loader}>
            <Loader type="ball-rotate" color="#2F49D0" />
          </div>
        ) : (
          <Grid item xs={12} md={10}>
            <div className={classes.textContainer}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: matchesResponsive
                    ? 'space-around'
                    : 'flex-end',
                  margin: matchesXs ? '15px 4px' : '15px',
                }}>
                <div
                  style={{
                    margin: matchesXs ? '15px 7px' : '15px',
                  }}>
                  <div
                    style={{
                      backgroundColor: '#00B976',
                      borderRadius: 12,
                      padding: matchesXs ? '10px 20px' : '20px 35px',
                      color: '#fff',
                      filter: 'drop-shadow(0px 6px 10px rgba(0, 118, 75, 0.3))',
                      width: '33rem',
                    }}>
                    <TypographyBold
                      style={{ fontSize: 20, padding: '0 0 10px' }}>
                      Query for {queryData[0]?.queryFor}
                    </TypographyBold>
                    <TypographyH5 component="p">
                      {queryData[0]?.comment}
                    </TypographyH5>
                  </div>
                  <TypographyH5
                    style={{
                      padding: '.5rem 0',
                      color: '#828282',
                      fontStyle: 'italic',
                      fontSize: 14,
                    }}
                    component="p">
                    <Moment
                      format={'DD/MM/YYYY HH:mm'}
                      date={queryData[0]?.queryDate}
                    />
                  </TypographyH5>
                </div>
                <div style={{ margin: '15px 0 0px' }}>
                  {dashboard?.meta && (
                    <img
                      src={dashboard?.meta.secure_url}
                      alt="company_logo"
                      style={{
                        width: '2rem',
                        height: '2rem',
                        margin: '.5rem',
                        borderRadius: '50% ',
                      }}
                    />
                  )}{' '}
                </div>
              </div>
              {messages && (
                <div>
                  {messages?.map((sentMessage, i) => {
                    return (
                      <>
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            justifyContent: matchesResponsive
                              ? 'space-around'
                              : 'flex-end',
                            margin: matchesXs ? '15px 4px' : '15px',
                          }}>
                          <div
                            style={{
                              justifySelf: 'flex-end',
                              margin: matchesXs ? '15px 7px' : '15px',
                              width: matchesXs ? '100%' : '60%',
                            }}>
                            <div
                              style={{
                                borderRadius: '50%',
                                margin: '15px 0 0px',
                              }}>
                              <img
                                src={Employee2}
                                alt="company_logo"
                                style={{
                                  width: '2rem',
                                  height: '2rem',
                                  margin: '.5rem',
                                  borderRadius: '50% ',
                                }}
                              />
                            </div>
                            <div
                              style={{
                                backgroundColor: '#00B976',
                                borderRadius: 12,
                                padding: matchesXs ? '10px 20px' : '20px 35px',
                                color: '#fff',
                                filter:
                                  'drop-shadow(0px 6px 10px rgba(0, 118, 75, 0.3))',
                              }}>
                              <TypographyH5 component="p">
                                {sentMessage?.message}
                              </TypographyH5>
                            </div>
                            <TypographyH5
                              style={{
                                padding: '.5rem 0',
                                color: '#828282',
                                fontStyle: 'italic',
                                fontSize: 14,
                              }}
                              component="p">
                              <Moment
                                format={'DD/MM/YYYY HH:mm'}
                                date={sentMessage?.created_at}
                              />
                            </TypographyH5>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div
              style={{
                height: 'auto',
                backgroundColor: '#fff',
                border: '0.5px solid #87818147',
                display: 'flex',
                alignItems: 'center',
              }}>
              <IconButton
                style={{
                  margin: '0px 5px',
                  display: matchesXs ? 'none' : 'block',
                }}>
                <Smiley />
              </IconButton>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={input}
                onChange={handleMessageChange}
                style={{ padding: matchesXs ? '0 10px' : '0 22px' }}
              />
              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={handleClick}
                disableElevation
                classes={{
                  root: classes.btnRoot,
                }}
                style={{ margin: matchesXs ? '10px 7px' : '10px 20px 10px' }}>
                Send
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}>
                <div className={classes.typography}>
                  <Typography
                    className={classes.listItem}
                    id="send"
                    value="send"
                    onClick={sendMessage}>
                    Send
                  </Typography>
                  <Typography
                    className={classes.listItem}
                    id="send_close"
                    onClick={sendCloseMessage}
                    value="send_close">
                    Send and Close
                  </Typography>
                  <Typography
                    className={classes.listItem}
                    id="close"
                    value="close"
                    onClick={handleCloseQuery}>
                    Close
                  </Typography>
                </div>
              </Popover>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
}
