import {
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { CancelButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import { SuspendButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

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

const useStyles = makeStyles((theme) => ({
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  halfGrid: {
    gridColumn: '2/10',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  dialogPaper: {
    width: '33rem',
    height: 'auto',
    maxWidth: 'inherit',
    borderRadius: 8,
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
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

export default function DeductionsDialog({
  setDialogOpen,
  dialogOpen,
  setData,
  data,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));

  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };
  // This function is used to handle the case for amount type change
  // and handles exception to avoid breaking the system.
  const handleChange = (name) => (e) => {
    let { value } = e.target;
    switch (name) {
      case 'amount':
        data.data.amountType.includes('PERCENTAGE') && value > 100
          ? alert('Error') //Exception handled
          : setData({ ...data, data: { ...data.data, [name]: value } });
        break;
      default:
        setData({ ...data, data: { ...data.data, [name]: value } });
        break;
    }
  };
  //   When the bonus is added, this takes care of it.
  //  Data is sent back to the parent comp and re-rendered.
  const handleBonus = () => {
    setData({ ...data, record: [...data.record, data.data] });
    handleClose();
  };

  //   function to handle the select component.
  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setData({ ...data, data: { ...data.data, [name]: value } });
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={dialogOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Deductions
        </DialogTitle>
        <DialogContent dividers>
          <section>
            <div
              style={{
                display: matchesXs ? 'block' : 'grid',
                gridTemplateColumns: 'repeat(2,1fr)',
                gap: '1rem 2rem',
              }}>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Name:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputForEmployeePage
                  size="small"
                  fullWidth
                  style={{
                    fontStyle: 'italic',
                  }}
                  onChange={handleChange('name')}
                  value={data.data?.name}
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Type:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <SelectComp
                  menuItem={[
                    { label: 'Fixed', value: 'FIXED' },
                    { label: 'Percentage', value: 'PERCENTAGE' },
                  ]}
                  label=""
                  value={data.data.amountType}
                  style={{
                    fontStyle: 'italic',
                    width: matchesXs ? '100%' : '15rem',
                    height: '2.4rem',
                    margin: '.5rem 0',
                  }}
                  handleSelectChange={handleSelectChange('amountType')}
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Amount:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div
                style={{
                  gridColumn: '2/10',
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: responsive ? 'wrap' : 'nowrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <div style={{ width: '100%' }}>
                  <InputForEmployeePage
                    size="small"
                    value={data.data.amount}
                    style={{
                      width: matchesXs ? '100%' : '11rem',
                      padding: 0,
                      margin: '.5rem 0 0',
                    }}
                    inputProps={{
                      maxLength: data.data.amountType.includes('PERCENTAGE')
                        ? 3
                        : null,
                    }}
                    placeholder="Add amount"
                    onChange={handleChange('amount')}
                  />
                </div>
              </div>
              <div className={classes.halfGrid}>
                <div
                  className={classes.actionsWrapper}
                  style={{ margin: '1.5rem 0' }}>
                  <SuspendButton
                    disabled={disabled ? true : false}
                    style={{ margin: matchesXs && '.5rem 0' }}
                    onClick={handleBonus}>
                    Add
                  </SuspendButton>
                  <CancelButton
                    disabled={disabled ? true : false}
                    style={{ margin: matchesXs && '.5rem 0' }}
                    onClick={handleClose}>
                    Cancel
                  </CancelButton>
                </div>
              </div>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
