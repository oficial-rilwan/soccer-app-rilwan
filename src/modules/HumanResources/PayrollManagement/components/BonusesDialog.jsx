import {
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { DialogTypography } from 'modules/components/Typography/Typography';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { CancelButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import { SuspendButton } from 'modules/HumanResources/Suspension/components/ButtonActions/Actions';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';

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

export default function BonusesDialog({
  setDialogOpen,
  dialogOpen,
  classes,
  setSuccess,
  success,
  dialogData,
  handleReload,
  reload,
}) {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));

  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState({
    data: {
      name: '',
      type: '',
      amount: '',
      note: '',
    },
  });

  const handleClose = () => {
    setDialogOpen(false);
    setValues({
      ...values,
      data: {
        ...values?.data,
        note: '',
        amount: '',
        type: '',
      },
    });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    switch (name) {
      case 'amount':
        setValues({
          ...values,
          data: {
            ...values.data,
            [name]: Number(value.replace(/,/g, '')).toLocaleString(),
          },
        });
        break;
      default:
        setValues({ ...values, data: { ...values?.data, [name]: value } });
        break;
    }
  };

  const handleBonus = () => {
    setDisabled(true);
    authClient
      .put(
        `/api/v1/employee/bonus_deduction/management/update?employeeId=${dialogData?.data.employeeId}`,
        {
          ...values.data,
          name: `${dialogData.firstName} ${dialogData.lastName}`,
          amount: parseFloat(values.data.amount.replace(/,/g, '')).toString(),
        },
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          handleReload(!reload);
          setDisabled(false);
          setSuccess(true);
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => {
        setDisabled(false);
        console.log(e);
      });
  };

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
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
          Bonuses & Deductions
        </DialogTitle>
        <DialogContent dividers>
          {success ? (
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography style={{ textAlign: 'center' }}>
                Successful
              </DialogTypography>
            </div>
          ) : (
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
                    value={`${dialogData.firstName} ${dialogData.lastName}`}
                    disabled
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
                      { label: 'Bonus', value: 'BONUS' },
                      { label: 'Deductions', value: 'DEDUCTION' },
                    ]}
                    label=""
                    value={values.data.type}
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '15rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    handleSelectChange={handleSelectChange('type')}
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
                      value={values.data.amount}
                      style={{
                        width: matchesXs ? '100%' : '11rem',
                        padding: 0,
                        margin: '.5rem 0 0',
                      }}
                      placeholder="Add amount"
                      onChange={handleChange('amount')}
                    />
                  </div>
                </div>
                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start' }}>
                  <Typography
                    variant="h6"
                    className={classes.formTitle}
                    style={{ padding: '1rem 0' }}>
                    Note:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <InputForEmployeePage
                    placeholder="Type note here"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    value={values?.data?.note}
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange('note')}
                  />
                </div>
                <div className={classes.halfGrid}>
                  <div className={classes.actionsWrapper}>
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
