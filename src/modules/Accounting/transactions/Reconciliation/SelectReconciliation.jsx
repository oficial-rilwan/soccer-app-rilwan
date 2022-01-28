import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Dialog, IconButton, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { ReactComponent as Warning } from 'lib/assets/icons/warning.svg';
import { ReactComponent as Equal } from 'lib/assets/icons/equal.svg';
import { ReactComponent as NotEqual } from 'lib/assets/icons/notEqual.svg';
import { ReactComponent as CheckCircle } from 'lib/assets/icons/check_circle.svg';
import { ReactComponent as ErrorOutline } from 'lib/assets/icons/error_outline.svg';
import { DefaultButton } from 'modules/components/Buttons/Defaults';

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

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  container: { marginBottom: '17px !important' },
  dialogPaper: {
    width: '39rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
  },

  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
  },

  textAwesome: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '10px',
    color: '#00DC7D',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '16px 16px 16px 16px',
  },
}))(MuiDialogContent);

export const SelectReconciliationPeriod = ({ open, handleDialogClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      classes={{
        container: classes.dialogContainer,
        paper: classes.dialogPaper,
      }}
      disableBackdropClick>
      <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
        Select Reconciliation Period{' '}
      </DialogTitle>
      <DialogContent dividers>
        <div>
          <div
            style={{
              border: '1px solid #DFDFDF',
              borderRadius: '3px',
              padding: '0.2rem .7em',
              marginBottom: '10px',
            }}>
            <div>
              <p>April 15, 2021</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div>
                <p></p>
                <Warning />
              </div>
              <div>
                <p>Account Balance</p>
                <p>NGN5,000,000</p>
              </div>
              <div style={{ alignSelf: 'center' }}>
                <NotEqual />
              </div>
              <div>
                <p>Jureb Balance</p>
                <p>NGN4,500,000</p>
              </div>
              <div>
                <p>
                  Difference <ErrorOutline />
                </p>
                <p>NGN500,000</p>
              </div>
            </div>
          </div>
        </div>{' '}
        <div>
          <div
            style={{
              border: '1px solid #DFDFDF',
              borderRadius: '3px',
              padding: '0.2rem .7em',
              marginBottom: '10px',
            }}>
            <div>
              <p>April 10, 2021</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div>
                <p></p>
                <CheckCircle />
              </div>
              <div>
                <p>Account Balance</p>
                <p>NGN5,000,000</p>
              </div>
              <div style={{ alignSelf: 'center' }}>
                <Equal />
              </div>
              <div>
                <p>Jureb Balance</p>
                <p>NGN4,500,000</p>
              </div>
              <div>
                <p>Awesome </p>
                <p className={classes.textAwesome}>
                  All transactions reconcilled
                </p>
              </div>
            </div>
          </div>
        </div>{' '}
        <div style={{ textAlign: 'center' }}>
          <DefaultButton onClick={handleDialogClose}>Close</DefaultButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
