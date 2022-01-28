import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ReactComponent as Confirmation } from 'lib/assets/icons/Confirmation.svg';
import {
  TypographyH5,
  TypographyBold,
} from 'modules/components/Typography/Typography';
import { Close } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Typography, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { padding: '1rem' },
  dialogActions: { display: 'flex', justifyContent: 'center' },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitleIcon = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
          fontWeight: 500,
          fontSize: '19.6787px',
          lineHeight: '20px',
          marginTop: '1rem',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function AlertDialog({ handleClose, open, handleProceed }) {
  const classes = useStyles();
  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitleIcon
        id="customized-dialog-title"
        onClose={handleClose}></DialogTitleIcon>{' '}
      <DialogTitle
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '.8rem',
        }}
        id="alert-dialog-title">
        <Confirmation />
        <TypographyBold>How the Magic is Done</TypographyBold>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Jureb will automatically reconcile all bank charges for you, this
          gives you a more easier method to mange your reconciliations. These
          generic charges include: maintainance fees, SMS alerts, transfer
          charges, stamp duties, e.t.c.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={handleProceed}
          variant="contained"
          disableElevation
          color="primary">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
