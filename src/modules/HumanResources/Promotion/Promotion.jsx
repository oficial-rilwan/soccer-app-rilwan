import { useEffect, useState } from 'react';
import {
  InputAdornment,
  Button,
  makeStyles,
  withStyles,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { useHistory } from 'react-router-dom';
import InputForEmployeePage from '../Employees/AddEmployees/components/EmployeeInpt';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import promotionActions from 'redux/actions/promotionActions';
import { useDispatch, useSelector } from 'react-redux';
import { TypographyBold } from 'modules/components/Typography/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const { fetchPromotionData } = promotionActions;

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
    padding: '2.2rem 5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  dialogPaper: {
    width: '37rem',
    height: '44rem',
    maxWidth: 'inherit',
    [theme.breakpoints.down('xs')]: {
      minWidth: '314px',
    },
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem',
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
  primaryButton: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  defaultButton: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
  },
}));

export default function Promotion() {
  const profile = useSelector((state) => state?.loginStats?.user?.profile);
  const user = useSelector((state) => state?.auth?.user);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const history = useHistory();
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    data: [],
    employeeData: {
      employeeToPromoteName: '',
      oldPosition: '',
      newPosition: '',
      reason: '',
      effectiveDate: '',
      issuerName: `${user?.firstName || profile?.firstName} ${
        user?.lastName || profile?.lastName
      }`,
      employeeToPromoteId: '',
    },
  });
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState('');

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const dispatch = useDispatch();

  const columns = [
    {
      id: 'employeeToPromoteName',
      label: 'Employee Name',
      width: 400,
    },
    { id: 'oldPosition', label: 'Old Position', width: matchesXs ? 200 : 350 },
    { id: 'newPosition', label: 'New Position', width: matchesXs ? 210 : 300 },
    { id: 'promotionStatus', label: 'Status', width: 180 },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loading = searchData.length > 0;
  const searchedItems = values?.data?.filter((item) => {
    let name = `${item.employeeToPromoteName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const handleClickOpen = () => {
    setSuccess(false);
    setOpen(true);
  };
  const handleClose = () => {
    setValues({
      ...values,
      employeeData: {
        ...values.employeeData,
        oldPosition: '',
        newPosition: '',
        effectiveDate: '',
        reason: '',
        employeeToPromoteName: '',
        issuerName: '',
        employeeToPromoteId: '',
      },
      loading: false,
    });
    setOpen(false);
  };

  useEffect(() => {
    const handler =
      values?.employeeData?.employeeToPromoteName &&
      setTimeout(() => {
        authClient
          .get(
            `/api/v1/employee/search?page=1&limit=20&keyword=${values?.employeeData?.employeeToPromoteName}`,
          )
          .then(({ data }) => {
            setValues({ ...values });
            setSearchData(data?.data);
          })
          .catch((e) => {
            setValues({ ...values });
            console.log(e);
          });
      }, 500);
    return () => clearTimeout(handler);
  }, [values?.employeeData?.employeeToPromoteName]);

  const handleBtnClick = () => {
    authClient
      .post(
        `/api/v1/employee/promotion/management/create?employeeId=${values?.employeeData?.employeeToPromoteId}`,
        values?.employeeData,
      )
      .then((response) => {
        if (response.status == 200 || 201) {
          setSuccess(true);
          setValues({ ...values, reload: true });
          setTimeout(() => {
            handleClose();
          }, 6500);
        }
      })
      .catch((e) => console.log(e));
  };

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/promotion/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(
        ({ data }) => (
          setIsLoading(false), setValues({ ...values, data: data?.data })
        ),
      )
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [values?.reload]);

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({
      ...values,
      employeeData: { ...values.employeeData, [name]: value },
    });
  };

  const handleDateChange = (value) => {
    setValues({
      ...values,
      employeeData: { ...values.employeeData, effectiveDate: value },
    });
  };

  return (
    <>
      <HeaderComp url={'/dashboard/promotions'} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '1rem 0',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
        <InputForEmployeePage
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            fontStyle: 'italic',
            backgroundColor: '#F5F9F7',
            padding: 0,
            width: matchesXs ? '100%' : '35%',
          }}
          placeholder="Search Employees"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: '#828282' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          endIcon={<Add />}
          disableElevation
          onClick={handleClickOpen}
          style={{
            borderRadius: '5px',
            backgroundColor: '#1F53D7',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            fontFamily: 'Rubik',
            width: matchesXs ? '100%' : 'auto',
          }}>
          Add New
        </Button>
      </div>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : values?.data?.length <= 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            No Promotions at the moment
          </TypographyBold>
        </div>
      ) : searchedItems.length === 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            Sorry, could not find employee
          </TypographyBold>
        </div>
      ) : (
        <div className={classes.tableWrapper}>
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
                {searchedItems?.map((row, i) => (
                  <TableRow hover key={i} className={classes.tableRow}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => (
                            dispatch(
                              fetchPromotionData(row?.promotionId, setError),
                            ),
                            history.push(
                              `/dashboard/promotions/view/${row?.promotionId}`,
                            )
                          )}
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            backgroundColor: '#FCFFFF',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontWeight:
                              column.id === 'promotionStatus' ||
                              column.id === 'employeeToPromoteName'
                                ? 500
                                : 400,
                            textTransform: 'capitalize',
                            color:
                              column.id == 'promotionStatus' &&
                              row.promotionStatus == 'APPROVED'
                                ? '#27AE60'
                                : column.id == 'employeeToPromoteName'
                                ? '#1F53D7'
                                : '#232323',
                          }}>
                          {column.id == 'promotionStatus'
                            ? value.toLowerCase()
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Promotion
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
              <DialogTypography>Successful</DialogTypography>
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
                <div style={{ gridColumn: '2/8' }}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchData}
                    getOptionLabel={(option) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    onChange={(event, newValue) => {
                      setValues({
                        ...values,
                        employeeData: {
                          ...values.employeeData,
                          employeeToPromoteName: `${newValue[0]?.firstName} ${newValue[0]?.lastName}`,
                          employeeToPromoteId: newValue[0]?.employeeId,
                          oldPosition: newValue[0]?.designation,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChange('employeeToPromoteName')}
                        {...params}
                        variant="outlined"
                        size="small"
                        label=""
                        placeholder="Search employees"
                      />
                    )}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Issuer's Name:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <TypographyBold>{`${
                    profile?.firstName ||
                    user?.firstName ||
                    googleUser?.firstName
                  } ${
                    profile?.lastName || user?.lastName || googleUser?.lastName
                  }`}</TypographyBold>
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Old Position:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputForEmployeePage
                    placeholder="Old position"
                    size="small"
                    fullWidth
                    style={{
                      fontStyle: 'italic',
                    }}
                    disabled
                    value={values?.employeeData?.oldPosition}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    New Position:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputForEmployeePage
                    placeholder="New position"
                    size="small"
                    style={{
                      fontStyle: 'italic',
                    }}
                    fullWidth
                    value={values?.employeeData?.newPosition}
                    onChange={handleChange('newPosition')}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Effective Date:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div
                  style={{
                    gridColumn: '2/8',
                    margin: matchesXs && '0 0 1rem 0',
                  }}>
                  <HireDateInput
                    handleDateChange={handleDateChange}
                    value={values?.employeeData.effectiveDate}
                  />
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputForEmployeePage
                    placeholder="Type reason here"
                    style={{
                      fontStyle: 'italic',
                    }}
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={8}
                    value={values?.employeeData?.reason}
                    onChange={handleChange('reason')}
                  />
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: matchesXs ? 'column' : 'row',
                      gap: matchesXs ? '1rem' : 0,
                      justifyContent: 'space-between',
                    }}>
                    <PrimaryButton
                      className={classes.primaryButton}
                      onClick={handleBtnClick}
                      style={{
                        margin: matchesXs ? '0' : '0 .6rem 0 0',
                      }}>
                      Promote
                    </PrimaryButton>
                    <DefaultButton
                      className={classes.defaultButton}
                      onClick={handleClose}
                      style={{
                        margin: matchesXs ? '1rem 0 1rem' : '0 0 0 .6rem',
                      }}>
                      Cancel
                    </DefaultButton>
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
