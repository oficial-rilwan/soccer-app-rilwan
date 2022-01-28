import { Dialog, IconButton, useMediaQuery } from '@material-ui/core';
import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyBold } from 'modules/components/Typography/Typography';

const useStyles = makeStyles((theme) => ({
  dialog: {
    background: '#fff',
    /* tab shade */
    boxShadow: '0px 8px 24px 0.694947px rgba(51, 63, 81, 0.15)',
    borderRadius: '7.85156px',
    width: '40rem',
    height: '20rem',
    [theme.breakpoints.down('xs')]: {
      height: '25rem',
    },
  },
  dialogTitle: {
    fontFamily: 'Rubik',
    fontSize: 15,
  },
  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  deleteBtn: {
    borderRadius: '3px',
    backgroundColor: '#EB5757',
    color: '#fff',
    textTransform: 'none',
    width: '7rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    fontWeight: 500,
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EB5757',
    },
  },
  cancelBtn: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontWeight: 500,
    fontFamily: 'Rubik',
    width: '7rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    boxShadow: 'none',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    background: '#EB5757',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff',
    marginTop: 8,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={useStyles().dialogTitle}>
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
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))(MuiDialogContent);

export const DeleteDialog = ({
  handleDeleteClose,
  deleteOpen,
  id,
  setReload,
  reload,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const handleDelete = () => {
    authClient
      .delete(`api/v1/accounting/transaction?transactionId=${id}`)
      .then((res) => {
        if (res.status === 200) {
          setReload(!reload);
          handleDeleteClose();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog
      onClose={handleDeleteClose}
      aria-labelledby="customized-dialog-title"
      open={deleteOpen}
      classes={{
        paper: classes.dialog,
      }}
      disableBackdropClick>
      <DialogTitle id="customized-dialog-title" onClose={handleDeleteClose}>
        Delete Outflow
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className={classes.dialogContent}>
          Are you sure you want to delete this transaction?
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: matchesXs ? 'column' : 'row',
            justifyContent: 'flex-end',
            margin: '2rem',
          }}>
          <Button
            variant="contained"
            className={classes.deleteBtn}
            disableElevation
            style={{ marginRight: matchesXs ? '.5rem' : '1.5rem' }}
            // disabled={disabled}
            onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="contained"
            className={classes.cancelBtn}
            disableElevation
            // disabled={disabled}
            style={{ marginLeft: matchesXs ? '.5rem' : '1.5rem' }}
            onClick={handleDeleteClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
