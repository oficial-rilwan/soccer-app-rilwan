import {
  Avatar,
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ReactComponent as Arrow } from 'lib/assets/images/arrow.svg';
import { ReactComponent as Dash } from 'lib/assets/images/dash.svg';
import { ReactComponent as Dash1 } from 'lib/assets/images/dash_1.svg';
import LazyLoad from 'react-lazyload';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    border: '0.5px solid #dfdfdf',
    borderRadius: '5px',
    fontFamily: 'Rubik',
    backgroundColor: '#FCFFFF',
  },
  header: {
    backgroundColor: '#B8DBFC',
    height: '5.7rem',
    borderRadius: '5px 5px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  employeeName: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '23px',
    textTransform: 'capitalize',
  },
  title: {
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '21px',
    color: '#282828',
  },
  date: {
    fontSize: '14px',
    fontFamily: 'Rubik',
    lineHeight: '21px',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  main: {
    padding: '1rem',
  },
  timeline: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  timelineMonth: {
    fontFamily: 'Rubik',
    fontSize: 24,
    lineHeight: '28px',
  },
  timelineDay: {
    fontFamily: 'Rubik',
    fontSize: 12,
    lineHeight: '14px',
    textAlign: 'center',
  },
  timelineDuration: {
    fontFamily: 'Rubik',
    fontSize: 14,
    lineHeight: '17px',
    textAlign: 'center',
    marginTop: '1rem',
  },
  reportCard: {
    margin: '1rem',
    [theme.breakpoints.down('xs')]: {
      margin: '1rem 0',
    },
    backgroundColor: '#fff',
    borderRadius: '3px',
    border: '1px solid #878181',
  },
  report: {
    backgroundColor: '#1F53D7',
    height: '3rem',
    padding: '1rem',
    color: '#fff',
  },
  reason: {
    fontSize: 14,
    lineHeight: '17px',
    fontFamily: 'Rubik',
    textTransform: 'capitalize',
  },
  description: {
    padding: '1rem',
  },
  descriptionText: {
    fontFamily: 'Rubik',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 'normal',
  },
  nameCard: {
    height: '43px',
    width: '43px',
    background: '#251F47',
    borderRadius: '50%',
    marginRight: '.7rem',
    padding: '0.5rem',
  },
  name: {
    margin: 0,
    textAlign: 'center',
    color: '#00DC7D',
    fontSize: '1.2rem',
  },
  leaveDays: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: 16,
    fontWeight: '19px',
  },
  approveBtn: {
    borderRadius: '3px',
    backgroundColor: '#1F53D7',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    fontFamily: 'Rubik',
    width: '8rem',
    margin: '0 .6rem 0 0',
    [theme.breakpoints.down('md')]: {
      margin: '0 0 1rem .6rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: '#1F53D7',
    },
  },
  cancelBtn: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontWeight: 500,
    fontFamily: 'Rubik',
    boxShadow: 'none',
    width: '8rem',
    margin: '0 0 0 .6rem',
    [theme.breakpoints.down('md')]: {
      margin: '0 0 1rem .6rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  avatar: {
    width: 55,
    height: 55,
  },
}));

export default function LeaveCard({
  name,
  from,
  to,
  leaveType,
  leaveReason,
  handleAction,
  leaveId,
  approvedOn,
  id,
  blurCardId,
  handleDialogOpen,
  days,
  daysAvailable,
  disabled,
  designation,
  meta,
  createdAt,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const responsive = useMediaQuery(theme.breakpoints.down('1230'));
  const arrowResponsive = useMediaQuery(theme.breakpoints.down('1160'));
  const parsedFrom = new Date(from).toDateString();
  const parsedTo = new Date(to).toDateString();
  return (
    <>
      <Paper
        elevation={0}
        className={classes.cardWrapper}
        style={{
          filter: blurCardId[id] ? 'blur(3px)' : 'inherit',
          height: 'auto',
        }}>
        <div className={classes.header}>
          {meta?.url ? (
            <LazyLoad>
              <Avatar src={meta?.url} className={classes.avatar} />
            </LazyLoad>
          ) : (
            <div className={classes.nameCard}>
              <Typography variant="h4" className={classes.name}>
                {name?.substring(0, 1).toUpperCase()}
              </Typography>
            </div>
          )}
          <div style={{ flex: '.7' }}>
            <Typography variant="h3" className={classes.employeeName}>
              {name}
            </Typography>
            <Typography component="p" className={classes.title}>
              {designation}
            </Typography>
          </div>
          <div>
            <Typography variant="h5" className={classes.date}>
              {new Date(createdAt).toDateString().substring(9, 10) +
                ' ' +
                new Date(createdAt).toDateString().substr(0, 3) +
                ', ' +
                new Date(createdAt).getUTCFullYear()}
            </Typography>
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.timeline}>
            <div>
              <Typography variant="h2" className={classes.timelineMonth}>
                {`${parsedFrom.substr(8, 2)} ${parsedFrom.substr(4, 3)}`}
              </Typography>
              <Typography component="p" className={classes.timelineDay}>
                {`${parsedFrom.substr(0, 3)}`}
              </Typography>
            </div>
            <div>
              <Dash />
              <Dash1
                style={{
                  margin: '0 5px',
                  display: arrowResponsive ? 'none' : 'initial',
                }}
              />
              <Arrow style={{ position: 'relative', top: '6px' }} />
              <Typography variant="h2" className={classes.timelineDuration}>
                {`${days} Days`}
              </Typography>
            </div>
            <div>
              <Typography variant="h2" className={classes.timelineMonth}>
                {`${parsedTo.substr(8, 2)} ${parsedTo.substr(4, 3)}`}
              </Typography>
              <Typography component="p" className={classes.timelineDay}>
                {`${parsedTo.substr(0, 3)}`}
              </Typography>
            </div>
          </div>
          <div className={classes.reportCard}>
            <Paper elevation={0}>
              <div className={classes.report}>
                <Typography variant="h5" className={classes.reason}>
                  {leaveType == 'public_holiday' ? 'Public Holiday' : leaveType}
                </Typography>
              </div>
              <div className={classes.description}>
                <Typography variant="h6" className={classes.descriptionText}>
                  {leaveReason}
                </Typography>
              </div>
            </Paper>
          </div>
          <div style={{ margin: '1rem' }}>
            <Typography variant="h4" className={classes.leaveDays}>
              <span style={{ color: '#1F53D7' }}>{daysAvailable}</span> Leave
              Days Available
            </Typography>
          </div>
          {approvedOn ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                variant="contained"
                fullWidth
                disableElevation
                style={{
                  borderRadius: '3px',
                  border: '1px solid #00000033',
                  backgroundColor: 'transparent',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontFamily: 'Rubik',
                  boxShadow: 'none',
                }}
                className={classes.actionReject}>
                Review
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: matchesXs ? '0' : '2.5rem 1rem',
                flexWrap: responsive ? 'wrap' : 'nowrap',
              }}>
              <Button
                variant="contained"
                disableElevation
                // fullWidth
                onClick={() => handleAction(leaveId)}
                className={classes.approveBtn}
                disabled={disabled ? true : false}>
                Approve
              </Button>
              <Button
                variant="contained"
                disableElevation
                // fullWidth
                onClick={() => handleDialogOpen(leaveId)}
                className={classes.cancelBtn}
                disabled={disabled ? true : false}>
                Reject
              </Button>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
}
