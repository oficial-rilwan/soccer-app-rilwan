import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
  TextField,
} from '@material-ui/core';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import { Edit } from '@material-ui/icons';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import Loader from 'react-loaders';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { authClient } from 'modules/authentication/requestClient';
import InputComp from 'lib/components/InputComp';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { useHistory } from 'react-router';

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
  employeeName: {
    fontFamily: 'Rubik,sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    textTransform: 'capitalize',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
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
  dialogPaper: {
    width: '45rem',
    height: '41rem',
    maxWidth: 'inherit',
  },
  newDepartment: {
    width: '33rem',
    height: '33rem',
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
    padding: '2.2rem 5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

export default function ViewTransfer() {
  const classes = useStyles();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const columns = [
    { id: 'reason', label: 'Transfer Reason', width: 200 },
    { id: 'reportingDate', label: 'Date', width: 140 },
    { id: 'newDepartment', label: 'Location/Department', width: 220 },
    { id: 'transferStatus', label: 'Status', width: 10 },
    { id: 'action', label: 'Action', width: 10 },
  ];
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const responsive = useMediaQuery(theme.breakpoints.down('743'));
  const history = useHistory();

  const { isLoading, transferData } = useSelector(
    (state) => state?.transferData,
  );

  const { user } = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const { googleUser } = useSelector((state) => state?.loginStats);

  const [success, setSuccess] = useState(false);
  const [newDepartment, setNewDepartment] = useState(false);

  const [values, setValues] = useState({
    employeeData: {
      employeeId: transferData?.employeeToTransferId,
      employeeToTransferName: transferData?.employeeToTransferName,
    },
    data: {
      reportingDate: transferData?.reportingDate,
      newDepartment: transferData?.newDepartment,
      newDesignation: transferData?.newDesignation,
      reason: transferData?.reason,
    },
  });

  const [userData, setUserData] = useState({
    values: {
      reportingDate: '',
      newDepartment: '',
      newDesignation: '',
      reason: '',
    },
  });

  const handleBtnClick = () => {
    userData?.employeeToTransferId
      ? authClient
          .put(
            `/api/v1/employee/transfer/management/department/update?employeeToTransferId=${userData?.employeeToTransferId}`,
            userData.values,
          )
          .then((res) => {
            if (res.status === 200) {
              setSuccess(true);
              setTimeout(() => {
                handleClose();
                history.push('/dashboard/transfer');
              }, 6500);
            }
          })
          .catch((e) => console.log(e))
      : null;
  };

  const handleDateChange = (value) => {
    setValues({ ...values, data: { ...values.data, reportingDate: value } });
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setUserData({ ...userData, values: { ...userData.values, [name]: value } });
  };

  const handleIcon = (row) => (e) => {
    const {
      newDepartment,
      employeeToTransferId,
      reason,
      reportingDate,
      newDesignation,
      employeeToTransferName,
    } = row;
    setUserData({
      ...userData,
      values: {
        ...userData.values,
        newDepartment,
        reason,
        reportingDate,
        newDesignation,
      },
      employeeToTransferId,
      employeeToTransferName,
    });
    setOpen(true);
  };

  return (
    <>
      <HeaderComp url="/dashboard/transfer" />
      <ReturnBtn location="/dashboard/transfer" />
      <div style={{ paddingTop: '2rem' }}>
        <Grid container className={classes.gridWrapper}>
          <Grid item xs={12} md={2}>
            {isLoading ? (
              <div className={classes.loader}>
                <Loader type="ball-rotate" color="#2F49D0" />
              </div>
            ) : (
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {transferData?.employeeToTransferName}
                </Typography>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li className={classes.active}>Transfer Status</li>
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
                      {[transferData]?.map((row, i) => (
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
                                    column.id == 'transferStatus'
                                      ? 500
                                      : 'normal',
                                  color:
                                    column.id == 'transferStatus' &&
                                    row.transferStatus == 'Ongoing'
                                      ? '#EB5757'
                                      : column.id == 'transferStatus' &&
                                        row.transferStatus == 'APPROVED'
                                      ? '#27AE60'
                                      : '#232323',
                                }}>
                                {column.id == 'name' ? (
                                  `${row.firstName} ${row.lastName}`
                                ) : column.id == 'action' ? (
                                  <div>
                                    <IconButton onClick={handleIcon(row)}>
                                      <Edit />
                                    </IconButton>
                                  </div>
                                ) : column.id === 'reportingDate' ? (
                                  `${
                                    new Date(value)
                                      .toLocaleDateString('en-GB')
                                      .substr(0, 6) +
                                    new Date(value)
                                      .toLocaleDateString('en-GB')
                                      .substr(8)
                                  }`
                                ) : column.id === 'newDepartment' ? (
                                  row.newDepartment || row.newBranch
                                ) : column.id === 'transferStatus' ? (
                                  value.toLowerCase()
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
          paper: newDepartment ? classes.newDepartment : classes.dialogPaper,
        }}
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Transfer
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            display: 'flex',
            justifyContent: matchesXs
              ? 'center'
              : success
              ? 'center'
              : 'flex-start',
            alignItems: 'center',
          }}>
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
          ) : newDepartment ? (
            <section style={{ height: '100%', width: '100%' }}>
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
                <div
                  style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}></div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Manager:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    style={{
                      fontStyle: 'italic',
                    }}
                    placeholder="Search Managers"
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ color: '#828282' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start', marginTop: '1rem' }}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Description:
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    placeholder="Type reason here"
                    style={{
                      fontStyle: 'italic',
                      padding: '1rem 0',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={5}
                    // onChange={handleChange('firstName')}
                  />
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      gap: matchesXs ? '1rem' : '1.3rem',
                      // justifyContent: 'space-between',
                    }}>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        backgroundColor: '#1F53D7',
                        color: '#fff',
                        textTransform: 'none',
                        width: matchesXs ? '100%' : '10rem',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                      }}
                      onClick={() => setSuccess(true)}>
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        border: '1px solid #00000033',
                        backgroundColor: 'transparent',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        width: matchesXs ? '100%' : '10rem',
                        boxShadow: 'none',
                      }}
                      onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section style={{ height: '100%', width: '100%' }}>
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
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{
                      fontStyle: 'italic',
                    }}
                    placeholder="Search Employees"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ color: '#828282' }} />
                        </InputAdornment>
                      ),
                    }}
                    value={userData?.employeeToTransferName}
                    disabled
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Issuer's Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <Typography
                    variant="h4"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                      margin: '.5rem 0',
                    }}>
                    {`${
                      user?.firstName ||
                      profile?.firstName ||
                      googleUser?.firstName
                    } ${
                      user?.lastName ||
                      profile?.lastName ||
                      googleUser?.lastName
                    }`}
                  </Typography>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    New Department:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputComp
                    label=""
                    value={userData?.values?.newDepartment}
                    menuItem={[
                      { label: 'HR', value: 'HR' },
                      // { label: 'Assault', value: 'assault' },
                      // { label: 'Punctuality', value: 'punctuality' },
                    ]}
                    style={{
                      fontStyle: 'italic',
                      width: matchesXs ? '100%' : '10rem',
                      height: '2.4rem',
                      margin: '.5rem 0',
                    }}
                    size="small"
                    onChange={handleChange('newDepartment')}
                  />
                  {/* <div
                    style={{
                      display: 'inline-flex',
                      verticalAlign: 'middle',
                      alignItems: 'center',
                      color: '#1F53D7',
                    }}>
                    <IconButton onClick={() => setNewDepartment(true)}>
                      <AddCircleOutlineIcon style={{ color: '#1F53D7' }} />
                    </IconButton>
                    <Typography
                      variant="h5"
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: 14,
                        display: 'inline-flex',
                      }}>
                      Add New Department
                    </Typography>
                  </div> */}
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    New Designation:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <InputForEmployeePage
                    size="small"
                    type="text"
                    placeholder="Enter here"
                    style={{
                      width: matchesXs ? '100%' : '10rem',
                      padding: 0,
                      margin: '.5rem 0 0',
                      fontStyle: 'italic',
                    }}
                    value={userData?.values?.newDesignation}
                    onChange={handleChange('newDesignation')}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Reporting Date:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: responsive ? '2 / 8' : '2 / 10',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: responsive ? 'wrap' : 'nowrap',
                    justifyContent: 'space-between',
                  }}>
                  <div style={{ width: '100%' }}>
                    <MaterialDatePicker
                      size="small"
                      value={userData?.values?.reportingDate}
                      handleDateChange={handleDateChange}
                      notched
                    />
                  </div>
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
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
                    rows={5}
                    value={userData?.values?.reason}
                    onChange={handleChange('reason')}
                  />
                </div>
                <div style={{ gridColumn: responsive ? '2 / 8' : '2 / 10' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      gap: matchesXs ? '1rem' : '1.3rem',
                    }}>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{
                        borderRadius: '3px',
                        backgroundColor: '#1F53D7',
                        color: '#fff',
                        textTransform: 'none',
                        width: matchesXs ? '100%' : '10rem',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        margin: matchesXs ? '0 0 .6rem 0' : '0 .6rem 0 0',
                      }}
                      onClick={handleBtnClick}>
                      Process Transfer
                    </Button>
                    <Button
                      disableElevation
                      variant="contained"
                      style={{
                        borderRadius: '3px',
                        border: '1px solid #00000033',
                        backgroundColor: 'transparent',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontFamily: 'Rubik',
                        width: matchesXs ? '100%' : '10rem',
                        boxShadow: 'none',
                        margin: matchesXs ? '.6rem 0 0' : '0 0 0 .6rem',
                      }}
                      onClick={handleClose}>
                      Cancel
                    </Button>
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
