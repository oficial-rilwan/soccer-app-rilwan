import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import {
  Dialog,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import { ReactComponent as SendCheck } from 'lib/assets/icons/send_check.svg';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogTypography } from 'modules/components/Typography/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '32rem',
    height: '33rem',
    maxWidth: 'inherit',
    borderRadius: 8,
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  dialogSuccess: {
    margin: '5rem 0 0',
  },
}));

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.5),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '1rem 4rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

export default function SendPayslips({ progress }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setSuccess(false);
    return history.push('/dashboard/payroll');
  };

  const { payrollData } = useSelector((state) => state?.payrollData);

  const handleSendPayslip = () => {
    authClient
      .post(`/api/v1/employee/payroll/management/create`, payrollData)
      .then((res) => {
        if (res.status == 200 || 201) {
          setSuccess(true);
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;

  return (
    <>
      <section style={{ margin: '15px' }}>
        <main
          style={{
            background: '#E1F9FE',
            margin: '0 0 15px',
            padding: '20px',
          }}>
          <div style={{ overflowX: 'auto', display: 'flex' }}>
            <div style={{ margin: '0 .5rem' }}>
              <SendCheck />
            </div>
            <div style={{ margin: '0 15px 0', minWidth: 480 }}>
              <TypographyBold
                style={{
                  fontStyle: 'italic',
                  fontSize: 15,
                  padding: '0 0 .7rem',
                }}>
                Your Payroll has been completed
              </TypographyBold>
              <Typography>
                Funds will be withdrawn from your account on{' '}
                <b>{`${monthName(
                  new Date(payrollData.payPeriodStarts),
                )}, ${new Date(
                  payrollData.payPeriodStarts,
                ).getUTCDate()} ${new Date(
                  payrollData.payPeriodStarts,
                ).getUTCFullYear()}`}</b>
              </Typography>
              <Typography>
                Your Employees will recieve a direct deposit on{' '}
                <b>{`${monthName(new Date(payrollData.payDay))}, ${new Date(
                  payrollData.payDay,
                ).getUTCDate()} ${new Date(
                  payrollData.payDay,
                ).getUTCFullYear()}`}</b>
              </Typography>
            </div>
          </div>
        </main>
        <PrimaryButton
          style={{ width: matchesXs && 'auto' }}
          onClick={handleSendPayslip}>
          Send Payslips
        </PrimaryButton>
      </section>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={success}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Send Paychecks
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.dialogSuccess}>
            <Lottie
              options={defaultOptions}
              height={200}
              width={200}
              isClickToPauseDisabled={true}
            />
            <DialogTypography style={{ textAlign: 'center' }}>
              Payslips Sent
            </DialogTypography>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
