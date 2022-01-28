import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Dialog,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Loader from 'react-loaders';
import { Edit, Search } from '@material-ui/icons';
import { useState } from 'react';
import { SuspendButton } from './ButtonActions/Actions';
import { CancelButton } from './ButtonActions/Actions';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import animationData from 'modules/animations/mail.json';
import { authClient } from 'modules/authentication/requestClient';
import Lottie from 'react-lottie';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { Redirect, useHistory } from 'react-router';

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
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem 0 0',
    borderRadius: '5px',
    marginBottom: '2rem',
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  dialogPaper: {
    width: '52rem',
    height: '43rem',
    maxWidth: 'inherit',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
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
    gridColumn: '2/8',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  linkWrapper: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
    width: '100%',
  },
}));

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
    padding: '2.2rem 9rem 0 3rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function ViewSuspension() {
  const classes = useStyles();
  const { isLoading, suspensionData } = useSelector(
    (state) => state?.suspensionData,
  );
  const theme = useTheme();

  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const responsive = useMediaQuery(theme.breakpoints.down('743'));

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const columns = [
    { id: 'suspensionFor', label: 'Suspension Type', width: 200 },
    { id: 'suspendDate', label: 'Start Date', width: 220 },
    { id: 'length', label: 'Length', width: 220 },
    { id: 'suspensionStatus', label: 'Status', width: 210 },
    { id: 'action', label: 'Action', width: 10 },
  ];

  const profile = useSelector((state) => state?.loginStats?.user?.profile);

  const user = useSelector((state) => state?.auth?.user);

  const [record, setRecord] = useState();
  const history = useHistory();

  const handleIcon = (row) => (e) => {
    const {
      from,
      to,
      comment,
      employeeToSuspendId,
      employeeToSuspendName,
      suspensionFor,
      suspensionStatus,
    } = row;
    setRecord({
      data: {
        from,
        to,
        comment,
        suspensionFor,
      },
      employeeToSuspendId,
      employeeToSuspendName,
      suspensionStatus,
    });
    setOpen(true);
  };

  const handleClose = () => {
    if (success) {
      setOpen(false);
      history.push({
        pathname: '/dashboard/suspension',
        state: { reload: true },
      });
    }
    setOpen(false);
  };

  const handleReinstate = () => {
    authClient
      .put(
        `/api/v1/employee/suspension/management/status?employeeToSuspendId=${record?.employeeToSuspendId}&suspensionStatus=REINSTATED`,
        record?.data,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setSuccess(true);
          setTimeout(() => {
            handleClose();
            history.push({
              pathname: '/dashboard/suspension',
            });
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleRetirement = () => {
    authClient
      .put(
        `/api/v1/employee/suspension/management/status?employeeToSuspendId=${record?.employeeToSuspendId}&suspensionStatus=ONGOING`,
        record?.data,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setSuccess(true);
          setTimeout(() => {
            handleClose();
            history.push('/dashboard/suspension');
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div style={{ paddingTop: '2rem' }}>
        <Grid container>
          <Grid item xs={12} md={2}>
            {isLoading ? (
              <div className={classes.loader}>
                <Loader type="ball-rotate" color="#2F49D0" />
              </div>
            ) : (
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {suspensionData?.employeeToSuspendName}
                </Typography>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li className={classes.active}>Suspension Status</li>
                </ul>
              </div>
            )}
          </Grid>

          <Grid item xs={12} md={10}>
            {isLoading ? (
              <div className={classes.loader}>
                <Loader type="line-scale" color="#2F49D0" />
              </div>
            ) : (
              <section className={classes.tableWrapper}>
                <TableContainer className={classes.container}>
                  <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              width: column.width,
                              fontFamily: 'Rubik',
                              fontWeight: 500,
                              fontSize: '16px',
                            }}
                            className={classes.cellWrapper}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[suspensionData]?.map((row, i) => (
                        <TableRow hover key={i} className={classes.tableRow}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  fontFamily: 'Rubik, sans-serif',
                                  backgroundColor: '#FCFFFF',
                                  fontSize: '16px',
                                  textTransform: 'capitalize',
                                  fontWeight:
                                    column.id == 'suspensionStatus'
                                      ? 500
                                      : 'normal',
                                  color:
                                    column.id == 'suspensionStatus' &&
                                    row.suspensionStatus == 'ONGOING'
                                      ? '#EB5757'
                                      : column.id == 'suspensionStatus' &&
                                        row.suspensionStatus == 'REINSTATED'
                                      ? '#27AE60'
                                      : '#232323',
                                }}>
                                {column.id == 'suspendDate' ? (
                                  `${
                                    new Date(value)
                                      .toLocaleDateString('en-GB')
                                      .substr(0, 6) +
                                    new Date(value)
                                      .toLocaleDateString('en-GB')
                                      .substr(8)
                                  }`
                                ) : column.id == 'suspensionStatus' ? (
                                  value.substring(0, 1) +
                                  value.substr(1).toLowerCase()
                                ) : column.id === 'action' ? (
                                  <div>
                                    <IconButton onClick={handleIcon(row)}>
                                      <Edit />
                                    </IconButton>
                                  </div>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </section>
            )}
          </Grid>
        </Grid>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Suspension
        </DialogTitle>
        <DialogContent
          dividers
          style={{ padding: success && '2.2rem 3rem 0 3rem' }}>
          {success ? (
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Successful</DialogTypography>
            </div>
          ) : (
            <section>
              <div
                style={{
                  display: matchesXs ? 'block' : 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '1rem 4rem',
                }}>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <InputForEmployeePage
                    placeholder="Name"
                    size="small"
                    fullWidth
                    style={{
                      fontStyle: 'italic',
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ color: '#828282' }} />
                        </InputAdornment>
                      ),
                    }}
                    value={record?.employeeToSuspendName}
                    disabled
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Issuer's Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <Typography
                    variant="h4"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                      margin: '.5rem 0',
                    }}>
                    {`${
                      profile?.firstName ||
                      user?.firstName ||
                      googleUser?.firstName
                    } ${
                      profile?.lastName ||
                      user?.lastName ||
                      googleUser?.lastName
                    }`}
                  </Typography>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Suspension For:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div className={classes.halfGrid}>
                  <SelectComp
                    label="Reason"
                    value={record?.data?.suspensionFor}
                    menuItem={[
                      {
                        label: record?.data?.suspensionFor,
                        value: record?.data?.suspensionFor,
                      },
                    ]}
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '15rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    disabled
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Date:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: '2/8',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: responsive ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <div style={{ width: '100%', marginRight: '1rem' }}>
                    <MaterialDatePicker
                      notched
                      value={record?.data?.from}
                      disabled
                    />
                    <em
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: '#404040',
                      }}>
                      Start date
                    </em>
                  </div>
                  <div style={{ width: '100%' }}>
                    <MaterialDatePicker
                      notched
                      value={record?.data?.to}
                      disabled
                    />

                    <em
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: '#404040',
                      }}>
                      End date
                    </em>
                  </div>
                </div>
                <div className={classes.halfGrid}>
                  <InputForEmployeePage
                    placeholder="Additional comments"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={8}
                    value={record?.data?.comment}
                    disabled
                  />
                </div>
                <div className={classes.halfGrid}>
                  <div className={classes.actionsWrapper}>
                    <div style={{ width: '70%' }}>
                      <SuspendButton
                        disabled={record?.suspensionStatus.includes('ONGOING')}
                        onClick={handleRetirement}
                        style={{
                          margin: matchesXs ? '0' : '0 .6rem 0 0',
                          backgroundColor:
                            record?.suspensionStatus.includes('ONGOING') &&
                            '#4F4F4F',
                          color: '#fff',
                          width: '8rem',
                        }}>
                        Suspend
                      </SuspendButton>
                      <CancelButton
                        onClick={handleClose}
                        style={{
                          margin: matchesXs ? '1rem 0 1rem' : '0 0 0 .6rem',
                          width: 'auto',
                        }}>
                        Cancel
                      </CancelButton>
                    </div>
                    <div>
                      <SuspendButton
                        onClick={handleReinstate}
                        disabled={record?.suspensionStatus.includes(
                          'REINSTATED',
                        )}
                        style={{
                          margin: matchesXs ? '0' : '0 .6rem 0 0',
                          width: '9rem',
                          backgroundColor: record?.suspensionStatus.includes(
                            'REINSTATED',
                          )
                            ? '#4F4F4F'
                            : '#27AE60',
                          color: '#fff',
                        }}>
                        Reinstate
                      </SuspendButton>
                    </div>
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
